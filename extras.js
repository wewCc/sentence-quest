'use strict';
window.QuestExtras={create({main,esc,icon,heading,toast,getState,save,speak}){
  const L=window.EXPRESSION_LIBRARY,Q=window.QuestDictionary;
  const category=id=>L.categories.find(c=>c.id===id)?.title||'';
  const types={all:'全部精选',word:'好词',phrase:'实用短语',sentence:'好句',saved:'我的收藏'};
  const pos={noun:'名词',verb:'动词',adjective:'形容词',adverb:'副词',pronoun:'代词',preposition:'介词',conjunction:'连词',interjection:'感叹词',other:'其他'};
  let activePage='',tab='all',topic='all',search='',pageNumber=1,controller=null,serial=0;
  let lookupView={word:'',local:null,online:null,loading:false,error:''};
  const favorite=id=>getState().expressionFavorites.includes(id);
  function libraryResults(){
    const list=L.items.filter(x=>(tab==='all'||(tab==='saved'?favorite(x.id):x.type===tab))&&(topic==='all'||x.category===topic)&&`${x.text} ${x.zh} ${x.usage} ${x.pattern||''} ${x.en}`.toLowerCase().includes(search.toLowerCase()));
    const pages=Math.max(1,Math.ceil(list.length/12));pageNumber=Math.max(1,Math.min(pageNumber,pages));
    return `${list.length?`<div class="showcase-grid">${list.slice((pageNumber-1)*12,pageNumber*12).map(card).join('')}</div>`:'<div class="empty-state"><h3>这里还没有匹配的内容</h3><p>可以调整筛选；点击卡片上的收藏按钮，把喜欢的表达留在这里。</p></div>'}<div class="pagination"><span>共 ${list.length} 条 · 第 ${pageNumber} / ${pages} 页</span><div><button class="btn btn-secondary btn-small" data-action="extra-prev" ${pageNumber===1?'disabled':''}>上一页</button><button class="btn btn-secondary btn-small" data-action="extra-next" ${pageNumber===pages?'disabled':''}>下一页</button></div></div>`;
  }
  function card(x){
    return `<article class="showcase-card ${x.type==='sentence'?'sentence-card':''}"><div class="lesson-top"><span class="lesson-tag">${category(x.category)} · ${types[x.type]}${x.pos?' / '+(pos[x.pos]||x.pos):''}</span><button class="favorite-button ${favorite(x.id)?'is-saved':''}" data-action="extra-favorite" data-id="${esc(x.id)}" aria-label="${favorite(x.id)?'取消收藏':'收藏'}：${esc(x.text)}" aria-pressed="${favorite(x.id)}">${favorite(x.id)?'★':'☆'}</button></div><h2 lang="en">${esc(x.text)}</h2><p class="showcase-translation">${esc(x.zh)}</p>${x.pattern?`<div class="sentence-pattern">${esc(x.pattern)}</div>`:''}<p class="showcase-usage">${x.type==='word'?'常见搭配：':''}${esc(x.usage)}</p>${x.type!=='sentence'?`<details class="showcase-example"><summary>看例句与用法</summary><p lang="en">${esc(x.en)}</p><p>${esc(x.exampleZh)}</p></details>`:''}<div class="showcase-actions"><button class="text-link" data-action="speak" data-text="${esc(x.text)}">▷ 朗读</button><button class="text-link" data-action="extra-copy" data-id="${esc(x.id)}">复制表达</button>${x.type==='word'?`<button class="text-link" data-action="extra-lookup" data-word="${esc(x.text)}">查词 ${icon('arrow')}</button>`:''}</div></article>`;
  }
  function renderLibrary(){
    activePage='library';
    const words=L.items.filter(x=>x.type==='word').length,phrases=L.items.filter(x=>x.type==='phrase').length,sentences=L.items.filter(x=>x.type==='sentence').length;
    main.innerHTML=heading('WORDS WORTH KEEPING','好词好句','把值得积累的表达，变成下次说得出、写得出的语言。')+`<section class="library-banner"><div><span class="eyebrow">COLLECT · UNDERSTAND · USE</span><h2>不只记住一个词，<br />也记住它怎样进入一句话。</h2><p>${words} 个精选词 · ${phrases} 个实用短语 · ${sentences} 个原创例句</p></div><div class="library-banner-quote"><span>say it with clarity.</span><small>把意思说清楚，就是好表达。</small></div></section><div class="tab-group library-tabs" role="group" aria-label="表达类型">${Object.entries(types).map(([id,title])=>`<button class="tab-button ${tab===id?'active':''}" data-action="extra-tab" data-id="${id}" aria-pressed="${tab===id}">${title}${id==='saved'?' '+getState().expressionFavorites.length:''}</button>`).join('')}</div><label class="search-box library-search">${icon('search')}<input id="library-search" type="search" value="${esc(search)}" placeholder="搜索英文、中文、搭配或句型…" aria-label="搜索好词好句" /></label><div class="filters" aria-label="表达场景">${[{id:'all',title:'全部场景'},...L.categories].map(c=>`<button class="filter-chip ${topic===c.id?'active':''}" data-action="extra-topic" data-id="${c.id}" aria-pressed="${topic===c.id}">${c.title}</button>`).join('')}</div><div id="library-results">${libraryResults()}</div><p class="section-note">本站组织编写的学习示例；不是名人原话。优先关注语境与搭配，再尝试替换信息，写出自己的版本。</p>`;
  }
  function wordChips(words,empty=''){return words.length?words.map(w=>`<button class="word-chip" data-action="extra-dict-search" data-word="${esc(w)}">${esc(w)}</button>`).join(''):`<span class="muted">${empty}</span>`;}
  function renderDictionary(term=''){
    activePage='dictionary';
    main.innerHTML=heading('THE WORD FINDER','单词检索','先看清词义，再把它放回语境。')+`<section class="dictionary-hero"><span class="eyebrow">ENGLISH WORDS, CLEARER MEANINGS</span><h2>遇到生词，即刻读懂。</h2><p>内置中英精选释义 · 在线英英词典补充 · 不需要账号或密钥</p><form id="dictionary-form" class="dictionary-form"><label class="sr-only" for="dictionary-input">输入英文单词或短语</label><input id="dictionary-input" type="search" maxlength="80" autocomplete="off" spellcheck="false" placeholder="例如 clarity、resilience、evidence" value="${esc(term||lookupView.word)}" aria-describedby="dictionary-scope" /><button class="btn btn-primary" type="submit">${icon('search')} 查词</button></form><p id="dictionary-scope" class="dictionary-scope">支持英文单词及简短词组。在线释义为英文；中文释义来自内置精选词条，不是自动翻译。</p><div class="word-chip-row">${wordChips(['clarity','resilience','evidence','serendipity','perspective'])}</div></section><div class="dictionary-organizer"><div><h3>最近查过</h3><div class="word-chip-row" id="dictionary-history">${wordChips(getState().lookupHistory.slice(0,8),'查过的词会留在这里。')}</div></div><div><h3>我的生词收藏</h3><div class="word-chip-row" id="dictionary-favorites">${wordChips(getState().wordFavorites.slice(0,16),'查词后点击“收藏单词”。')}</div></div></div><div id="dictionary-result" aria-live="polite" aria-atomic="false">${resultHtml()}</div><details class="resource-links"><summary>词典来源与服务说明</summary><p>在线查询由 <a href="https://www.datamuse.com/api/" target="_blank" rel="noopener noreferrer">Datamuse</a> 提供释义与读音参考，异常时尝试 <a href="https://dictionaryapi.dev/" target="_blank" rel="noopener noreferrer">Free Dictionary API</a>。释义可能有缺失，应结合词性与语境判断；朗读使用设备语音。</p><p>提交查词时，查询词会发送给所用的第三方词典。最近查询与收藏保存在此浏览器；成功的在线结果在当前页面会话内缓存 30 分钟。</p><p>Datamuse 已公告 2027 年初将要求密钥；本项目从 2027-01-01 起停止其匿名请求，保留免密钥回退与内置词库。开发者需届时核实新的服务方案。</p></details>`;
    if(term)startLookup(term);
  }
  function resultHtml(){
    const v=lookupView;if(!v.word)return '<div class="empty-state"><h3>查一个词，也学一种用法。</h3><p>从上方输入单词，或点一个推荐词开始。好词好句里的精选词也可以一键跳到这里。</p></div>';
    const saved=getState().wordFavorites.includes(v.word);
    return `<section class="dictionary-result-card"><div class="dictionary-word-heading"><div><span class="eyebrow">${v.local?'BILINGUAL PICK':'WORD LOOKUP'}</span><h2 lang="en">${esc(v.word)}</h2>${v.online?.phonetic?`<p class="phonetic">${esc(v.online.phonetic)}${v.online.estimatedPhonetic?' <small>读音参考 · 自动估计</small>':''}</p>`:''}</div><div class="hero-actions"><button class="btn btn-secondary btn-small" data-action="speak" data-text="${esc(v.word)}">▷ 设备朗读</button><button class="btn btn-secondary btn-small" data-action="extra-save-word" aria-pressed="${saved}">${saved?'★ 已收藏':'☆ 收藏单词'}</button></div></div>${v.local?`<div class="local-definition"><span class="badge">内置中文精选${v.local.pos?' · '+esc(pos[v.local.pos]||v.local.pos):''}</span><h3>${esc(v.local.zh)}</h3><p>常见搭配：${esc(v.local.usage)}</p><p class="dictionary-example" lang="en">${esc(v.local.en)}</p><p>${esc(v.local.exampleZh)}</p></div>`:''}${v.loading?'<p class="dictionary-loading" role="status"><span class="loading-dot"></span>正在查询在线释义…</p>':''}${v.error?`<div class="feedback info"><p>${esc(v.error)}</p>${v.local?'<p>上面的内置词条仍可正常阅读。</p>':''}</div>`:''}${v.online?onlineHtml(v.online):''}</section>`;
  }
  function onlineHtml(entry){
    return `<div class="online-definition"><div class="section-heading"><h3>在线英英释义</h3><span class="badge">${esc(entry.provider)}${entry.cached?' · 会话缓存':''}</span></div>${entry.headword?`<p class="section-note">以下释义对应原形：${esc(entry.headword)}</p>`:''}${entry.meanings.slice(0,8).map(m=>`<div class="meaning-group"><h4>${esc(pos[m.partOfSpeech]||m.partOfSpeech)} <span>${esc(m.partOfSpeech)}</span></h4><ol>${m.definitions.slice(0,6).map(d=>`<li>${esc(d.definition)}${d.example?`<p class="dictionary-example" lang="en">“${esc(d.example)}”</p>`:''}</li>`).join('')}</ol>${m.synonyms?.length?`<p class="note-meta">近义参考</p><div class="word-chip-row">${wordChips(m.synonyms.slice(0,8))}</div>`:''}${m.antonyms?.length?`<p class="note-meta">反义参考</p><div class="word-chip-row">${wordChips(m.antonyms.slice(0,8))}</div>`:''}</div>`).join('')}<div class="dictionary-sources">来源：${entry.sources.filter(s=>Q.safeUrl(s.url)).map(s=>`<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${esc(s.title)}</a>`).join(' · ')}${entry.licenses?.length?`<p>内容许可：${entry.licenses.map(l=>l.url?`<a href="${esc(l.url)}" target="_blank" rel="noopener noreferrer">${esc(l.name)}</a>`:esc(l.name)).join(' · ')}</p>`:''}<p>按词性展示前若干条释义；同一单词可有多个含义，近义词不能在所有语境中直接互换。</p></div></div>`;
  }
  function updateLookup(){
    if(activePage!=='dictionary')return;
    const result=document.getElementById('dictionary-result');if(result)result.innerHTML=resultHtml();
    const history=document.getElementById('dictionary-history');if(history)history.innerHTML=wordChips(getState().lookupHistory.slice(0,8));
    const saved=document.getElementById('dictionary-favorites');if(saved)saved.innerHTML=wordChips(getState().wordFavorites.slice(0,16),'查词后点击“收藏单词”。');
  }
  async function startLookup(value){
    let word;try{word=Q.normalizeQuery(value);}catch(error){toast(error.message);return;}
    history.replaceState(null,'','#dictionary/'+encodeURIComponent(word));
    controller?.abort();controller=new AbortController();const request=++serial;
    lookupView={word,local:L.items.find(i=>(i.type==='word'||i.type==='phrase')&&i.text.toLowerCase()===word)||null,online:null,loading:true,error:''};
    const input=document.getElementById('dictionary-input');if(input)input.value=word;
    const state=getState();state.lookupHistory=[word,...state.lookupHistory.filter(x=>x!==word)].slice(0,20);save();updateLookup();
    try{const result=await Q.lookup(word,{signal:controller.signal});if(request!==serial||activePage!=='dictionary')return;lookupView.online=result;}
    catch(error){if(request!==serial||error.name==='AbortError')return;lookupView.error=error.message;}
    finally{if(request===serial&&activePage==='dictionary'){lookupView.loading=false;updateLookup();}}
  }
  function render(page,term=''){if(page==='library')renderLibrary();else if(page==='dictionary')renderDictionary(term);}
  function leave(){activePage='';controller?.abort();serial++;lookupView.loading=false;}
  function onAction(action,b){
    if(!action.startsWith('extra-'))return false;
    const id=b.dataset.id;
    if(action==='extra-tab'){tab=id;pageNumber=1;renderLibrary();}
    else if(action==='extra-topic'){topic=id;pageNumber=1;renderLibrary();}
    else if(action==='extra-prev'||action==='extra-next'){pageNumber+=action==='extra-next'?1:-1;const list=document.getElementById('library-results');list.innerHTML=libraryResults();list.tabIndex=-1;list.focus({preventScroll:true});list.scrollIntoView({block:'start',behavior:'smooth'});}
    else if(action==='extra-favorite'){const state=getState();state.expressionFavorites=favorite(id)?state.expressionFavorites.filter(x=>x!==id):[...state.expressionFavorites,id];save();renderLibrary();}
    else if(action==='extra-copy'){const item=L.items.find(x=>x.id===id);if(item){if(!navigator.clipboard)toast('当前无法复制，可以直接选中表达文字复制。');else navigator.clipboard.writeText(item.text).then(()=>toast('表达已复制。')).catch(()=>toast('当前无法复制，可以直接选中表达文字复制。'));}}
    else if(action==='extra-lookup'){location.hash='dictionary/'+encodeURIComponent(b.dataset.word);}
    else if(action==='extra-dict-search'){startLookup(b.dataset.word);}
    else if(action==='extra-save-word'&&lookupView.word){const state=getState(),word=lookupView.word;state.wordFavorites=state.wordFavorites.includes(word)?state.wordFavorites.filter(x=>x!==word):[...state.wordFavorites,word].slice(-200);save();updateLookup();}
    return true;
  }
  function onInput(event){if(event.target.id==='library-search'){search=event.target.value;pageNumber=1;document.getElementById('library-results').innerHTML=libraryResults();}}
  function onSubmit(event){if(event.target.id==='dictionary-form'){event.preventDefault();startLookup(document.getElementById('dictionary-input').value);}}
  return {render,leave,onAction,onInput,onSubmit};
}};
