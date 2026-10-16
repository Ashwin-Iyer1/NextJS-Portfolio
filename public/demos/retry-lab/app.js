import { DEFAULT_POLICY, simulate } from './engine.js';
import { scenarios } from './scenarios.js';
const $ = id => document.getElementById(id);
const labels = {success:'Recovered within budget',deadline:'Time budget exhausted',cancelled:'Cancellation respected',attempt_limit:'Attempt limit reached',permanent_failure:'Stop. Repair the cause.',unsafe_to_retry:'A retry is not justified',fixture_exhausted:'The fixture ends here'};
let result = null, step = 0;
const format = value => value.toLocaleString('en-US');
function node(tag, text, className) { const element = document.createElement(tag); element.textContent = text; if(className)element.className=className; return element; }
function readInput() {
  const policy = {};
  for(const key of Object.keys(DEFAULT_POLICY)) policy[key] = key === 'retrySafe' ? $(key).checked : key === 'jitter' ? $(key).value : key === 'cancelAtMs' && $(key).value === '' ? null : Number($(key).value);
  return {policy,responses:JSON.parse($('responses').value)};
}
function inspect(index) {
  if(!result)return;
  step = Math.max(0, Math.min(index, result.trace.length-1));
  const event = result.trace[step];
  $('step').value=step; $('step-label').textContent=`${step+1} / ${result.trace.length}`;
  $('previous').disabled=step===0; $('next').disabled=step===result.trace.length-1;
  $('detail').replaceChildren(node('strong',`${format(event.timeMs)} MS · ${event.type.toUpperCase()} · ATTEMPT ${event.attempt}`),node('div',event.message));
  if(event.type==='schedule') $('detail').append(node('small',`Window ${format(event.windowMs)} ms · ${event.headerNote}`));
  document.querySelectorAll('#trace tr').forEach((row,i)=>row.classList.toggle('selected',i===step));
  document.querySelectorAll('.segment').forEach((element,i)=>{const segment=result.segments[i];element.classList.toggle('selected',event.attempt===segment.attempt&&((event.type==='schedule'&&segment.kind==='wait')||(event.type==='attempt'&&segment.kind==='attempt')));});
}
function render() {
  $('outcome').replaceChildren(node('div','SIMULATED OUTCOME','outcome-label'),node('h3',labels[result.outcome],'outcome-heading'),node('p',result.message,'outcome-copy'));
  $('metrics').replaceChildren();
  for(const [value,label] of [[result.attempts,'Attempts'],[format(result.elapsedMs),'Elapsed / ms'],[format(result.busyMs),'In flight / ms'],[format(result.waitingMs),'Waiting / ms']]) {const card=node('div','','metric');card.append(node('strong',value),node('span',label));$('metrics').append(card);}
  const comparison=simulate({...result,policy:{...result.policy,jitter:'none'}});
  $('comparison').textContent=`Without jitter: ${comparison.attempts} attempts, ${format(comparison.elapsedMs)} ms, ${comparison.outcome.replaceAll('_',' ')}. Same scripted responses; this is a policy comparison, not a measured service benchmark.`;
  $('timeline').replaceChildren();
  for(const segment of result.segments){const button=node('button',segment.endMs-segment.startMs>result.elapsedMs*.12?segment.label:'','segment '+segment.kind);button.style.flexGrow=String(segment.endMs-segment.startMs);button.style.flexBasis='0';button.title=`${segment.kind} ${segment.attempt}: ${segment.startMs}–${segment.endMs} ms (${segment.label})`;button.setAttribute('aria-label',button.title);button.addEventListener('click',()=>inspect(result.trace.findIndex(e=>e.attempt===segment.attempt&&e.type===(segment.kind==='wait'?'schedule':'attempt'))));$('timeline').append(button);}
  if(!result.segments.length)$('timeline').append(node('span','No attempt started.'));
  $('axis-end').textContent=format(result.elapsedMs)+' ms';$('trace').replaceChildren();
  result.trace.forEach((event,index)=>{const row=document.createElement('tr'),cell=document.createElement('td'),button=node('button',event.type,'secondary');button.addEventListener('click',()=>inspect(index));cell.append(button);row.append(node('td',format(event.timeMs)),cell,node('td',event.message));$('trace').append(row);});
  $('step').max=result.trace.length-1;$('export').disabled=false;inspect(0);
}
function run(event){event?.preventDefault();try{result=simulate(readInput());$('error').textContent='';render();}catch(error){result=null;$('error').textContent=error.message;$('outcome').replaceChildren(node('p','Correct the policy or fixture to generate a trace.','outcome-copy'));$('metrics').replaceChildren();$('comparison').textContent='';$('timeline').replaceChildren();$('trace').replaceChildren();$('detail').textContent='No valid simulation.';$('axis-end').textContent='';$('step-label').textContent='';$('export').disabled=true;$('previous').disabled=true;$('next').disabled=true;$('step').disabled=true;}if(result)$('step').disabled=false;}
function loadPreset(){const selected=scenarios[$('preset').value],policy={...DEFAULT_POLICY,...selected.policy};for(const[key,value]of Object.entries(policy)){if(key==='retrySafe')$(key).checked=value;else $(key).value=value??'';}$('responses').value=JSON.stringify(selected.responses,null,2);$('scenario-note').textContent=selected.description;run();}
for(const[key,value]of Object.entries(scenarios)){const option=node('option',value.name);option.value=key;$('preset').append(option);}
$('preset').addEventListener('change',loadPreset);$('policy-form').addEventListener('submit',run);
$('previous').addEventListener('click',()=>inspect(step-1));$('next').addEventListener('click',()=>inspect(step+1));$('step').addEventListener('input',()=>inspect(Number($('step').value)));
$('policy-form').addEventListener('input',()=>{if(result){$('error').textContent='Inputs changed. Run the simulation to refresh the trace.';$('outcome').querySelector('.outcome-label').textContent='PREVIOUS RUN · INPUTS CHANGED';$('export').disabled=true;}});
$('export').addEventListener('click',()=>{if(!result)return;const blob=new Blob([JSON.stringify(result,null,2)+'\n'],{type:'application/json'}),url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download='retry-trace.json';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
loadPreset();
