// IP-059 · Original draft-preserving clarification state. No upload, persistence or Agent API.
const allowed=new Set(["single","multi","text"]);
const copy=v=>Array.isArray(v)?[...v]:[];
export function createClarification(draft="",attachments=[]){
 return {draft:String(draft),attachments:copy(attachments),question:null,answer:null,status:"idle",submission:null,receipts:[]};
}
export function changeDraft(state,text){
 if(state.status!=="idle")throw Error("Finish or dismiss question before changing draft");
 return {...state,draft:String(text)};
}
export function askQuestion(state,{id,prompt,kind="single",options=[]}={}){
 if(state.status!=="idle")throw Error("Only one active question allowed");
 if(typeof id!=="string"||!id.trim()||typeof prompt!=="string"||!prompt.trim()||!allowed.has(kind))throw Error("Invalid question");
 if(kind!=="text"&&(!Array.isArray(options)||options.length<2||options.some(x=>typeof x!=="string"||!x.trim())||new Set(options).size!==options.length))throw Error("Invalid options");
 return {...state,question:{id,prompt,kind,options:kind==="text"?[]:[...options]},answer:kind==="multi"?[]:"",status:"question",submission:null};
}
export function chooseAnswer(state,{questionId,value}={}){
 const q=state.question;
 if(!q||q.id!==questionId||!["question","answering","error"].includes(state.status))throw Error("Question not editable");
 let answer;
 if(q.kind==="text"){if(typeof value!=="string")throw Error("Answer must be text");answer=value;}
 else if(q.kind==="single"){if(!q.options.includes(value))throw Error("Invalid choice");answer=value;}
 else{if(!Array.isArray(value)||value.some(x=>!q.options.includes(x))||new Set(value).size!==value.length)throw Error("Invalid choices");answer=[...value];}
 return {...state,answer,status:"answering",submission:null};
}
export function submitAnswer(state,{questionId,nonce}={}){
 const q=state.question;
 if(!q||q.id!==questionId)throw Error("Question identity mismatch");
 if(state.status==="submitted"){
  if(state.submission?.nonce===nonce)return state;
  throw Error("Already submitted");
 }
 if(!["answering","error"].includes(state.status))throw Error("Choose an answer first");
 if(typeof nonce!=="string"||!nonce.trim())throw Error("Submission nonce required");
 if(q.kind==="multi"?!state.answer.length:typeof state.answer!=="string"||!state.answer.trim())throw Error("Answer cannot be empty");
 return {...state,status:"submitted",submission:{nonce,questionId,value:copy(state.answer).length&&Array.isArray(state.answer)?copy(state.answer):state.answer}};
}
export function finishQuestion(state,{questionId,result}={}){
 if(!state.question||state.question.id!==questionId||state.status!=="submitted")throw Error("Pending submission required");
 if(result==="failed")return {...state,status:"error"};
 if(result!=="accepted")throw Error("Invalid result");
 const receipt={...state.submission};
 return {...state,status:"idle",question:null,answer:null,submission:null,receipts:[...state.receipts,receipt]};
}
export function dismissQuestion(state){
 if(!state.question)return state;
 return {...state,status:"idle",question:null,answer:null,submission:null};
}
