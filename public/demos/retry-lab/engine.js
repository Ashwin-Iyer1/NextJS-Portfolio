/** Deterministic, synchronous virtual-clock simulator. No IO or real timers. */
export const DEFAULT_POLICY = Object.freeze({
  baseDelayMs: 500, capDelayMs: 8000, maxAttempts: 5, deadlineMs: 20000,
  attemptTimeoutMs: 3000, jitter: 'equal', seed: 42, retrySafe: true, cancelAtMs: null,
});
export const START_EPOCH_MS = Date.parse('2026-01-01T00:00:00Z');
const RETRYABLE = new Set([408, 429, 500, 502, 503, 504, 'network', 'timeout']);
function integer(value, name, minimum, maximum) {
  if (!Number.isSafeInteger(value) || value < minimum || value > maximum)
    throw new Error(`${name} must be an integer from ${minimum} to ${maximum}.`);
  return value;
}
export function validateScenario(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('A scenario object is required.');
  if (input.policy !== undefined && (!input.policy || typeof input.policy !== 'object' || Array.isArray(input.policy)))
    throw new Error('Policy must be an object.');
  const policy = { ...DEFAULT_POLICY };
  for (const [key, value] of Object.entries(input.policy || {})) {
    if (!Object.hasOwn(DEFAULT_POLICY, key)) throw new Error(`Unknown policy field: ${key}`);
    policy[key] = value;
  }
  for (const key of ['baseDelayMs', 'capDelayMs', 'deadlineMs', 'attemptTimeoutMs']) integer(policy[key], key, 1, 3600000);
  integer(policy.maxAttempts, 'maxAttempts', 1, 100);
  integer(policy.seed, 'seed', 0, 4294967295);
  if (policy.cancelAtMs !== null) integer(policy.cancelAtMs, 'cancelAtMs', 0, 3600000);
  if (policy.capDelayMs < policy.baseDelayMs) throw new Error('Backoff cap must be at least the base delay.');
  if (!['none', 'full', 'equal'].includes(policy.jitter)) throw new Error('Jitter must be none, full, or equal.');
  if (typeof policy.retrySafe !== 'boolean') throw new Error('retrySafe must be a boolean.');
  if (!Array.isArray(input.responses) || input.responses.length < 1 || input.responses.length > 100)
    throw new Error('Provide between 1 and 100 scripted responses.');
  const responses = input.responses.map((response, index) => {
    if (!response || typeof response !== 'object' || Array.isArray(response)) throw new Error(`Response ${index + 1} must be an object.`);
    const { status, durationMs = 100, retryAfter = null } = response;
    if (status !== 'network' && (!Number.isInteger(status) || status < 200 || status > 599))
      throw new Error(`Response ${index + 1}: status must be 200–599 or "network".`);
    integer(durationMs, `Response ${index + 1} durationMs`, 0, 3600000);
    if (retryAfter !== null && (typeof retryAfter !== 'string' || retryAfter.length > 100))
      throw new Error(`Response ${index + 1}: retryAfter must be text or null.`);
    return { status, durationMs, retryAfter };
  });
  return { policy, responses };
}

// Deliberately supports delta-seconds and IMF-fixdate only, not obsolete HTTP date formats.
export function parseRetryAfter(value, nowEpochMs) {
  if (value === null || value === undefined || value === '') return { delayMs: 0, note: 'absent' };
  const text = String(value).trim();
  if (/^\d+$/.test(text)) {
    const delayMs = Number(text) * 1000;
    if (Number.isSafeInteger(delayMs)) return { delayMs, note: 'delta-seconds' };
  }
  if (/^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), \d{2} (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{4} \d{2}:\d{2}:\d{2} GMT$/.test(text)) {
    const timestamp = Date.parse(text);
    if (Number.isFinite(timestamp) && new Date(timestamp).toUTCString() === text)
      return { delayMs: Math.max(0, timestamp - nowEpochMs), note: timestamp <= nowEpochMs ? 'date already elapsed' : 'IMF-fixdate' };
  }
  return { delayMs: 0, note: 'invalid header ignored; local backoff applies' };
}

function randomGenerator(seed) {
  let state = seed >>> 0;
  return () => { state = (Math.imul(1664525, state) + 1013904223) >>> 0; return state / 4294967296; };
}
export function simulate(input) {
  const { policy, responses } = validateScenario(input), random = randomGenerator(policy.seed);
  const trace = [], segments = [];
  let now = 0, attempts = 0, busyMs = 0, waitingMs = 0;
  const stopAt = Math.min(policy.deadlineMs, policy.cancelAtMs ?? Infinity);
  const stopReason = policy.cancelAtMs !== null && policy.cancelAtMs <= policy.deadlineMs ? 'cancelled' : 'deadline';
  function event(type, detail) { trace.push({ timeMs: now, type, attempt: attempts, ...detail }); }
  function finish(outcome, message) {
    event('finish', { outcome, message });
    return { version: 1, synthetic: true, epoch: new Date(START_EPOCH_MS).toISOString(), policy, responses,
      outcome, message, attempts, elapsedMs: now, busyMs, waitingMs, trace, segments };
  }
  function advance(duration, kind, label) {
    const end = Math.min(now + duration, stopAt), elapsed = end - now;
    segments.push({ kind, attempt: attempts, startMs: now, endMs: end, label });
    if (kind === 'attempt') busyMs += elapsed; else waitingMs += elapsed;
    now = end;
    return now >= stopAt;
  }
  for (let index = 0; index < responses.length; index++) {
    if (now >= stopAt) return finish(stopReason, 'Stopped before starting another attempt.');
    const response = responses[index];
    attempts++;
    event('attempt', { message: `Attempt ${attempts} starts.` });
    const timedOut = response.durationMs >= policy.attemptTimeoutMs;
    const duration = Math.min(response.durationMs, policy.attemptTimeoutMs);
    if (advance(duration, 'attempt', timedOut ? 'timeout' : String(response.status)))
      return finish(stopReason, 'The in-flight attempt was interrupted at the configured boundary.');
    const status = timedOut ? 'timeout' : response.status;
    event('response', { status, durationMs: duration, message: timedOut ? 'Per-attempt timeout reached; scripted response discarded.' : `Scripted result: ${status}.` });
    if (typeof status === 'number' && status >= 200 && status < 300) return finish('success', 'A scripted success arrived before the deadline.');
    if (!RETRYABLE.has(status)) return finish('permanent_failure', 'This lab does not retry this status. Redirects are not followed.');
    if (!policy.retrySafe) return finish('unsafe_to_retry', 'The operation was not declared safe to repeat. No automatic retry is scheduled.');
    if (attempts >= policy.maxAttempts) return finish('attempt_limit', 'The maximum attempt count includes the first attempt.');
    if (index + 1 >= responses.length) return finish('fixture_exhausted', 'No more scripted responses exist; no future success is assumed.');
    const windowMs = Math.min(policy.capDelayMs, policy.baseDelayMs * 2 ** (attempts - 1));
    const fraction = policy.jitter === 'none' ? 1 : policy.jitter === 'equal' ? .5 + random() / 2 : random();
    const backoffMs = Math.max(1, Math.round(windowMs * fraction)); // 1 ms floor prevents a zero-delay spin.
    const header = timedOut || status === 'network' ? { delayMs: 0, note: 'no HTTP response received' }
      : parseRetryAfter(response.retryAfter, START_EPOCH_MS + now);
    const delayMs = Math.max(backoffMs, header.delayMs);
    event('schedule', { delayMs, backoffMs, windowMs, retryAfterMs: header.delayMs, headerNote: header.note,
      message: `Wait ${delayMs} ms: max(local backoff ${backoffMs}, Retry-After ${header.delayMs}).` });
    if (advance(delayMs, 'wait', header.delayMs > backoffMs ? 'Retry-After' : 'backoff'))
      return finish(stopReason, 'The wait reached the configured boundary; no further attempt starts.');
  }
  throw new Error('Unreachable: a finite fixture must terminate.');
}
