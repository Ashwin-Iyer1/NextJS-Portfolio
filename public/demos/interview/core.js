export const VERSION=1;
export function fresh(){return{version:VERSION,answers:{}};}
export function validateState(value,questions){
 if(!value||value.version!==VERSION||!value.answers||typeof value.answers!=='object'||Array.isArray(value.answers))throw Error('Unsupported rehearsal file.');
 const safe=fresh(),known=new Map(questions.map(q=>[q.id,q]));
 for(const [id,a]of Object.entries(value.answers)){
  if(!known.has(id))throw Error('Unknown question in rehearsal file.');
  if(!a||typeof a.answer!=='string'||a.answer.length>30000||typeof a.notes!=='string'||a.notes.length>10000||!Array.isArray(a.checks)||a.checks.length!==known.get(id).rubric.length||a.checks.some(x=>typeof x!=='boolean')||typeof a.reviewed!=='boolean')throw Error('Invalid answer or rubric.');
  safe.answers[id]={answer:a.answer,notes:a.notes,checks:[...a.checks],reviewed:a.reviewed&&Boolean(a.answer.trim())};
 }
 return safe;
}
export function entry(state,q){return state.answers[q.id]||{answer:'',notes:'',checks:q.rubric.map(()=>false),reviewed:false};}
export function updateAnswer(state,q,text){if(typeof text!=='string'||text.length>30000)throw Error('Answer exceeds 30,000 characters.');const previous=entry(state,q);return{...state,answers:{...state.answers,[q.id]:{...previous,answer:text,reviewed:text===previous.answer?previous.reviewed:false}}};}
export function progress(state,questions){const rows=questions.map(q=>entry(state,q));return{total:rows.length,drafted:rows.filter(a=>a.answer.trim()).length,reviewed:rows.filter(a=>a.reviewed&&a.answer.trim()).length};}
export function exportState(state,questions){return JSON.stringify({provenance:'Original practice prompts; self-review only, no AI grading',...validateState(state,questions)},null,2);}
