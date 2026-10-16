import { analyze, syntheticHistory } from './math.js';
const $ = id => document.getElementById(id), form=$('inputs');
const money=x=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:2}).format(x);
let result=null, custom=false;
const history=()=>syntheticHistory().join('\n');
$('prices').value=history();
function draw(data){
  const values=data.curve.flatMap(x=>[x.covered,x.stock]), low=Math.min(...values), high=Math.max(...values), range=high-low||1;
  const x=n=>60+n/(data.assumptions.spot*2)*680, y=n=>280-(n-low)/range*235;
  let markup='';
  for(let i=0;i<=4;i++){const value=low+range*i/4;markup+=`<line x1="60" x2="740" y1="${y(value)}" y2="${y(value)}" class="grid"/><text x="48" y="${y(value)+4}" text-anchor="end">${Math.round(value).toLocaleString()}</text>`;}
  for(let i=0;i<=4;i++){const value=data.assumptions.spot*i/2;markup+=`<text x="${x(value)}" y="310" text-anchor="middle">${value.toFixed(0)}</text>`;}
  markup+=`<line x1="60" x2="740" y1="${y(0)}" y2="${y(0)}" class="zero"/>`;
  for(const key of ['stock','covered']) markup+=`<path class="${key}" d="${data.curve.map((p,i)=>`${i?'L':'M'}${x(p.terminal)},${y(p[key])}`).join(' ')}"/>`;
  $('chart').innerHTML=markup;
}
function calculate(){
  try{
    if(!form.reportValidity()) throw new Error('Complete the highlighted inputs before analyzing.');
    const config=Object.fromEntries(new FormData(form));for(const k in config)config[k]=Number(config[k]);config.rate/=100;config.dividend/=100;
    const lines=$('prices').value.trim().split(/\r?\n/).map(x=>x.trim());
    if(lines.some(x=>!x||!/^\d+(\.\d+)?$/.test(x)))throw new Error('Closing prices must be positive numbers, one per line. Remove headers and blank rows.');
    const prices=lines.map(Number);result=analyze(config,prices);result.dataSource=custom?'User-provided closing prices (unverified)':'Deterministic synthetic example';result.closingPrices=prices;
    $('error').hidden=true;$('iv').textContent=(result.iv*100).toFixed(2)+'%';$('hv').textContent=(result.hv*100).toFixed(2)+'%';$('spread').textContent=(result.spreadPoints>=0?'+':'')+result.spreadPoints.toFixed(2)+' pp';
    $('price-count').textContent=`${prices.length} prices`;$('breakeven').textContent=money(result.breakEven);$('gain').textContent=money(result.maxGain);$('loss').textContent=money(result.maxLoss);
    $('interpretation').textContent=`At the historical volatility estimate, this European call models at ${money(result.historicalModelPrice)} per share versus your ${money(config.premium)} premium. The ${Math.abs(result.spreadPoints).toFixed(2)} percentage-point volatility gap is a comparison of assumptions, not a trade signal.`;
    const g=result.greeks;$('greeks').innerHTML=g?Object.entries({Delta:g.delta.toFixed(3),Gamma:g.gamma.toFixed(4),'Vega / 1 pp':money(g.vegaPerPoint),'Theta / day':money(g.thetaPerDay)}).map(([name,value])=>`<div><span>${name}</span><b>${value}</b></div>`).join(''):'<p>Sensitivities are undefined at the zero-volatility boundary.</p>';
    draw(result);$('export').disabled=false;
  }catch(e){result=null;$('error').textContent=e.message;$('error').hidden=false;for(const id of ['iv','hv','spread','breakeven','gain','loss'])$(id).textContent='—';$('chart').innerHTML='';$('greeks').textContent='';$('interpretation').textContent='Resolve the inputs to calculate a new scenario.';$('export').disabled=true;}
}
form.addEventListener('submit',e=>{e.preventDefault();calculate();});
form.addEventListener('input',()=>{result=null;$('export').disabled=true;for(const id of ['iv','hv','spread','breakeven','gain','loss'])$(id).textContent='—';$('chart').innerHTML='';$('greeks').textContent='';$('interpretation').textContent='Inputs changed. Recalculate to update the analysis.';});
$('prices').addEventListener('input',()=>{custom=true;$('data-source').textContent='User-provided closing prices. Verify adjustments and consecutive dates.';});
$('reset').addEventListener('click',()=>{form.reset();$('prices').value=history();custom=false;$('data-source').textContent='Synthetic example path. No historical performance claim.';calculate();});
$('export').addEventListener('click',()=>{if(!result)return;const url=URL.createObjectURL(new Blob([JSON.stringify({schemaVersion:1,model:'European Black–Scholes with continuous yield',...result},null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='ivtrading-scenario.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);});
calculate();
