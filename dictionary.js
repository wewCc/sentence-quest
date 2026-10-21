(function(factory){
  const api=factory();
  if(typeof module==='object'&&module.exports)module.exports=api;else window.QuestDictionary=api;
})(function(){
  'use strict';
  const memory=new Map();
  const POS={n:'noun',v:'verb',adj:'adjective',adv:'adverb',u:'other'};
  const text=(value,max=1800)=>typeof value==='string'?value.trim().slice(0,max):'';
  function normalizeQuery(value){
    const word=String(value||'').trim().toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ');
    if(!word||word.length>80||! /^[a-z]+(?:[ '-][a-z]+)*$/.test(word)||word.split(' ').length>6)throw new Error('请输入英文单词或简短词组，不含数字或其他符号。');
    return word;
  }
  function safeUrl(value){
    try{const u=new URL(value);return u.protocol==='https:'?u.href:'';}catch{return '';}
  }
  function normalizeDatamuse(raw,query){
    if(!Array.isArray(raw))throw new Error('词典返回格式异常');
    // Datamuse also returns similar spellings: never present a neighbour as the searched word.
    const found=raw.find(x=>text(x?.word,80).toLowerCase()===query&&Array.isArray(x.defs)&&x.defs.length);
    if(!found)return null;
    const groups=new Map();
    for(const value of found.defs.slice(0,36)){
      if(typeof value!=='string')continue;const at=value.indexOf('\t');
      const part=at>=0?(POS[value.slice(0,at)]||value.slice(0,at)):'other',definition=text(at>=0?value.slice(at+1):value);
      if(!definition)continue;if(!groups.has(part))groups.set(part,[]);groups.get(part).push({definition,example:''});
    }
    if(!groups.size)return null;
    const pronunciation=(Array.isArray(found.tags)?found.tags:[]).find(t=>typeof t==='string'&&t.startsWith('pron:'));
    return {word:query,headword:text(found.defHeadword,80),phonetic:pronunciation?text(pronunciation.slice(5),150):'',estimatedPhonetic:true,provider:'Datamuse',meanings:[...groups].map(([partOfSpeech,definitions])=>({partOfSpeech,definitions,synonyms:[],antonyms:[]})),sources:[{title:'Datamuse · WordNet / Wiktionary 释义',url:'https://www.datamuse.com/api/'}],licenses:[]};
  }
  function normalizeFreeDictionary(raw,query){
    if(!Array.isArray(raw))return null;
    const entries=raw.filter(e=>e&&typeof e==='object'&&Array.isArray(e.meanings)).slice(0,5);
    const meanings=entries.flatMap(e=>e.meanings.slice(0,8).map(m=>({partOfSpeech:text(m.partOfSpeech,40)||'other',definitions:(Array.isArray(m.definitions)?m.definitions:[]).slice(0,12).map(d=>({definition:text(d?.definition),example:text(d?.example)})).filter(d=>d.definition),synonyms:(Array.isArray(m.synonyms)?m.synonyms:[]).map(s=>text(s,80)).filter(Boolean).slice(0,8),antonyms:(Array.isArray(m.antonyms)?m.antonyms:[]).map(s=>text(s,80)).filter(Boolean).slice(0,8)}))).filter(m=>m.definitions.length);
    if(!meanings.length)return null;
    const phonetic=entries.map(e=>text(e.phonetic,150)||(Array.isArray(e.phonetics)?e.phonetics:[]).map(p=>text(p?.text,150)).find(Boolean)).find(Boolean)||'';
    const sources=[{title:'Free Dictionary API',url:'https://dictionaryapi.dev/'}];
    for(const e of entries)for(const u of Array.isArray(e.sourceUrls)?e.sourceUrls:[])if(safeUrl(u)&&!sources.some(s=>s.url===u))sources.push({title:'词条来源',url:safeUrl(u)});
    const licenses=entries.map(e=>({name:text(e.license?.name,100),url:safeUrl(e.license?.url)})).filter(l=>l.name);
    return {word:query,phonetic,estimatedPhonetic:false,provider:'Free Dictionary API',meanings,sources:sources.slice(0,7),licenses};
  }
  async function getJSON(url,{signal,fetchImpl,timeoutMs}){
    if(signal?.aborted)throw new DOMException('Aborted','AbortError');
    const controller=new AbortController(),abort=()=>controller.abort();
    signal?.addEventListener('abort',abort,{once:true});
    const timer=setTimeout(abort,timeoutMs);
    try{
      const response=await fetchImpl(url,{signal:controller.signal,credentials:'omit',referrerPolicy:'no-referrer',headers:{Accept:'application/json'}});
      if(!response.ok){const error=new Error('HTTP '+response.status);error.status=response.status;throw error;}
      return await response.json();
    }finally{clearTimeout(timer);signal?.removeEventListener('abort',abort);}
  }
  async function lookup(value,{signal,fetchImpl=fetch,now=Date.now(),timeoutMs=5500}={}){
    if(signal?.aborted)throw new DOMException('Aborted','AbortError');
    const word=normalizeQuery(value),cached=memory.get(word);
    if(cached&&now-cached.at<30*60*1000)return {...cached.result,cached:true};
    const providers=[];
    // The provider announces an API-key requirement in early 2027. Keep all credentials out of this static site.
    if(now<Date.UTC(2027,0,1))providers.push({name:'Datamuse',url:'https://api.datamuse.com/words?'+new URLSearchParams({sp:word,md:'dpr',ipa:'1',max:'8'}),normalize:normalizeDatamuse});
    providers.push({name:'Free Dictionary API',url:'https://api.dictionaryapi.dev/api/v2/entries/en/'+encodeURIComponent(word),normalize:normalizeFreeDictionary});
    const failures=[];
    for(const p of providers){
      try{
        const raw=await getJSON(p.url,{signal,fetchImpl,timeoutMs});
        if(signal?.aborted)throw new DOMException('Aborted','AbortError');
        const result=p.normalize(raw,word);
        if(result){if(memory.size>=50)memory.delete(memory.keys().next().value);memory.set(word,{at:now,result});return {...result,cached:false};}
        failures.push({provider:p.name,type:'not-found'});
      }catch(error){
        if(signal?.aborted)throw new DOMException('Aborted','AbortError');
        failures.push({provider:p.name,type:error.status===404?'not-found':error.status===429?'rate-limit':'unavailable'});
      }
    }
    const error=new Error(failures.every(f=>f.type==='not-found')?'没有找到这个词，请检查拼写或尝试词的原形。':'在线词典暂时不可用，请稍后重试，或先浏览内置词条。');
    error.code=failures.every(f=>f.type==='not-found')?'not-found':'unavailable';error.failures=failures;throw error;
  }
  return {normalizeQuery,safeUrl,normalizeDatamuse,normalizeFreeDictionary,lookup};
});
