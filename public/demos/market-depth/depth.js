function finite(x,label,min,max){if(!Number.isFinite(x)||x<min||x>max)throw new Error(`${label} must be between ${min} and ${max}.`);return x;}
export function normalizeBook(levels){
  if(!Array.isArray(levels)||!levels.length||levels.length>1000)throw new Error('Each outcome needs 1–1000 ask levels.');
  const merged=new Map();for(const level of levels){if(!Array.isArray(level)||level.length!==2)throw new Error('Ask rows must be [price, quantity].');const [price,size]=level;finite(price,'Ask price',.000001,.999999);finite(size,'Level quantity',.000001,1e9);merged.set(price,(merged.get(price)||0)+size);}
  return [...merged].sort((a,b)=>a[0]-b[0]);
}
export function walkBook(levels,quantity){
  finite(quantity,'Quantity',.000001,1e9);let remaining=quantity,cost=0;const fills=[];
  for(const [price,available]of normalizeBook(levels)){const size=Math.min(available,remaining);if(size<=0)break;cost+=price*size;fills.push({price,size,cost:price*size});remaining-=size;}
  return {filled:quantity-remaining,remaining,cost,vwap:(quantity-remaining)>0?cost/(quantity-remaining):null,fills};
}
export function analyze({yes,no,quantity=100,feeBps=25,fixedCost=.25,fundingRate=.04,days=30,ageSeconds=0,maxAge=60,complementary=true}){
  if(complementary!==true)throw new Error('The payout identity requires complementary outcomes of the same condition.');
  finite(ageSeconds,'Snapshot age',0,1e9);finite(maxAge,'Maximum age',0,3600);if(ageSeconds>maxAge)throw new Error(`Snapshot is stale (${ageSeconds}s > ${maxAge}s). No executable edge is calculated.`);
  finite(quantity,'Requested pairs',.000001,1e9);finite(feeBps,'Illustrative fee',0,10000);finite(fixedCost,'Fixed cost',0,1e6);finite(fundingRate,'Annual funding assumption',0,1);finite(days,'Holding days',0,3650);
  const y=normalizeBook(yes),n=normalizeBook(no),capacity=Math.min(y.reduce((s,l)=>s+l[1],0),n.reduce((s,l)=>s+l[1],0));
  const filled=Math.min(quantity,capacity),yesFill=walkBook(y,filled),noFill=walkBook(n,filled),notional=yesFill.cost+noFill.cost;
  const fees=notional*feeBps/10000,capital=notional+fees+fixedCost,funding=capital*fundingRate*days/365,totalCost=capital+funding,payout=filled;
  return {requested:quantity,filled,unfilled:quantity-filled,capacity,yesFill,noFill,notional,fees,fixedCost,funding,capital,totalCost,payout,grossEdge:payout-notional,netEdge:payout-totalCost,edgePerPair:(payout-totalCost)/filled,topAskSum:y[0][0]+n[0][0],averagePairCost:notional/filled,assumptions:{feeBps,fixedCost,fundingRate,days,ageSeconds,maxAge,complementary}};
}
export const scenarios={
  depth:{name:'Depth changes the economics',description:'A favorable top-of-book pair becomes less favorable as more expensive levels are consumed.',yes:[[.46,100],[.49,150],[.53,300]],no:[[.48,80],[.51,200],[.54,300]]},
  thin:{name:'A tiny headline opportunity',description:'Only five pairs have the attractive best asks. Displayed prices cannot support the whole requested size.',yes:[[.41,5],[.56,100],[.61,400]],no:[[.43,5],[.51,100],[.55,400]]},
  balanced:{name:'No edge after the spread',description:'The combined best asks already cost more than the one-unit complete-set payout.',yes:[[.51,200],[.53,300]],no:[[.52,200],[.54,300]]}
};
