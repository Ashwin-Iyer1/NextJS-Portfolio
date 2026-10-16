const number=(x,name,min,max)=>{if(!Number.isFinite(x)||x<min||x>max)throw new Error(`${name} must be between ${min} and ${max}.`);return x;};
export function parseSymbols(text,universe){
  if(typeof text!=='string'||text.length>10000)throw new Error('Supply a short ticker list.');
  const values=text.replace(/[\[\]'"`]/g,'').trim().split(/[\s,]+/).filter(Boolean).map(x=>x.toUpperCase());
  if(!values.length||values.length>50||values.some(x=>!/^([A-Z]{1,5})([.-][A-Z])?$/.test(x)))throw new Error('Use ticker symbols only, separated by commas or spaces.');
  const symbols=[...new Set(values)];
  if(universe&&symbols.some(x=>!universe.includes(x)))throw new Error('A selection is missing from the price universe.');
  return symbols;
}
function date(value){if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value)||new Date(value+'T00:00:00Z').toISOString().slice(0,10)!==value)throw new Error('Dates must be real ISO calendar dates.');return value;}
export function validateExperiment(input){
  if(!input||input.schemaVersion!==1||!['synthetic','user-provided'].includes(input.kind)||typeof input.provenance!=='string'||!input.provenance.trim())throw new Error('Supply schemaVersion 1, data kind and a provenance description.');
  if(!Array.isArray(input.prices)||input.prices.length<3||input.prices.length>2000)throw new Error('An experiment needs 3–2000 daily price rows.');
  if(!input.selections||!Array.isArray(input.selections.A)||!Array.isArray(input.selections.B))throw new Error('Include selection arrays A and B.');
  const universe=Object.keys(input.prices[0].close||{}).sort();
  if(!universe.length||universe.length>50)throw new Error('Use 1–50 assets.');
  parseSymbols(universe.join(','));
  let previous='';
  for(const row of input.prices){date(row.date);if(row.date<=previous)throw new Error('Prices must have unique, strictly increasing dates.');previous=row.date;if(Object.keys(row.close||{}).sort().join(',')!==universe.join(','))throw new Error('Every date must price the same asset universe; missing prices are never forward-filled.');for(const value of Object.values(row.close))number(value,'Price',.000001,1e8);}
  if(date(input.decisionAt)!==input.prices[0].date)throw new Error('decisionAt must equal the first observation; execution uses the next observation.');
  for(const key of ['A','B']){const selection=input.selections[key];if(selection.some(x=>typeof x!=='string'))throw new Error('Selections must contain strings.');const parsed=parseSymbols(selection.join(','),universe);if(parsed.length!==selection.length||parsed.some((s,i)=>s!==selection[i]))throw new Error('Selections must be unique, uppercase tickers.');}
  return structuredClone(input);
}
export function evaluate(input,{capital=10000,fee=1,slippageBps=5,endIndex=input.prices.length-1}={}){
  const e=validateExperiment(input);number(capital,'Capital',100,1e9);number(fee,'Fee per order',0,1e4);number(slippageBps,'Slippage (bps)',0,1000);
  if(!Number.isInteger(endIndex)||endIndex<1||endIndex>=e.prices.length)throw new Error('Choose a valid ending observation after the decision.');
  const universe=Object.keys(e.prices[0].close).sort(), lanes={A:e.selections.A,B:e.selections.B,benchmark:universe};
  const reports={};
  for(const [name,symbols] of Object.entries(lanes)){
    const allocation=capital/symbols.length, fills=symbols.map(symbol=>{
      const quote=e.prices[1].close[symbol],fill=quote*(1+slippageBps/10000);
      if(fee>=allocation)throw new Error('Entry fees consume an entire asset allocation.');
      const shares=Math.floor((allocation-fee)/fill*1e6)/1e6;
      if(shares<=0)throw new Error('Capital is too small to allocate shares at six-decimal precision.');
      return {symbol,quote,fill,shares,cost:shares*fill+fee,fee,slippageCost:shares*(fill-quote)};
    });
    const cash=capital-fills.reduce((s,p)=>s+p.cost,0);
    const equity=[{date:e.prices[0].date,value:capital},...e.prices.slice(1,endIndex+1).map(row=>({date:row.date,value:cash+fills.reduce((s,p)=>s+p.shares*row.close[p.symbol],0)}))];
    let peak=capital,maxDrawdown=0;for(const point of equity){peak=Math.max(peak,point.value);maxDrawdown=Math.max(maxDrawdown,1-point.value/peak);}
    const ending=equity.at(-1).value,holdings=fills.map(p=>({...p,endingPrice:e.prices[endIndex].close[p.symbol],value:p.shares*e.prices[endIndex].close[p.symbol],pnl:p.shares*e.prices[endIndex].close[p.symbol]-p.cost}));
    reports[name]={equity,holdings,cash,ending,pnl:ending-capital,return:ending/capital-1,maxDrawdown,fees:fee*symbols.length,slippageCost:fills.reduce((s,p)=>s+p.slippageCost,0)};
  }
  const common=e.selections.A.filter(s=>e.selections.B.includes(s));
  return {schemaVersion:1,kind:e.kind,provenance:e.provenance,decisionAt:e.decisionAt,executionAt:e.prices[1].date,endingAt:e.prices[endIndex].date,assumptions:{capital,fee,slippageBps,endIndex,execution:'Next observation close; fractional shares to six decimals; buy and hold; no exit costs or cash yield'},overlap:{symbols:common,jaccard:common.length/new Set([...e.selections.A,...e.selections.B]).size},reports};
}
export function syntheticExperiment(){
  const names=['ALFA','BETA','GAMA','DLTA','EPSI','ZETA'],prices=[];let day=new Date('2026-01-05T00:00:00Z');
  for(let i=0;i<41;i++){while([0,6].includes(day.getUTCDay()))day.setUTCDate(day.getUTCDate()+1);prices.push({date:day.toISOString().slice(0,10),close:Object.fromEntries(names.map((s,j)=>[s,Number(((45+j*23)*Math.exp(.001*(j-2)*i+.045*Math.sin(i*.31+j)-.045*Math.sin(j))).toFixed(4))]))});day.setUTCDate(day.getUTCDate()+1);}
  return {schemaVersion:1,kind:'synthetic',provenance:'Deterministic mathematical paths and hand-authored selections. Neither lane is an actual GPT/Gemini response or measured model result.',decisionAt:prices[0].date,selections:{A:['ALFA','GAMA','EPSI'],B:['BETA','GAMA','ZETA']},prices};
}
