/** European Black–Scholes with continuous dividend yield. All rates are fractions. */
export function finite(value, label, min = -Infinity, max = Infinity) {
  if (!Number.isFinite(value) || value < min || value > max) throw new Error(`${label} must be between ${min} and ${max}.`);
  return value;
}
const density = x => Math.exp(-x * x / 2) / Math.sqrt(2 * Math.PI);
export function normalCDF(x) {
  const t = 1 / (1 + 0.2316419 * Math.abs(x));
  const tail = density(x) * t * (0.319381530 + t * (-0.356563782 + t * (1.781477937 + t * (-1.821255978 + t * 1.330274429))));
  return x >= 0 ? 1 - tail : tail;
}
function inputs({ spot, strike, years, rate = 0, dividend = 0 }) {
  finite(spot, 'Spot', 0.01, 1e7); finite(strike, 'Strike', 0.01, 1e7);
  finite(years, 'Time in years', 1 / 36500, 20); finite(rate, 'Rate', -0.2, 1); finite(dividend, 'Dividend yield', 0, 1);
}
export function bounds(p) {
  inputs(p);
  const discountedSpot = p.spot * Math.exp(-(p.dividend || 0) * p.years);
  return { lower: Math.max(0, discountedSpot - p.strike * Math.exp(-(p.rate || 0) * p.years)), upper: discountedSpot };
}
export function callPrice(p, sigma) {
  inputs(p); finite(sigma, 'Volatility', 0, 5);
  if (sigma === 0) return bounds(p).lower;
  const { spot: S, strike: K, years: T, rate: r = 0, dividend: q = 0 } = p;
  const d1 = (Math.log(S / K) + (r - q + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T);
  return S * Math.exp(-q * T) * normalCDF(d1) - K * Math.exp(-r * T) * normalCDF(d2);
}
export function impliedVolatility(p, premium) {
  finite(premium, 'Premium', 0, 1e7);
  const { lower, upper } = bounds(p);
  if (premium < lower - 1e-8 || premium >= upper) throw new Error(`Premium must be at least $${lower.toFixed(4)} and below $${upper.toFixed(4)} under this European model.`);
  if (Math.abs(premium - lower) <= 1e-8) return 0;
  if (premium > callPrice(p, 5)) throw new Error('Premium implies volatility beyond this solver’s 500% limit.');
  let low = 0, high = 5;
  for (let i = 0; i < 100; i++) {
    const middle = (low + high) / 2;
    if (callPrice(p, middle) < premium) low = middle; else high = middle;
  }
  return (low + high) / 2;
}
export function historicalVolatility(prices, window, tradingDays = 252) {
  if (!Number.isInteger(window) || window < 2) throw new Error('Use at least two daily returns.');
  finite(tradingDays, 'Trading days', 1, 366);
  if (!Array.isArray(prices) || prices.length < window + 1) throw new Error(`${window} returns need at least ${window + 1} consecutive closing prices.`);
  prices.forEach(p => finite(p, 'Closing price', Number.MIN_VALUE, 1e9));
  const tail = prices.slice(-(window + 1));
  const returns = tail.slice(1).map((p, i) => Math.log(p / tail[i]));
  const mean = returns.reduce((a, b) => a + b, 0) / returns.length;
  const variance = returns.reduce((a, b) => a + (b - mean) ** 2, 0) / (returns.length - 1);
  return Math.sqrt(variance * tradingDays);
}
export function greeks(p, sigma) {
  if (sigma <= 0) return null;
  const { spot: S, strike: K, years: T, rate: r = 0, dividend: q = 0 } = p;
  const d1 = (Math.log(S / K) + (r - q + sigma * sigma / 2) * T) / (sigma * Math.sqrt(T));
  const d2 = d1 - sigma * Math.sqrt(T), ds = Math.exp(-q * T), dk = Math.exp(-r * T);
  return { delta: ds * normalCDF(d1), gamma: ds * density(d1) / (S * sigma * Math.sqrt(T)),
    vegaPerPoint: S * ds * density(d1) * Math.sqrt(T) / 100,
    thetaPerDay: (-S * ds * density(d1) * sigma / (2 * Math.sqrt(T)) - r * K * dk * normalCDF(d2) + q * S * ds * normalCDF(d1)) / 365 };
}
export function coveredCall({ spot, strike, premium, fees = 0 }, terminal, contracts = 1) {
  finite(spot, 'Spot', 0.01, 1e7); finite(strike, 'Strike', 0.01, 1e7); finite(premium, 'Premium', 0, spot);
  finite(fees, 'Fees per contract', 0, 1e6); finite(terminal, 'Terminal stock price', 0, 1e8);
  if (!Number.isInteger(contracts) || contracts < 1 || contracts > 1000) throw new Error('Contracts must be an integer from 1 to 1000.');
  return (Math.min(terminal, strike) - spot + premium - fees / 100) * 100 * contracts;
}
export function syntheticHistory() {
  // Fixed mathematical path for interaction testing, not sampled market prices.
  let p = 100;
  return Array.from({ length: 253 }, (_, i) => { if (i) p *= Math.exp(0.0002 + 0.015 * Math.sin(i * 2.399) + 0.008 * Math.cos(i * 1.173)); return Number(p.toFixed(6)); });
}
export function analyze(config, prices) {
  const p = { spot: config.spot, strike: config.strike, years: config.days / 365, rate: config.rate, dividend: config.dividend };
  const iv = impliedVolatility(p, config.premium), hv = historicalVolatility(prices, config.window);
  const breakEven = config.spot - config.premium + config.fees / 100;
  const maxGain = coveredCall(config, config.strike, config.contracts), maxLoss = -coveredCall(config, 0, config.contracts);
  return { assumptions: config, iv, hv, spreadPoints: (iv - hv) * 100, historicalModelPrice: callPrice(p, hv), breakEven, maxGain, maxLoss, greeks: greeks(p, iv),
    curve: Array.from({ length: 81 }, (_, i) => { const terminal = config.spot * i / 40; return { terminal, covered: coveredCall(config, terminal, config.contracts), stock: (terminal - config.spot) * 100 * config.contracts }; }) };
}
