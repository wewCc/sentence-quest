'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const Q=require('../dictionary.js');
const context={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'..','showcase-data.js'),'utf8'),context);
const library=JSON.parse(JSON.stringify(context.window.EXPRESSION_LIBRARY));
test('精选表达具有完整双语语境、分类与稳定唯一 ID',()=>{
  assert.equal(library.categories.length,6);assert.equal(new Set(library.items.map(x=>x.id)).size,132);
  for(const [type,count]of Object.entries({word:48,phrase:36,sentence:48}))assert.equal(library.items.filter(x=>x.type===type).length,count);
  for(const item of library.items){for(const key of ['id','type','text','zh','usage','en','exampleZh'])assert.ok(typeof item[key]==='string'&&item[key].trim(),item.id+'.'+key);assert.ok(library.categories.some(c=>c.id===item.category));if(item.type==='word')assert.equal(Q.normalizeQuery(item.text),item.text);if(item.type==='sentence')assert.ok(item.pattern);}
});
test('查询归一化、输入范围及链接协议检查',()=>{
  assert.equal(Q.normalizeQuery('  KEEP  an open mind '),'keep an open mind');assert.equal(Q.normalizeQuery('DON’T'),"don't");
  for(const invalid of ['', '清晰','<script>','two*','abc123','a'.repeat(81)])assert.throws(()=>Q.normalizeQuery(invalid));
  assert.equal(Q.safeUrl('javascript:alert(1)'),'');assert.equal(Q.safeUrl('http://example.com'),'');assert.equal(Q.safeUrl('https://example.com/a'),'https://example.com/a');
});
test('不会把相近拼写误显示为用户查的单词',()=>{
  assert.equal(Q.normalizeDatamuse([{word:'charity',defs:['n\tA different word.']}],'clarity'),null);
  const result=Q.normalizeDatamuse([{word:'clarity',defs:['n\tA clear state.','adj\tA test adjective.'],tags:['pron:ˈklærɪti']}],'clarity');
  assert.equal(result.meanings[0].partOfSpeech,'noun');assert.equal(result.meanings[0].definitions[0].definition,'A clear state.');assert.equal(result.estimatedPhonetic,true);
});
test('备用词典保留词性、例句、来源许可，忽略不安全链接和残缺条目',()=>{
  const entry=Q.normalizeFreeDictionary([{word:'test',phonetics:[{text:'/test/'}],sourceUrls:['javascript:alert(1)','https://en.wiktionary.org/wiki/test'],license:{name:'CC BY-SA 4.0',url:'https://creativecommons.org/licenses/by-sa/4.0/'},meanings:[{partOfSpeech:'noun',definitions:[{definition:'A trial.',example:'This is a test.'},{}],synonyms:['trial']}]}],'test');
  assert.equal(entry.phonetic,'/test/');assert.equal(entry.meanings[0].definitions.length,1);assert.equal(entry.licenses[0].name,'CC BY-SA 4.0');assert.ok(entry.sources.every(s=>s.url.startsWith('https://')));
});
test('主服务失败时回退并缓存成功结果；提交不携带账号凭据',async()=>{
  const calls=[];const fakeFetch=async(url,options)=>{calls.push(url);assert.equal(options.credentials,'omit');return url.includes('datamuse')?{ok:false,status:503}:{ok:true,json:async()=>[{word:'fallbackword',meanings:[{partOfSpeech:'noun',definitions:[{definition:'A fallback entry.'}]}]}]};};
  const result=await Q.lookup('fallbackword',{fetchImpl:fakeFetch,now:Date.UTC(2026,9,21)});assert.equal(result.provider,'Free Dictionary API');assert.equal(calls.length,2);
  const cached=await Q.lookup('fallbackword',{fetchImpl:fakeFetch,now:Date.UTC(2026,9,21)+10});assert.equal(cached.cached,true);assert.equal(calls.length,2);
});
test('2027 年停用需要密钥的匿名服务，继续使用回退接口',async()=>{
  const calls=[];const result=await Q.lookup('futureword',{now:Date.UTC(2027,0,1),fetchImpl:async url=>{calls.push(url);return {ok:true,json:async()=>[{meanings:[{partOfSpeech:'noun',definitions:[{definition:'Still available.'}]}]}]};}});
  assert.equal(result.provider,'Free Dictionary API');assert.equal(calls.length,1);assert.ok(!calls[0].includes('datamuse'));
});
test('区分查无词条和服务故障，取消查询不会再请求回退接口',async()=>{
  await assert.rejects(Q.lookup('missingword',{fetchImpl:async url=>url.includes('datamuse')?{ok:true,json:async()=>[]}:{ok:false,status:404}}),e=>e.code==='not-found');
  await assert.rejects(Q.lookup('unavailableword',{fetchImpl:async()=>({ok:false,status:503})}),e=>e.code==='unavailable');
  const controller=new AbortController();let count=0;
  const pending=Q.lookup('abortword',{signal:controller.signal,fetchImpl:async(url,{signal})=>{count++;return new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(new DOMException('Aborted','AbortError')),{once:true}));}});
  controller.abort();await assert.rejects(pending,e=>e.name==='AbortError');assert.equal(count,1);
});
