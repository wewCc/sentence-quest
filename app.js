(() => {
  'use strict';
  const D = window.LEARNING_DATA;
  if (D) D.quizzes = D.quizzes || [];
  const main = document.getElementById('main-content');
  if (!D) { main.innerHTML = '<p>课程数据加载失败，请刷新页面，或检查 data.js 是否存在。</p>'; return; }
  const $ = (s, root = document) => root.querySelector(s);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const iconPaths = {
    map: '<path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15m6-12v15"/>',
    book: '<path d="M12 6C9 3 5 3 2 4v15c3-1 7-1 10 2 3-3 7-3 10-2V4c-3-1-7-1-10 2Zm0 0v15"/>',
    play: '<path d="m9 7 8 5-8 5V7Z"/><rect x="3" y="3" width="18" height="18" rx="6"/>',
    notebook: '<rect x="5" y="3" width="15" height="18" rx="3"/><path d="M3 7h4M3 12h4M3 17h4m3-9h6m-6 4h6m-6 4h4"/>',
    arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
    search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
    close: '<path d="m6 6 12 12M6 18 18 6"/>',
    spark: '<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2Z"/>',
    pen: '<path d="m15 4 5 5M4 20l5-1L21 7a3.5 3.5 0 0 0-5-5L4 14l-1 7 1-1Z"/>',
    leaf: '<path d="M20 3C8 2 2 9 6 16s15 3 14-13Z"/><path d="M4 21 15 10"/>',
    blocks: '<rect x="3" y="3" width="8" height="8" rx="2"/><rect x="14" y="3" width="7" height="8" rx="2"/><rect x="3" y="14" width="8" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    flower: '<path d="M12 14v8m0-4c-5 0-6-3-6-3s5-1 6 3Zm0-6c-9 2-8-6-3-5-2-7 8-7 6 0 5-1 6 7-3 5Z"/>',
    castle: '<path d="M3 21V5h4v4h3V3h4v6h3V5h4v16H3Zm7 0v-6h4v6"/>',
    planet: '<circle cx="12" cy="12" r="7"/><ellipse cx="12" cy="12" rx="12" ry="4" transform="rotate(-30 12 12)"/>',
    sound: '<path d="m11 4-6 5H2v6h3l6 5V4Zm4 4c3 2 3 6 0 8m3-11c5 4 5 10 0 14"/>',
    headphones: '<path d="M3 14v-3a9 9 0 0 1 18 0v3"/><rect x="2" y="12" width="5" height="9" rx="2"/><rect x="17" y="12" width="5" height="9" rx="2"/>',
    quiz: '<path d="M9 8a3 3 0 1 1 5 2c-2 1-2 2-2 3m0 3h.01"/><circle cx="12" cy="12" r="10"/>'
  };
  const icon = (name, cls = '') => `<span class="icon ${cls}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${iconPaths[name] || iconPaths.blocks}</svg></span>`;
  const worldIcons = ['leaf', 'blocks', 'clock', 'flower', 'castle', 'planet'];
  const roles = {subject:'主语',verb:'谓语／动词',object:'宾语',complement:'补足成分',modifier:'修饰语',connector:'连接成分',neutral:'其他词块'};
  const KEY = 'sentence-quest-v1';
  const emptyState = () => ({version:1, learned:[], solved:[], quizSolved:[], written:[], review:{}, drafts:{}, days:[],expressionFavorites:[],wordFavorites:[],lookupHistory:[]});
  let storageAvailable = true;
  function cleanState(raw) {
    if (!raw || raw.version !== 1) throw new Error('不支持的学习记录格式');
    const validIds = (items, allowed) => [...new Set((Array.isArray(items) ? items : []).filter(x => typeof x === 'string' && allowed.has(x)))];
    const ls = new Set(D.lessons.map(x=>x.id)), es = new Set(D.exercises.map(x=>x.id)), qs = new Set(D.quizzes.map(x=>x.id)), ws = new Set(D.writingChallenges.map(x=>x.id));
    const out = emptyState();
    out.learned = validIds(raw.learned, ls); out.solved = validIds(raw.solved, es); out.written = validIds(raw.written, ws);
    out.quizSolved = validIds(raw.quizSolved, qs);
    out.expressionFavorites=validIds(raw.expressionFavorites,new Set(window.EXPRESSION_LIBRARY.items.map(x=>x.id)));
    const queryList=(list,limit)=>[...new Set((Array.isArray(list)?list:[]).filter(v=>typeof v==='string').flatMap(v=>{try{return [window.QuestDictionary.normalizeQuery(v)];}catch{return [];}}))].slice(0,limit);
    out.wordFavorites=queryList(raw.wordFavorites,200);out.lookupHistory=queryList(raw.lookupHistory,20);
    for (const [id, count] of Object.entries(raw.review || {})) if ((es.has(id)||qs.has(id)) && Number.isFinite(count) && count > 0) out.review[id] = Math.min(999, Math.floor(count));
    for (const [id, value] of Object.entries(raw.drafts || {})) if (ws.has(id) && typeof value === 'string') out.drafts[id] = value.slice(0, 2000);
    out.days = validIds(raw.days, new Set((Array.isArray(raw.days) ? raw.days : []).filter(d => /^\d{4}-\d{2}-\d{2}$/.test(d))));
    return out;
  }
  let state = emptyState();
  try { const saved = localStorage.getItem(KEY); if (saved) state = cleanState(JSON.parse(saved)); }
  catch { storageAvailable = false; }
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`; };
  function save(activity = false) {
    if (activity && !state.days.includes(today())) state.days.push(today());
    try { localStorage.setItem(KEY, JSON.stringify(state)); storageAvailable = true; }
    catch { storageAvailable = false; toast('浏览器无法保存记录，本次仍可练习。请导出记录以保留进度。'); }
    updateHeader();
  }
  function xp() { return state.learned.length * 10 + (state.solved.length+state.quizSolved.length) * 20 + state.written.length * 30; }
  function updateHeader() { $('#header-xp').textContent = `✦ ${xp()} XP`; }
  let toastTimer;
  function toast(message) { const region = $('#toast-region'); region.innerHTML = `<div class="toast">${esc(message)}</div>`; clearTimeout(toastTimer); toastTimer = setTimeout(() => region.replaceChildren(), 3800); }
  let page = 'map', worldFilter = 'all', query = '', practiceMode = 'assemble';
  let listPage=1, levelFilter='all';
  const PAGE_SIZE=12;
  const dialog = $('#learning-dialog');
  let session = null;
  let dictionaryTerm='';
  const extras=window.QuestExtras.create({main,esc,icon,heading,toast,getState:()=>state,save,speak});
  const worldById = id => D.worlds.find(w=>w.id===id);
  const lessonById = id => D.lessons.find(l=>l.id===id);
  const recommendedLesson = () => {
    const order=[...new Set(['sentence','tense','modifier','clause','expression','parts',...D.worlds.map(w=>w.id)])];
    return order.flatMap(world=>D.lessons.filter(l=>l.world===world)).find(l=>!state.learned.includes(l.id))||D.lessons[0];
  };
  const isDone = (id, type = 'assemble') => (type === 'assemble' ? state.solved : type === 'quiz' ? state.quizSolved : state.written).includes(id);
  function worldIcon(w) { return icon(w.icon||worldIcons[D.worlds.indexOf(w)]); }
  function navigate() {
    extras.leave();
    const [route, filter] = location.hash.slice(1).split('/');
    page = ['map','learn','practice','library','dictionary','notebook'].includes(route) ? route : 'map';
    try{dictionaryTerm=page==='dictionary'?decodeURIComponent(filter||''):'';}catch{dictionaryTerm='';}
    worldFilter = D.worlds.some(w=>w.id===filter) ? filter : 'all'; query = ''; listPage=1;levelFilter='all';
    render();
  }
  function renderNav() {
    const nav = [['map','map','冒险地图'],['learn','book','知识图鉴'],['practice','play','练习工坊'],['library','spark','好词好句'],['dictionary','search','单词检索'],['notebook','notebook','学习手记']];
    $('#main-nav').innerHTML = nav.map(([route,i,label]) => `<a class="nav-item ${page===route?'active':''}" href="#${route}" ${page===route?'aria-current="page"':''}>${icon(i)}<span>${label}</span>${route==='notebook' && Object.keys(state.review).length ? `<span class="review-badge">${Object.keys(state.review).length}</span>`:''}</a>`).join('');
  }
  function heading(eyebrow,title,description,actions='') { return `<div class="page-heading"><div class="heading-copy"><span class="eyebrow">${eyebrow}</span><h1>${title}</h1><p class="muted">${description}</p></div>${actions}</div>`; }
  function stats() {
    return `<div class="stats-row">${[['book',state.learned.length,'已读知识点'],['blocks',state.solved.length+state.quizSolved.length,'拼装／测验完成'],['pen',state.written.length,'造句已记录'],['spark',xp(),'累计经验 XP']].map(([i,v,l])=>`<div class="stat-card"><span class="stat-icon">${icon(i)}</span><div><strong class="stat-value">${v}</strong><span class="stat-label">${l}</span></div></div>`).join('')}</div>`;
  }
  const heroArt = `<svg viewBox="0 0 460 285" role="img" aria-label="主语 I、动词 create、宾语 possibilities 像积木一样拼成一句话"><defs><pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#b7c8b1" opacity=".5"/></pattern></defs><rect width="460" height="285" fill="url(#dots)"/><ellipse cx="244" cy="250" rx="165" ry="12" fill="#cdd8bd" opacity=".5"/><path d="M52 112c35-64 95-74 136-36m185 65c40-40 34-79-4-91" stroke="#90a47e" stroke-width="2" stroke-dasharray="5 7" fill="none"/><g transform="translate(52 108) rotate(-8)"><rect width="80" height="62" rx="14" fill="#bedbd2" stroke="#8fb5a8"/><text x="40" y="39" text-anchor="middle" font-size="28" font-weight="700" fill="#244d40" font-family="Arial,sans-serif">I</text><text x="40" y="85" text-anchor="middle" font-size="12" fill="#698578">主语</text></g><g transform="translate(149 95) rotate(3)"><rect width="107" height="62" rx="14" fill="#ed7145"/><text x="53" y="38" text-anchor="middle" font-size="22" font-weight="700" fill="white" font-family="Arial,sans-serif">create</text><text x="53" y="84" text-anchor="middle" font-size="12" fill="#698578">谓语</text></g><g transform="translate(273 110) rotate(-3)"><rect width="155" height="62" rx="14" fill="#ecedb3" stroke="#c9cc83"/><text x="77" y="38" text-anchor="middle" font-size="18" font-weight="700" fill="#505b2f" font-family="Arial,sans-serif">possibilities</text><text x="77" y="83" text-anchor="middle" font-size="12" fill="#698578">宾语</text></g><g transform="translate(266 13) rotate(13)"><rect x="0" y="0" width="29" height="76" rx="9" fill="#254c3d"/><path d="m0 69 14 24 15-24" fill="#e8c9a5"/><path d="m9 85 5 8 6-8" fill="#254c3d"/><rect x="0" y="6" width="29" height="9" fill="#d7e59f"/></g><g transform="translate(187 199)"><rect width="82" height="40" rx="20" fill="#fff"/><text x="41" y="26" text-anchor="middle" font-size="13" font-weight="700" fill="#355744">想法 + 结构</text></g><path d="m77 49 4 9 10 2-8 6 1 10-8-6-9 4 3-10-7-7 10-1Z" fill="#ed7145"/><path d="m389 211 3 7 8 1-6 5 1 8-6-4-7 3 2-8-5-5 7-1Z" fill="#ed7145"/></svg>`;
  function renderMap() {
    const next = recommendedLesson();
    const totalPractice = D.exercises.length + D.quizzes.length + D.writingChallenges.length;
    main.innerHTML = `<div class="hero-card"><div class="hero-copy"><span class="hero-tag">✦ 学英语，也可以是一场冒险</span><h1>让每个想法，<br />都有<span style="color:#d65d35">英语表达。</span></h1><p>看懂句子的骨架，拼出表达的可能。<br />从词块到自己的句子，一关一关，把知识用起来。</p><div class="hero-actions"><button class="btn btn-primary" data-action="continue">${state.learned.length?'继续我的冒险':'开始我的冒险'} ${icon('arrow')}</button><a class="btn btn-ghost" href="#learn">先逛逛知识图鉴</a></div><div class="hero-meta"><span>${D.worlds.length} 个知识世界</span><span>${D.lessons.length} 个核心知识点</span><span>${totalPractice} 个练习任务</span></div></div><div class="hero-art">${heroArt}</div></div>${stats()}<section aria-labelledby="map-heading"><div class="section-heading"><div><span class="eyebrow">THE LEARNING WORLDS</span><h2 id="map-heading">你的知识地图 <span class="knowledge-count">${String(D.worlds.length).padStart(2,'0')}</span></h2></div><span class="muted">按顺序探索，也可以自由出发</span></div><div class="world-grid">${D.worlds.map((w,i)=>{
      const lessons = D.lessons.filter(l=>l.world===w.id), done = lessons.filter(l=>state.learned.includes(l.id)).length;
      return `<a class="world-card" href="#learn/${esc(w.id)}" style="--world-color:${esc(w.color || '#2b7664')};--world-soft:${esc(w.soft || (w.color || '#2b7664')+'14')}"><div class="world-top"><span class="world-icon">${worldIcon(w)}</span><span class="world-index">WORLD ${String(i+1).padStart(2,'0')}</span></div><h3>${esc(w.title)}</h3><p class="world-desc">${esc(w.description || w.subtitle)}</p><div class="world-footer"><span>${lessons.length} 个知识点</span>${icon('arrow')}</div><div class="mini-progress" role="progressbar" aria-label="${esc(w.title)}阅读进度" aria-valuenow="${done}" aria-valuemin="0" aria-valuemax="${lessons.length}"><span style="width:${done/lessons.length*100}%"></span></div><span class="world-status">${done ? `已读 ${done} / ${lessons.length}`:'等待你的第一步'}</span></a>`;
    }).join('')}</div></section><div class="daily-card"><span class="stat-icon">${icon('pen')}</span><div class="daily-copy"><span class="eyebrow">FROM KNOWING TO EXPRESSING</span><h3>今天，把一个想法写成英语。</h3><p>拼装练结构，自由造句练表达。日常、工作与学术场景都能用。</p></div><button class="btn btn-secondary" data-action="start-writing">进入造句关卡 ${icon('arrow')}</button></div><p class="section-note">当前覆盖核心语法与听说读写学习框架；已读和任务完成记录反映练习进度，不等同于知识掌握评测。推荐下一课：${esc(next.title)}。</p>`;
  }
  function filterBar(withSearch = true) {
    return `<div class="collection-toolbar">${withSearch?`<label class="search-box">${icon('search')}<input id="knowledge-search" type="search" placeholder="搜索知识或题目，例如：条件句、重音…" value="${esc(query)}" aria-label="搜索知识点" /></label>`:''}<label class="level-filter">难度 <select id="level-filter" aria-label="按难度筛选">${['all','入门','基础','进阶'].map(v=>`<option value="${v}" ${levelFilter===v?'selected':''}>${v==='all'?'全部难度':v}</option>`).join('')}</select></label></div><div class="filters" aria-label="按知识世界筛选">${[{id:'all',title:'全部世界'},...D.worlds].map(w=>`<button class="filter-chip ${worldFilter===w.id?'active':''}" data-action="filter" data-id="${esc(w.id)}" aria-pressed="${worldFilter===w.id}">${esc(w.title)}</button>`).join('')}</div>`;
  }
  function paginate(list) {
    const pages=Math.max(1,Math.ceil(list.length/PAGE_SIZE));listPage=Math.min(Math.max(1,listPage),pages);
    return {items:list.slice((listPage-1)*PAGE_SIZE,listPage*PAGE_SIZE),offset:(listPage-1)*PAGE_SIZE,footer:`<div class="pagination"><span>共 ${list.length} 项 · 第 ${listPage} / ${pages} 页</span><div><button class="btn btn-secondary btn-small" data-action="list-prev" ${listPage===1?'disabled':''}>上一页</button><button class="btn btn-secondary btn-small" data-action="list-next" ${listPage===pages?'disabled':''}>下一页</button></div></div>`};
  }
  function lessonCards() {
    const list = D.lessons.filter(l=>(worldFilter==='all'||l.world===worldFilter) && (levelFilter==='all'||l.level===levelFilter) && `${l.title} ${l.summary} ${l.tag} ${l.formula.map(f=>f.text).join(' ')}`.toLowerCase().includes(query.toLowerCase()));
    const p=paginate(list);
    return list.length ? `<div class="lesson-grid">${p.items.map(l=>`<button class="lesson-card" data-action="open-lesson" data-id="${esc(l.id)}"><div class="lesson-top"><span class="lesson-tag">${esc(worldById(l.world)?.title)}</span><span class="badge">${esc(l.level)}</span></div><h3>${esc(l.title)}</h3><p>${esc(l.summary)}</p><div class="lesson-bottom"><span>${esc(l.tag)}</span><span class="${state.learned.includes(l.id)?'completed-mark':''}">${state.learned.includes(l.id)?'✓ 已读':'探索知识 →'}</span></div></button>`).join('')}</div>${p.footer}` : '<div class="empty-state">没有找到这个知识点。试试其他关键词，或切换到全部世界和全部难度。</div>';
  }
  function renderLearn() {
    const w = worldById(worldFilter);
    main.innerHTML = heading('THE KNOWLEDGE ATLAS', w ? w.title : '知识图鉴', w ? esc(w.description) : '从词法、句法到词汇、发音与听读写方法，建立完整的学习框架。') + (w ? `<div class="world-detail-banner">${worldIcon(w)}<span>${esc(w.subtitle)} · 点击课程，先理解，再练习。</span><a class="text-link" href="#practice/${esc(w.id)}">练这个世界 →</a></div>` : '') + filterBar() + '<div id="lesson-results">'+lessonCards()+'</div>'+resourceLinks();
  }
  function resourceLinks(){return D.resources?.length?`<details class="resource-links"><summary>延伸学习资源</summary><p>课程与题目由本站组织编写；以下资源用于延伸学习，不表示逐句引用或官方认证。</p><ul>${D.resources.map(r=>`<li><a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.title)} ↗</a> · ${esc(r.usedFor)}</li>`).join('')}</ul></details>`:'';}
  function practiceCards() {
    const writing = practiceMode === 'write', quiz=practiceMode==='quiz';
    const list = (writing ? D.writingChallenges : quiz ? D.quizzes : D.exercises).filter(e=>(worldFilter==='all'||e.world===worldFilter) && (levelFilter==='all'||lessonById(e.lessonId)?.level===levelFilter) && `${e.title||''} ${e.translation||''} ${e.prompt} ${lessonById(e.lessonId)?.title}`.toLowerCase().includes(query.toLowerCase()));
    const p=paginate(list);
    return list.length?`<div class="practice-grid">${p.items.map((e,i)=>`<button class="practice-card" data-action="open-${writing?'writing':quiz?'quiz':'exercise'}" data-id="${esc(e.id)}"><div class="lesson-top"><span class="lesson-tag">${esc(worldById(e.world)?.title)}</span><span class="badge">${isDone(e.id,practiceMode)?'✓ 已完成':`任务 ${String(i+p.offset+1).padStart(2,'0')}`}</span></div><h3>${esc(writing?e.title:quiz?lessonById(e.lessonId)?.title:e.translation)}</h3><p>${esc(e.prompt)}</p><div class="lesson-bottom"><span>${esc(lessonById(e.lessonId)?.title)}</span><span>${writing?'自己写一句':quiz?'判断与理解':'开始拼装'} →</span></div></button>`).join('')}</div>${p.footer}`:'<div class="empty-state">当前筛选下没有任务，试试其他世界、难度或关键词。</div>';
  }
  function renderPractice() {
    main.innerHTML = heading('THE PRACTICE WORKSHOP','练习工坊','拼句练结构，测验辨概念，造句练表达。') + `<div class="tab-group" role="group" aria-label="练习方式">${[['assemble','blocks','句子拼装',D.exercises.length],['quiz','quiz','知识测验',D.quizzes.length],['write','pen','自主造句',D.writingChallenges.length]].map(([mode,i,title,count])=>`<button class="tab-button ${practiceMode===mode?'active':''}" data-action="practice-mode" data-mode="${mode}" aria-pressed="${practiceMode===mode}">${icon(i)} ${title} <span>${count}</span></button>`).join('')}</div><p class="section-note">${practiceMode==='assemble'?'点击词块组成完整句子。颜色表示本题中词块的句子成分。':practiceMode==='quiz'?'用选择题辨析语法、词义、发音知识和听读写方法，答后查看解释。发音知识测验不判断实际发音。':'围绕场景自由表达；本地规则只检查目标特征，整体语法、语义和自然度仍需自查。'}</p>` + filterBar() + '<div id="lesson-results">'+practiceCards()+'</div>';
  }
  function renderNotebook() {
    const reviews = [...D.exercises,...D.quizzes].filter(e=>state.review[e.id]);
    const drafts = D.writingChallenges.filter(w=>state.drafts[w.id]);
    main.innerHTML = heading('YOUR LEARNING JOURNAL','学习手记','保存每一次尝试，让还不熟悉的表达有迹可循。',`<div class="hero-actions"><button class="btn btn-secondary btn-small" data-action="export">导出记录</button><button class="btn btn-ghost btn-small" data-action="import">导入记录</button><input id="progress-import" type="file" accept="application/json,.json" hidden /></div>`) + stats() + `<section><div class="section-heading"><h2>待复习的题目 <span class="knowledge-count">${reviews.length}</span></h2></div>${reviews.length?`<div class="notebook-list">${reviews.map(e=>`<div class="notebook-card"><span class="review-badge">${state.review[e.id]} 次尝试</span><div><h3>${esc(e.translation||e.prompt)}</h3><p>${esc(lessonById(e.lessonId)?.title)}</p></div><button class="btn btn-secondary btn-small" data-action="open-${D.quizzes.some(q=>q.id===e.id)?'quiz':'exercise'}" data-id="${esc(e.id)}">再练一次</button></div>`).join('')}</div>`:'<div class="empty-state">'+icon('check')+'<h3>暂时没有待复习的题目</h3><p>拼装和知识测验做错的题会自动留在这里，答对后移出。</p><a class="btn btn-secondary btn-small" href="#practice">去练一关</a></div>'}</section><section><div class="section-heading"><h2>我的造句草稿 <span class="knowledge-count">${drafts.length}</span></h2></div>${drafts.length?`<div class="notebook-list">${drafts.map(w=>`<div class="notebook-card"><div><span class="note-meta">${esc(w.title)} · ${state.written.includes(w.id)?'已记录练习':'草稿'}</span><p class="example-en">${esc(state.drafts[w.id])}</p></div><button class="btn btn-secondary btn-small" data-action="open-writing" data-id="${esc(w.id)}">继续修改</button></div>`).join('')}</div>`:'<div class="empty-state"><p>你的自主造句会自动保存在这里。</p><button class="btn btn-secondary btn-small" data-action="start-writing">写下第一句</button></div>'}</section><div class="daily-card"><div class="daily-copy"><h3>把学习记录带在身边</h3><p>记录保存在当前浏览器，清理浏览器数据会移除记录。可以导出 JSON，再在其他设备导入。</p></div><button class="btn btn-ghost btn-small" data-action="reset">清空本机记录</button></div>`;
  }
  function render() {
    renderNav(); updateHeader();
    ({map:renderMap,learn:renderLearn,practice:renderPractice,library:()=>extras.render('library'),dictionary:()=>extras.render('dictionary',dictionaryTerm),notebook:renderNotebook}[page])();
    if (!storageAvailable) main.insertAdjacentHTML('afterbegin','<p class="storage-warning" role="status">本地存储读取受限或已有记录格式异常。当前可继续练习，请及时导出记录。</p>');
  }
  function showDialog(html) {
    const wasOpen=dialog.open, active=document.activeElement;
    const action=dialog.contains(active)?active?.dataset?.action:null, activeId=active?.dataset?.id;
    dialog.innerHTML=html;
    if(!wasOpen)dialog.showModal();
    else {
      let next=action?dialog.querySelector(`[data-action="${CSS.escape(action)}"]${activeId?`[data-id="${CSS.escape(activeId)}"]`:''}`):null;
      if(!next&&action==='add-token')next=$('.word-bank button',dialog)||$('.sentence-tray button',dialog);
      if(!next&&action==='remove-token')next=$('.sentence-tray button',dialog)||$('.word-bank button',dialog);
      (next||$('.dialog-close',dialog))?.focus({preventScroll:true});
    }
    if(session?.type!=='assemble')dialog.scrollTop=0;
  }
  function dialogHeader(eyebrow,title) { return `<div class="dialog-header"><div><span class="dialog-eyebrow eyebrow">${esc(eyebrow)}</span><h2 id="dialog-title">${esc(title)}</h2></div><button class="icon-button dialog-close" data-action="close-dialog" aria-label="关闭">${icon('close')}</button></div>`; }
  function formula(l) { return `<div class="formula-row" aria-label="结构示意">${l.formula.map(f=>`<span class="formula-token" data-role="${esc(f.role)}">${esc(f.text)}</span>`).join('<span class="muted" aria-hidden="true">＋</span>')}</div>`; }
  function openLesson(id) {
    const l = lessonById(id); if (!l) return; session = {type:'lesson',id};
    const exercise = D.exercises.find(e=>e.lessonId===id);
    const writing = D.writingChallenges.find(e=>e.lessonId===id);
    const quiz = D.quizzes.find(e=>e.lessonId===id);
    showDialog(dialogHeader(`${worldById(l.world).title} / 知识讲解`,l.title)+`<div class="dialog-body"><p class="lesson-summary">${esc(l.summary)}</p><div class="analogy-card">${icon('spark')}<p>${esc(l.analogy)}</p></div><span class="eyebrow">LEARNING BLUEPRINT · 结构与要点</span>${formula(l)}<div class="example-card"><p class="example-en" lang="en">${esc(l.example.en)}</p><p class="example-zh">${esc(l.example.zh)}</p><button class="text-link" data-action="speak" data-text="${esc(l.example.en)}">▷ 朗读例句</button></div><ul class="lesson-points">${l.points.map(p=>`<li>${esc(p)}</li>`).join('')}</ul><div class="pitfall-card"><strong>留意这个细节</strong><p>${esc(l.pitfall)}</p></div></div><div class="dialog-footer"><button class="btn btn-secondary" data-action="mark-read" data-id="${esc(id)}">${state.learned.includes(id)?'✓ 已标记读过':'标记已读 +10 XP'}</button>${exercise?`<button class="btn btn-primary" data-action="lesson-practice" data-id="${esc(exercise.id)}" data-lesson="${esc(id)}">拼装练一练 ${icon('arrow')}</button>`:''}${quiz?`<button class="btn btn-secondary" data-action="lesson-quiz" data-id="${esc(quiz.id)}" data-lesson="${esc(id)}">知识测验</button>`:''}${writing?`<button class="btn btn-ghost" data-action="open-writing" data-id="${esc(writing.id)}">自主造句</button>`:''}</div>`);
  }
  function shuffled(tokens) {
    const list = [...tokens]; for(let i=list.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[list[i],list[j]]=[list[j],list[i]];} return list;
  }
  function openExercise(id, queue) {
    const e = D.exercises.find(e=>e.id===id); if (!e) return;
    session = {type:'assemble',id,selected:[],tokens:shuffled(e.tokens),checked:false,feedback:'',hint:false,queue:queue||D.exercises.filter(x=>x.lessonId===e.lessonId).map(x=>x.id)};
    renderExercise();
  }
  function tokenHtml(t, selected = false) { return `<button class="word-token" data-role="${esc(t.role)}" data-action="${selected?'remove-token':'add-token'}" data-id="${esc(t.id)}" ${session?.checked?'disabled':''} aria-label="${selected?'移回词库：':'加入句子：'}${esc(t.text)}，${esc(roles[t.role]||'词块')}">${esc(t.text)}${selected&&!session?.checked?'<span aria-hidden="true"> ×</span>':''}</button>`; }
  function renderExercise() {
    const s = session, e = D.exercises.find(x=>x.id===s.id), idx=s.queue.indexOf(e.id);
    const doneCount = s.queue.filter(id=>state.solved.includes(id)).length;
    showDialog(dialogHeader(`${worldById(e.world).title} / 句子拼装`,lessonById(e.lessonId)?.title || '句子拼装')+`<div class="dialog-body"><div class="challenge-top"><span class="challenge-mode">${icon('blocks')} 句子拼装</span><span class="challenge-counter">${idx+1} / ${s.queue.length} 题 · 本组已完成 ${doneCount}</span></div><div class="progress-track"><span style="width:${doneCount/s.queue.length*100}%"></span></div><h3 class="challenge-prompt">${esc(e.prompt)}</h3><p class="translation-text">${esc(e.translation)}</p><p class="section-note">点击下方词块加入句子；点击句子中的词块可撤回。标点由系统补充。</p><div class="sentence-tray" aria-label="已拼装句子">${s.selected.length?s.selected.map(id=>tokenHtml(e.tokens.find(t=>t.id===id),true)).join(''):'<span class="tray-placeholder">把词块放到这里，让句子成形…</span>'}${s.selected.length?`<span class="muted">${esc(e.punctuation || '.')}</span>`:''}</div><div class="word-bank" aria-label="可用词块">${s.tokens.filter(t=>!s.selected.includes(t.id)).map(t=>tokenHtml(t)).join('')}</div><div class="role-legend">${Object.entries(roles).filter(([r])=>e.tokens.some(t=>t.role===r)).map(([r,label])=>`<span data-role="${r}"><i></i>${label}</span>`).join('')}</div><p class="section-note">颜色表示本句中的成分；同一个词在其他句子中可能承担不同成分。</p>${s.hint?`<div class="hint-box"><strong>给你一个线索</strong><p>${esc(e.hint)}</p></div>`:''}<div id="exercise-feedback" role="status" aria-live="polite">${s.feedback}</div></div><div class="dialog-footer"><button class="btn btn-ghost" data-action="exercise-reset">重新拼装</button><button class="btn btn-secondary" data-action="hint">${s.hint?'收起提示':'给我提示'}</button>${s.checked?`<button class="btn btn-primary" data-action="next-exercise">${idx===s.queue.length-1?'完成本组':'下一题'} ${icon('arrow')}</button>`:'<button class="btn btn-primary" data-action="check-exercise">检查句子 '+icon('check')+'</button>'}</div>`);
  }
  function checkExercise() {
    const s=session,e=D.exercises.find(x=>x.id===s.id);
    const words = ids => ids.map(id=>e.tokens.find(t=>t.id===id)?.text);
    const correct = s.selected.length===e.tokens.length && [e.answer,...(e.acceptedAnswers||[])].some(a=>JSON.stringify(words(a))===JSON.stringify(words(s.selected)));
    if(correct){
      const first = !state.solved.includes(e.id); if(first) state.solved.push(e.id); delete state.review[e.id]; save(true); s.checked=true;
      s.feedback=`<div class="feedback success"><strong class="feedback-title">${icon('check')} 句子拼好了！${first?' +20 XP':''}</strong><p class="example-en" lang="en">${esc(answerText(e,s.selected))}</p><p class="feedback-text">${esc(e.explanation)}</p><button class="text-link" data-action="speak" data-text="${esc(answerText(e,s.selected))}">▷ 朗读这句话</button></div>`;
    }else if(s.selected.length!==e.tokens.length){s.feedback=`<div class="feedback info"><strong>句子还没拼完</strong><p>还剩 ${e.tokens.length-s.selected.length} 个词块。把词块都用上，再检查一次。</p></div>`;}
    else {state.review[e.id]=(state.review[e.id]||0)+1; save(true);s.feedback='<div class="feedback error"><strong>再调整一下，离答案更近一步。</strong><p>这个词序还不符合本题的目标结构。可以撤回词块重新排列，或打开提示。题目只识别预设词序，不代表其他表达都不成立。</p></div>';}
    renderExercise(); render();
    const feedback=$('#exercise-feedback');feedback.tabIndex=-1;feedback.focus({preventScroll:true});feedback.scrollIntoView({block:'nearest',behavior:'smooth'});
  }
  function endExerciseGroup() {
    const e=D.exercises.find(x=>x.id===session.id),queue=session.queue,done=queue.filter(id=>state.solved.includes(id)).length;
    const writing=D.writingChallenges.find(w=>w.world===e.world&&!state.written.includes(w.id))||D.writingChallenges.find(w=>w.world===e.world);
    session={type:'result'};
    showDialog(dialogHeader('KEEP THE MOMENTUM','把结构变成自己的表达')+`<div class="dialog-body result-summary"><span class="stat-icon">${icon('spark')}</span><h3>本组已完成 ${done} / ${queue.length} 题</h3><p>你已经练习了句子的排列。接下来试着在真实场景中，写下属于你的一句话。</p><div class="example-card"><p>${esc(worldById(e.world).title)}</p><strong class="stat-value">${xp()} XP</strong><p class="section-note">当前累计经验 · 相同任务只奖励一次</p></div></div><div class="dialog-footer"><button class="btn btn-secondary" data-action="close-dialog">返回页面</button>${writing?`<button class="btn btn-primary" data-action="open-writing" data-id="${esc(writing.id)}">挑战自主造句 ${icon('arrow')}</button>`:''}</div>`);render();
  }
  function answerText(e, ids=e.answer) { const text=ids.map(id=>e.tokens.find(t=>t.id===id).text).join(' '); return text.charAt(0).toUpperCase()+text.slice(1)+(e.punctuation||'.'); }
  function openQuiz(id,queue) {
    const q=D.quizzes.find(x=>x.id===id);if(!q)return;
    session={type:'quiz',id,selected:null,checked:false,feedback:'',options:shuffled(q.options.map((text,index)=>({text,index}))),queue:queue||D.quizzes.filter(x=>x.lessonId===q.lessonId).map(x=>x.id)};
    renderQuiz();
  }
  function renderQuiz() {
    const s=session,q=D.quizzes.find(x=>x.id===s.id),idx=s.queue.indexOf(q.id),done=s.queue.filter(id=>state.quizSolved.includes(id)).length;
    showDialog(dialogHeader(`${worldById(q.world).title} / 知识测验`,lessonById(q.lessonId).title)+`<div class="dialog-body"><div class="challenge-top"><span class="challenge-mode">${icon('quiz')} 理解后，再做判断</span><span class="challenge-counter">${idx+1} / ${s.queue.length} 题 · 已完成 ${done}</span></div><h3 class="challenge-prompt quiz-prompt">${esc(q.prompt)}</h3><div class="quiz-options" role="group" aria-label="选择答案">${s.options.map((o,i)=>`<button class="quiz-option ${s.checked&&o.index===q.correctIndex?'is-correct':s.checked&&o.index===s.selected?'is-wrong':''}" data-action="quiz-choice" data-index="${o.index}" ${s.checked?'disabled':''}><span class="option-letter">${String.fromCharCode(65+i)}</span><span>${esc(o.text)}</span>${s.checked&&o.index===q.correctIndex?'<span class="option-status">✓ 正确答案</span>':''}</button>`).join('')}</div><div id="quiz-feedback" role="status" aria-live="polite">${s.feedback}</div></div><div class="dialog-footer"><button class="btn btn-ghost" data-action="open-lesson" data-id="${esc(q.lessonId)}">回顾知识点</button>${s.checked?`<button class="btn btn-secondary" data-action="quiz-retry">再试一次</button><button class="btn btn-primary" data-action="next-quiz">${idx===s.queue.length-1?'完成本组':'下一题'} ${icon('arrow')}</button>`:'<span class="section-note">选择一个答案，查看解释。</span>'}</div>`);
  }
  function chooseQuiz(index) {
    const s=session;if(s?.type!=='quiz'||s.checked)return;const q=D.quizzes.find(x=>x.id===s.id);
    if(!Number.isInteger(index)||index<0||index>=q.options.length)return;
    s.selected=index;s.checked=true;const correct=index===q.correctIndex,first=correct&&!state.quizSolved.includes(q.id);
    if(correct){if(first)state.quizSolved.push(q.id);delete state.review[q.id];}
    else state.review[q.id]=(state.review[q.id]||0)+1;
    save(true);
    s.feedback=`<div class="feedback ${correct?'success':'error'}"><strong>${correct?`答对了！${first?' +20 XP':''}`:'再理解一下这个知识点'}</strong><p>${esc(q.explanation)}</p>${correct?'':`<p>正确答案：${esc(q.options[q.correctIndex])}。本题已加入复习列表。</p>`}</div>`;
    renderQuiz();render();const feedback=$('#quiz-feedback');feedback.tabIndex=-1;feedback.focus({preventScroll:true});feedback.scrollIntoView({block:'nearest',behavior:'smooth'});
  }
  function nextQuiz() {
    const s=session,idx=s.queue.indexOf(s.id);if(idx<s.queue.length-1){openQuiz(s.queue[idx+1],s.queue);return;}
    const done=s.queue.filter(id=>state.quizSolved.includes(id)).length,q=D.quizzes.find(x=>x.id===s.id);session={type:'result'};
    showDialog(dialogHeader('UNDERSTAND, THEN APPLY','本课测验结束')+`<div class="dialog-body result-summary"><span class="stat-icon">${icon('quiz')}</span><h3>本课已完成 ${done} / ${s.queue.length} 题</h3><p>结合解释回看规则，再用自己的例子练一遍。待复习题会留在学习手记里。</p></div><div class="dialog-footer"><button class="btn btn-secondary" data-action="close-dialog">返回页面</button><button class="btn btn-primary" data-action="open-lesson" data-id="${esc(q.lessonId)}">回顾本课</button></div>`);
  }
  function openWriting(id) {
    const w=D.writingChallenges.find(x=>x.id===id);if(!w)return;
    session={type:'write',id,checked:false,showReference:false};renderWriting();
  }
  function checkWriting(text,w) { return w.checks.map(c=>({label:c.label,pass:new RegExp(c.pattern,c.flags||'i').test(text)})); }
  function renderWriting() {
    const s=session,w=D.writingChallenges.find(x=>x.id===s.id),l=lessonById(w.lessonId),text=state.drafts[w.id]||'';
    showDialog(dialogHeader(`${worldById(w.world).title} / 自主造句`,w.title)+`<div class="dialog-body"><span class="challenge-mode">${icon('pen')} 现在，轮到你表达</span><h3 class="challenge-prompt">${esc(w.prompt)}</h3><ul class="writing-requirements">${w.requirements.map(r=>`<li>${esc(r)}</li>`).join('')}</ul>${l?formula(l):''}<label class="writing-area"><span class="eyebrow">YOUR SENTENCE · 你的句子</span><textarea id="writing-input" lang="en" spellcheck="true" maxlength="2000" placeholder="Write your own sentence here…" aria-describedby="writing-scope">${esc(text)}</textarea></label><div class="note-meta"><span id="writing-count">${text.length} / 2000</span><span>草稿自动保存在此浏览器</span></div><p class="writing-note" id="writing-scope">本地检查只匹配本关指定的词形或结构特征，不判断整体语法、语义、拼写或自然度。通过检查后，仍需自查表达。</p><div class="hint-box"><strong>表达提示</strong><p>${esc(w.hint)}</p></div><div id="writing-feedback" role="status" aria-live="polite"></div><div id="writing-reference"></div></div><div class="dialog-footer"><button class="btn btn-ghost" data-action="toggle-reference">查看参考表达</button><button class="btn btn-secondary" data-action="check-writing">检查目标特征</button><button class="btn btn-primary" id="save-writing-btn" data-action="save-writing" disabled>记录本次练习 +30 XP</button></div>`);
    if(state.written.includes(w.id)) $('#save-writing-btn').textContent='再次记录练习';
  }
  function showWritingFeedback() {
    const s=session,w=D.writingChallenges.find(x=>x.id===s.id),text=($('#writing-input').value||'').trim();
    if(!text){$('#writing-feedback').innerHTML='<div class="feedback info">先写下你自己的句子，再检查目标特征。</div>';return;}
    const checks=checkWriting(text,w),all=checks.every(c=>c.pass);s.checked=all;
    $('#writing-feedback').innerHTML=`<div class="feedback ${all?'success':'info'}"><strong>${all?'已匹配本关目标特征':'还有目标特征没有匹配到'}</strong><ul class="checklist">${checks.map(c=>`<li class="check-item ${c.pass?'pass':'fail'}">${c.pass?'✓':'○'} ${esc(c.label)}</li>`).join('')}</ul><p>规则匹配可能漏判，也可能把有语病的句子匹配为通过。请继续对照任务要求和参考表达。</p>${all?'<label class="self-review"><input type="checkbox" id="writing-self-review" /> 我已自查句意、语法与任务要求</label>':''}</div>`;
    $('#save-writing-btn').disabled=true;
  }
  function toggleReference() {
    const s=session,w=D.writingChallenges.find(x=>x.id===s.id);s.showReference=!s.showReference;
    $('#writing-reference').innerHTML=s.showReference?`<div class="reference-box"><span class="eyebrow">ONE POSSIBLE WAY · 一种参考表达</span><p class="example-en" lang="en">${esc(w.reference)}</p><p>${esc(w.referenceZh)}</p><p class="section-note">表达不只有一个答案。看看你的句子是否实现了同样的交流目的。</p><button class="text-link" data-action="speak" data-text="${esc(w.reference)}">▷ 朗读参考表达</button></div>`:'';
  }
  function saveWriting() {
    const w=D.writingChallenges.find(x=>x.id===session.id),text=$('#writing-input').value.trim();
    if(!session.checked||!$('#writing-self-review')?.checked||!checkWriting(text,w).every(c=>c.pass))return;
    const first=!state.written.includes(w.id);if(first)state.written.push(w.id);state.drafts[w.id]=text;save(true);render();
    $('#save-writing-btn').disabled=true;$('#save-writing-btn').textContent='✓ 本次练习已记录';toast(first?'表达练习已记录，+30 XP！':'已更新你的表达练习。');
  }
  function speak(text) {
    if(!('speechSynthesis' in window)){toast('此浏览器不支持朗读，可以直接阅读例句。');return;}
    speechSynthesis.cancel();const utterance=new SpeechSynthesisUtterance(text);utterance.lang='en-US';utterance.rate=.85;
    const voice=speechSynthesis.getVoices().find(v=>/^en[-_]/i.test(v.lang));if(voice)utterance.voice=voice;
    utterance.onerror=event=>{if(!['canceled','interrupted'].includes(event.error))toast('当前设备的英语语音不可用，朗读依赖浏览器和系统语音支持。');};speechSynthesis.speak(utterance);
  }
  function exportProgress() {
    const blob=new Blob([JSON.stringify({...state,exportedAt:new Date().toISOString()},null,2)],{type:'application/json'});
    const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`sentence-quest-${today()}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('学习记录已导出。');
  }
  async function importProgress(file) {
    if(!file)return;if(file.size>2*1024*1024){toast('记录文件过大，请选择本网站导出的 JSON 文件。');return;}
    try{const imported=cleanState(JSON.parse(await file.text()));if(!confirm('导入将替换此浏览器当前的学习记录。建议先导出当前记录。继续吗？'))return;state=imported;save();render();toast('学习记录已导入。');}catch{toast('无法读取记录，请选择本网站导出的有效 JSON 文件。');}
  }
  document.addEventListener('click',event=>{
    const b=event.target.closest('[data-action]');if(!b)return;const action=b.dataset.action,id=b.dataset.id;
    if(extras.onAction(action,b))return;
    if(action==='continue'){openLesson(recommendedLesson().id);}
    else if(action==='start-writing'){const w=D.writingChallenges.find(w=>!state.written.includes(w.id))||D.writingChallenges[0];openWriting(w.id);}
    else if(action==='show-progress'){location.hash='notebook';}
    else if(action==='filter'){worldFilter=id;listPage=1;render();}
    else if(action==='list-prev'||action==='list-next'){listPage+=action==='list-next'?1:-1;const results=$('#lesson-results');results.innerHTML=page==='learn'?lessonCards():practiceCards();results.tabIndex=-1;results.focus({preventScroll:true});results.scrollIntoView({block:'start',behavior:'smooth'});}
    else if(action==='open-lesson'){openLesson(id);}
    else if(action==='mark-read'){if(!state.learned.includes(id)){state.learned.push(id);save(true);render();toast('知识点已标记读过，+10 XP。');}openLesson(id);}
    else if(action==='lesson-practice'){if(!state.learned.includes(b.dataset.lesson)){state.learned.push(b.dataset.lesson);save(true);render();}openExercise(id);}
    else if(action==='lesson-quiz'){if(!state.learned.includes(b.dataset.lesson)){state.learned.push(b.dataset.lesson);save(true);render();}openQuiz(id);}
    else if(action==='close-dialog'){dialog.close();}
    else if(action==='open-exercise'){openExercise(id);}
    else if(action==='open-quiz'){openQuiz(id);}
    else if(action==='quiz-choice'){chooseQuiz(Number(b.dataset.index));}
    else if(action==='quiz-retry'&&session?.type==='quiz'){session.checked=false;session.selected=null;session.feedback='';renderQuiz();}
    else if(action==='next-quiz'&&session?.type==='quiz'){nextQuiz();}
    else if(action==='open-writing'){openWriting(id);}
    else if(action==='practice-mode'){practiceMode=b.dataset.mode;listPage=1;render();}
    else if(action==='add-token'&&session?.type==='assemble'&&!session.checked){if(!session.selected.includes(id))session.selected.push(id);session.feedback='';renderExercise();}
    else if(action==='remove-token'&&session?.type==='assemble'&&!session.checked){session.selected=session.selected.filter(t=>t!==id);session.feedback='';renderExercise();}
    else if(action==='exercise-reset'){session.selected=[];session.checked=false;session.feedback='';renderExercise();}
    else if(action==='hint'){session.hint=!session.hint;renderExercise();}
    else if(action==='check-exercise'&&session?.type==='assemble'){checkExercise();}
    else if(action==='next-exercise'){const s=session,idx=s.queue.indexOf(s.id);if(idx<s.queue.length-1)openExercise(s.queue[idx+1],s.queue);else endExerciseGroup();}
    else if(action==='check-writing'&&session?.type==='write'){showWritingFeedback();}
    else if(action==='toggle-reference'&&session?.type==='write'){toggleReference();}
    else if(action==='save-writing'&&session?.type==='write'){saveWriting();}
    else if(action==='speak'){speak(b.dataset.text);}
    else if(action==='export'){exportProgress();}
    else if(action==='import'){$('#progress-import').click();}
    else if(action==='reset'){if(confirm('确定清空此浏览器的学习进度、错题、造句草稿、收藏和查词记录？建议先导出记录。')){state=emptyState();save();render();toast('已清空本机学习记录。');}}
  });
  document.addEventListener('input',event=>{
    extras.onInput(event);
    if(event.target.id==='knowledge-search'){query=event.target.value;listPage=1;$('#lesson-results').innerHTML=page==='learn'?lessonCards():practiceCards();}
    if(event.target.id==='writing-input'&&session?.type==='write'){
      state.drafts[session.id]=event.target.value;session.checked=false;save();$('#writing-count').textContent=`${event.target.value.length} / 2000`;$('#save-writing-btn').disabled=true;$('#writing-feedback').innerHTML='';
    }
  });
  document.addEventListener('submit',extras.onSubmit);
  document.addEventListener('change',event=>{
    if(event.target.id==='level-filter'){levelFilter=event.target.value;listPage=1;$('#lesson-results').innerHTML=page==='learn'?lessonCards():practiceCards();}
    if(event.target.id==='writing-self-review')$('#save-writing-btn').disabled=!event.target.checked||!session?.checked;
    if(event.target.id==='progress-import')importProgress(event.target.files[0]);
  });
  $('.skip-link').addEventListener('click',event=>{event.preventDefault();main.focus();main.scrollIntoView({block:'start'});});
  dialog.addEventListener('close',()=>{session=null;if('speechSynthesis' in window)speechSynthesis.cancel();});
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  window.addEventListener('hashchange',()=>{if(dialog.open)dialog.close();navigate();window.scrollTo({top:0,behavior:'instant'});});
  navigate();
})();
