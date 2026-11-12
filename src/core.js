(function(root){
'use strict';
const statuses=['Not tested','Passed','Failed','Blocked','Not applicable'];
function requireThat(ok,message){if(!ok)throw new Error(message);}
function text(x,max=20000){return typeof x==='string'&&x.length<=max;}
function id(x){return text(x,120)&&/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(x);}
function validatePack(p){
 requireThat(p&&p.schemaVersion==='1.0','Unsupported test-pack schema.');
 for(const k of ['projectId','releaseId','packId','packVersion'])requireThat(id(p[k]),'Invalid '+k);
 for(const k of ['title','client','environment','intro'])requireThat(text(p[k])&&p[k].trim(),'Missing '+k);
 requireThat(Array.isArray(p.instructions)&&p.instructions.every(x=>text(x)),'Invalid instructions.');
 requireThat(Array.isArray(p.stories)&&p.stories.length>0,'At least one story is required.');
 const ids=new Set();let total=0;
 for(const s of p.stories){requireThat(id(s.id)&&!ids.has(s.id),'Duplicate or invalid story ID.');ids.add(s.id);
 requireThat(text(s.title)&&text(s.objective)&&Array.isArray(s.cases)&&s.cases.length>0,'Invalid story.');
 for(const c of s.cases){requireThat(id(c.id)&&!ids.has(c.id),'Duplicate or invalid case ID.');ids.add(c.id);total++;
 requireThat(Number.isInteger(c.revision)&&c.revision>0,'Invalid case revision.');
 for(const k of ['title','role','expectedResult','testData'])requireThat(text(c[k])&&c[k].trim(),'Missing case '+k);
 for(const k of ['steps','preconditions'])requireThat(Array.isArray(c[k])&&c[k].length>0&&c[k].every(x=>text(x)&&x.trim()),'Invalid '+k);}}
 requireThat(total<=500,'Limit packs to 500 cases.');return p;
}
function cases(p){return p.stories.flatMap(s=>s.cases.map(c=>({...c,storyId:s.id})));}
function newDraft(p){return {projectId:p.projectId,releaseId:p.releaseId,packId:p.packId,packVersion:p.packVersion,testerReference:'',results:{},storyFeedback:{},packFeedback:''};}
function validateFeedback(f){
 requireThat(f&&f.schemaVersion==='1.0','Unsupported feedback schema.');
 for(const k of ['projectId','releaseId','packId','packVersion','exportId'])requireThat(id(f[k]),'Invalid '+k);
 requireThat(text(f.exportedAt,80)&&Number.isFinite(Date.parse(f.exportedAt)),'Invalid export date.');
 requireThat(text(f.testerReference,120)&&f.testerReference.trim(),'A tester reference is required.');
 requireThat(text(f.packFeedback),'Invalid pack feedback.');
 requireThat(Array.isArray(f.storyFeedback)&&f.storyFeedback.length<=500,'Invalid story feedback.');
 const stories=new Set();for(const s of f.storyFeedback){requireThat(s&&id(s.storyId)&&text(s.comment)&&!stories.has(s.storyId),'Invalid or duplicate story feedback.');stories.add(s.storyId);}
 requireThat(Array.isArray(f.results)&&f.results.length<=500,'Invalid feedback results.');
 const seen=new Set();for(const r of f.results){requireThat(r&&id(r.caseId)&&id(r.storyId)&&!seen.has(r.caseId),'Invalid or duplicate case result.');seen.add(r.caseId);
 requireThat(Number.isInteger(r.caseRevision)&&r.caseRevision>0,'Invalid case revision.');
 requireThat(statuses.includes(r.status),'Unknown test status.');
 for(const k of ['actualResult','comment','evidenceReference'])requireThat(text(r[k]),'Invalid '+k);
 requireThat(['Unspecified','Low','Medium','High','Critical'].includes(r.severity),'Invalid severity.');
 requireThat(!['Failed','Blocked'].includes(r.status)||r.actualResult.trim(),'Failed or blocked cases need an actual result.');}
 return f;
}
function exportFeedback(p,d,exportId,now){
 requireThat(text(d.testerReference,120)&&d.testerReference.trim(),'Enter a tester reference before exporting.');
 const f={schemaVersion:'1.0',projectId:p.projectId,releaseId:p.releaseId,packId:p.packId,packVersion:p.packVersion,exportId,exportedAt:now,testerReference:d.testerReference.trim(),packFeedback:d.packFeedback||'',storyFeedback:p.stories.map(s=>({storyId:s.id,comment:d.storyFeedback[s.id]||''})),results:cases(p).map(c=>({storyId:c.storyId,caseId:c.id,caseRevision:c.revision,status:'Not tested',actualResult:'',comment:'',severity:'Unspecified',evidenceReference:'',...(d.results[c.id]||{})}))};
 return validateFeedback(f);
}
function classify(p,f){
 validateFeedback(f);
 if(['projectId','releaseId','packId'].some(k=>p[k]!==f[k]))throw new Error('This file belongs to a different project, release or pack. Open the matching pack.');
 const current=new Map(cases(p).map(c=>[c.id,c]));
 const rows=f.results.map(r=>({...r,match:!current.has(r.caseId)?'Unknown case':current.get(r.caseId).storyId!==r.storyId?'Story mismatch':current.get(r.caseId).revision!==r.caseRevision?'Revision mismatch':'Matching revision'}));
 return {versionMatch:p.packVersion===f.packVersion,rows};
}
const api={statuses,validatePack,validateFeedback,cases,newDraft,exportFeedback,classify};
if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.SFF=api;
})(typeof globalThis!=='undefined'?globalThis:this);
