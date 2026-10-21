'use strict';
const {createPack}=require('./helpers.cjs');
const {pack,lesson,exercise,quiz,writing}=createPack();
pack.worlds=[
  {id:'vocabulary',title:'词汇档案馆',subtitle:'从认识一个词，到会用一组词',description:'构词、搭配、多义词、词典与提取复习，让词汇进入真实表达。',icon:'book',color:'#507b5b',soft:'#e8f1e7'},
  {id:'pronunciation',title:'发音实验室',subtitle:'听见声音，也理解声音',description:'音素、音标、重音、连读与语调知识；发音效果需要真实听辨和口头练习。',icon:'sound',color:'#9d6c93',soft:'#f4eaf2'},
  {id:'reading',title:'听读探索站',subtitle:'从抓住主旨，到追踪证据',description:'主旨、细节、推断与听读策略；选择和拼装练理解方法，不替代真实音频训练。',icon:'headphones',color:'#547f9d',soft:'#e7f0f7'},
  {id:'writing',title:'篇章写作港',subtitle:'让一句话成为一段有用的文字',description:'主题句、支撑、衔接、语域、邮件、摘要和改写，练习有目的的写作。',icon:'pen',color:'#b37c38',soft:'#f8efdf'}
];
pack.sources=[
  {title:'Cambridge Dictionary pronunciation guide',url:'https://dictionary.cambridge.org/help/phonetics.html',usedFor:'音标、重音符号以及英美发音标注差异'},
  {title:'British Council: Schwa',url:'https://www.teachingenglish.org.uk/professional-development/teachers/teaching-knowledge-database/q-s/schwa',usedFor:'非重读央元音与语流弱读'},
  {title:'British Council: Rhythm',url:'https://www.teachingenglish.org.uk/professional-development/teachers/knowing-subject/rhythm',usedFor:'句子重音、节奏和连接语流的关系'}
];
const id=(world,n)=>`xc-${world}-${n}`;
function L(world,n,title,tag,summary,analogy,formula,en,zh,points,pitfall,questions,level='基础'){
  const lessonId=id(world,n);
  lesson({id:lessonId,world,title,tag,summary,analogy,formula,en,zh,points,pitfall,level});
  questions.forEach((q,i)=>quiz({id:`${lessonId}-q${i+1}`,world,lessonId,prompt:q[0],options:q[1],correctIndex:q[2],explanation:q[3]}));
}
function E(world,n,ln,prompt,zh,chunks,explanation,hint,punctuation='.'){
  exercise({id:`xc-${world}-ex${n}`,world,lessonId:id(world,ln),prompt,zh,chunks,explanation,hint,punctuation});
}
function W(world,n,ln,title,prompt,requirements,hint,reference,referenceZh,checks){
  writing({id:`xc-${world}-w${n}`,world,lessonId:id(world,ln),title,prompt,requirements,hint,reference,referenceZh,checks:checks.map(([label,pattern])=>({label,pattern,flags:'i'}))});
}
module.exports=pack;

// WORLD: vocabulary
L('vocabulary',1,'词根与词族：建立关联','词族','把相关词放在一张词族网中，比较共同的形式、意思和实际用法。','词族像有亲缘关系的住户：有联系，但不住在同一个语法位置。','N:act → action → active|N:形式联系|N:词性与用法分别查','Regular practice improves my vocabulary.','规律练习能提高我的词汇能力。',['比较 act、action、active，可以观察形式和意义的联系，但仍需学习各自词性。','先根据例句确定词义，再建立词族联系；外形相似不保证同源或同义。'],'不要仅凭词根猜测就认定一个词在当前语境中的意思。',[
 ['action 和 active 可以一起学习的主要原因是什么？',['它们在任何句子中都能互换','它们形式和意义有联系，但用法不同','它们词性一定相同'],1,'词族帮助建立联系；action 通常是名词，active 通常是形容词，用法不同。'],
 ['遇到一个看似熟悉词根的新词，下一步更合理的是？',['根据上下文和词典核实','直接代入所有熟悉词义','忽略它的句法位置'],0,'构词信息只是线索，需要语境与词典证据确认。']
]);
L('vocabulary',2,'前缀：识别意义的方向','前缀','前缀常为词义增加否定、重复或其他方向，但具体解释要结合单词。','前缀像路标，提示方向，不替你读完整张地图。','N:re- + write → rewrite|N:重新写','I rewrote the opening paragraph.','我重写了开头那一段。',['rewrite 中 re- 表示再次；unhappy 中 un- 表示否定。','不是每个以 re 或 un 开头的单词都能按同样方式拆解；遇到不确定的词要查证。'],'不能随意把 un- 加到任何形容词前，词汇搭配有约定。',[
 ['rewrite 中 re- 最直接提示什么？',['次数完全相同','再次、重新','时间永远在未来'],1,'rewrite 表示重新写；re- 在这个词中提供重复方向。'],
 ['哪个学习方式更可靠？',['所有 re 开头的词都等于 again','用一个前缀自由创造所有词','把前缀当线索，再核对完整词义'],2,'前缀的生产能力和词义存在限制，不能机械拆词。']
]);
L('vocabulary',3,'后缀：观察词性变化','后缀与词性','一些后缀常和某种词性相关，可帮助预测句子中需要的形式。','后缀像工作证：提示常见身份，但仍要看实际岗位。','N:use → useful|N:动词／名词 → 形容词','This is a useful reference.','这是一份有用的参考资料。',['-ful 常出现在形容词中，如 useful；-ness 常构成名词，如 kindness。','学词时连同词性和一个例句记录，避免把词族成员放错位置。'],'不能把后缀当无例外的定理；friendly 通常是形容词，不能见 -ly 就判副词。',[
 ['This is a ___ tool. 空格选哪个最合适？',['usefully','useful','usefulness'],1,'名词 tool 前需要合适的形容词，useful 表示有用的。'],
 ['关于 -ly，哪项更准确？',['所有 -ly 单词都是副词','它只出现在名词中','很多副词有 -ly，但 friendly 等通常是形容词'],2,'后缀是线索而非无例外的分类器。']
]);
L('vocabulary',4,'转类与合成：熟词也能换工作','构词方式','有些词通过转类改变词性，也有些由多个词组合形成新词。','熟悉的积木可以换个岗位，也可以拼出新组件。','N:an email（名词）|N:email the file（动词）','Please email the file to me.','请把文件通过电子邮件发给我。',['email 可以作名词，也可以作动词；判断词性要看当前句中的位置。','website、notebook 等体现合成；合成词的拼写和意义需按词典核实。'],'不是每两个词都能任意拼成合成词；空格、连字符与连写也有约定。',[
 ['Please email the file. 中 email 的作用是什么？',['动作动词','冠词','介词'],0,'这里 email 表示发送电子邮件，作动词。'],
 ['遇到合成词时应注意什么？',['所有合成词都必须连写','都能逐字相加得到准确含义','核实整体含义及连写、分写或连字符形式'],2,'合成词的拼写与整体含义不能完全靠机械相加判断。']
]);
L('vocabulary',5,'搭配：让词语一起被记住','词汇搭配','常见搭配决定词语通常怎样一起出现，比孤立记中文释义更利于表达。','记住两块积木怎样咬合，下次组装会更顺。','N:make a decision|N:pay attention|N:strong evidence','We need to make a decision today.','我们今天需要作出决定。',['学习 make a decision 时，把动词和名词作为一个表达单元记录。','搭配可能涉及动词、形容词或介词；可以用学习词典中的例句核对。'],'中文都能说“做”，英语却不意味着所有场景都用 do。',[
 ['哪个是常见的英语搭配？',['do a decision','make a decision','make an attention'],1,'make a decision 是“作出决定”的常见搭配。'],
 ['学习新名词时，哪项最有助于以后造句？',['只抄中文释义','只数单词字母','记录常搭配的动词和例句'],2,'搭配和例句能帮助你把新词放进真实表达。']
]);
L('vocabulary',6,'多义词：让语境决定意思','语境与多义','同一个词可能有多个义项，要根据搭配、主题和句法位置判断。','一个词像多功能工具，当前场景决定拿出哪种功能。','N:run a company|N:run an experiment|N:run every morning','We will run the experiment tomorrow.','我们明天会运行这项实验。',['run a company 常指经营公司，run an experiment 常指运行或开展实验。','先读整个短语和上下文，再从词典中选择与语境相符的义项。'],'不要看到熟词就固定套用最早学到的中文翻译。',[
 ['run a company 中 run 最可能表示什么？',['跑步穿过','经营、管理','把公司画出来'],1,'company 作为搭配对象使 run 表达经营或管理。'],
 ['判断多义词的第一步更适合做什么？',['查看所在短语和上下文','永远选词典第一义项','把所有义项一起塞入翻译'],0,'语境是选择义项的重要依据，之后可用词典核实。']
]);
L('vocabulary',7,'学习词典：查的不只是翻译','词典策略','一次有效查词还应关注发音、词性、义项、搭配和例句。','词典是一份使用说明书，而不仅是一张翻译标签。','N:词形与发音|N:义项与词性|N:搭配与例句','I checked the pronunciation in a dictionary.','我在词典里查了这个词的发音。',['可数性、及物性等标记会影响冠词、复数和宾语结构。','选与当前语境相符的义项，读一条例句，再写一个自己的例子。'],'不同词典的音标和缩写可能略有不同；不熟悉时先看词典说明。',[
 ['要确定 feedback 能否直接加复数 -s，优先查看什么？',['可数性及该义项例句','单词颜色','页面广告'],0,'词典义项的可数性标记和例句可帮助确认名词用法。'],
 ['找到一个中文释义后，比较合理的下一步是？',['马上认定所有语境通用','读当前义项的搭配和例句','忽略词性'],1,'词性、搭配和例句决定这个义项如何进入句子。']
]);
L('vocabulary',8,'提取与间隔：把认识变成会用','复习策略','尝试不看答案回想词语，并在不同时间再次使用，比只重复浏览更有针对性。','把词从记忆抽屉里取出来，才知道抽屉是否真的找得到。','N:回想|N:核对|N:隔一段时间再用','I review new words by writing short sentences.','我通过写短句来复习新词。',['先看到意思或情境提示，尝试提取表达，再核对答案与搭配。','根据遗忘和使用情况调整复习间隔，保留容易混淆的例子。'],'没有适合所有人和所有词的固定最佳间隔；看过不等于已经能提取。',[
 ['哪项属于提取练习？',['一直看着词表默读','只反复划线','遮住答案，根据场景尝试说出表达'],2,'提取练习要求先从记忆中取出信息，再核对。'],
 ['复习间隔应该怎样安排？',['根据遗忘和熟练程度调整','所有词永远一天一次','记过一次就不再用'],0,'适合的间隔会随词语难度、遗忘和使用情况变化。']
]);
E('vocabulary',1,1,'用一个完整句子说明词汇学习的效果。','规律练习能提高我的词汇能力。','S:Regular practice|V:improves|O:my vocabulary','Regular practice 是主语，improves 是谓语；本题练表达，不测词汇量。','先说做法，再说它带来的效果。');
E('vocabulary',2,2,'说出一次已经完成的修改。','我昨天重写了开头那一段。','S:I|V:rewrote|O:the opening paragraph|M:yesterday','rewrote 是 rewrite 的过去式；re- 在此表示重新。','I 后接过去式 rewrote，再接修改的对象。');
E('vocabulary',3,3,'把 useful 放在名词 reference 前。','这是一份有用的参考资料。','S:This|V:is|C:a useful reference','useful 修饰 reference；a useful reference 作为整体描述主语。','先放 This is，再放名词短语。');
E('vocabulary',4,4,'用 email 作为动词提出请求。','请把文件通过电子邮件发给我。','M:Please|V:email|O:the file|M:to me','祈使句省略通常理解为 you 的主语，email 在本句中作动词。','以 Please 开头，后接动作和对象。');
E('vocabulary',5,5,'练习 make a decision 这个搭配。','我们今天需要作出决定。','S:We|V:need to make|O:a decision|M:today','make a decision 是本题目标搭配。','We need to make 后接 a decision。');
E('vocabulary',6,6,'让 run 的意思由 experiment 这个对象决定。','我们明天会运行这项实验。','S:We|V:will run|O:the experiment|M:tomorrow','这里 run the experiment 表示运行或开展实验，不是跑步。','先说 We will run，再接对象和时间。');
W('vocabulary',1,2,'解释一次重做','写一句话，说明你打算重写或重新检查什么。',['使用 rewrite 或 recheck 中的一个。','写清对象；自行检查这个动作是否符合你的真实意思。'],'可以用 I will rewrite... 或 We will recheck...。','I will rewrite the introduction tomorrow.','我明天会重写引言。',[['包含 rewrite 或 recheck','\\b(?:rewrite|recheck)\\b'],['包含 I 或 We','\\b(?:I|We)\\b']]);
W('vocabulary',2,5,'把搭配用起来','写一句包含 make a decision 的工作或日常表达。',['使用 make a decision。','自行补充谁作决定，以及何时或为什么需要决定。'],'可以从 We need to... 开始。','We need to make a decision before Friday.','我们需要在周五前作出决定。',[['包含 make a decision','\\bmake\\s+a\\s+decision\\b']]);
W('vocabulary',3,6,'同一个 run，不同的对象','用 run an experiment 或 run the experiment 描述一个安排。',['使用 run 与 experiment 构成的短语。','补充主语和有意义的时间或条件。'],'We will run the experiment... 是一种开头。','We will run the experiment after lunch.','我们午饭后会运行这项实验。',[['包含 run an/the experiment','\\brun\\s+(?:an|the)\\s+experiment\\b']]);
W('vocabulary',4,8,'写下你的复习计划','写一句具体的词汇复习安排。',['包含 review 和 words。','说明一个具体做法或时间；本地规则不评价复习效果。'],'可以用 review new words by writing...。','I review new words by writing short sentences every evening.','我每晚通过写短句复习新词。',[['包含 review','\\breview\\b'],['包含 words','\\bwords\\b']]);

// WORLD: pronunciation — written tasks teach knowledge; they do not score speech.
pack.sources.push(
  {title:'British Council: Using intonation',url:'https://www.teachingenglish.org.uk/comment/203509',usedFor:'语调与意图，常见模式是教学起点而非绝对规则'},
  {title:'BBC Learning English: The Pronunciation Lounge, R sounds',url:'https://downloads.bbc.co.uk/learningenglish/features/the_pronunciation_lounge/pron_lounge_episode_2_worksheet_.pdf',usedFor:'rhotic 与 non-rhotic 的 r 发音差异'}
);
L('pronunciation',1,'音素不是字母','声音与拼写','字母属于书写，音素属于声音系统；两者并非一一对应。','字母是包装，声音是里面的内容，同样包装不总装同样东西。','N:ship：4 个字母|N:/ʃ/ /ɪ/ /p/：3 个音素','I listen to the word before I repeat it.','我先听这个词，再跟读。',['ship 的 sh 两个字母一起表示 /ʃ/；不能按字母数量直接数音素。','先听可靠示范，再把拼写与声音对应起来，比逐个念字母更合适。'],'不同口音和分析系统可能有差异；不要把英语音素数量当成所有变体共有的固定值。',[
 ['ship 的 sh 在常见音素分析中表示什么？',['两个独立辅音 /s/ 与 /h/','一个音素 /ʃ/','一个元音'],1,'sh 在 ship 中表示 /ʃ/，不是逐字母拼出的两个声音。'],
 ['字母和音素的关系如何？',['永远一对一','字母越多音素一定越多','不总是一对一，需要结合实际发音'],2,'书写单位和声音单位不同，不能直接用字母数代替音素数。']
]);
L('pronunciation',2,'IPA：给声音一个可查的符号','音标入门','音标用符号表示发音，帮助你摆脱只靠字母猜声音的习惯。','音标像声音的坐标，配合音频才能更准确地找到位置。','N:/ʃ/：ship 开头|N:/θ/：think 开头|N:/ə/：常见弱元音','I check the phonetic symbols in a dictionary.','我在词典里查看音标。',['学习一个符号时，同时听示范、观察口型并联系熟悉词语。','/ˈ/ 通常标主重音，/ˌ/ 标次重音，符号放在相关音节之前。'],'不同词典可能采用稍有差异的标音惯例，应查看所用词典的符号说明。',[
 ['IPA 主要用来表示什么？',['单词的中文意思','声音及相关发音信息','单词使用频率'],1,'音标是发音信息的书写表示，不是词义翻译。'],
 ['不认识词典里的一个音标符号，最合适的是？',['查看该词典音标说明并听示范','根据符号外形随意读','忽略所有发音信息'],0,'词典说明可以解释符号，音频提供实际声音参照。']
]);
L('pronunciation',3,'最小对立：听出改变词义的差别','听辨知识','最小对立词在某个音素位置上不同，可用于集中注意关键声音差异。','只换一块声音积木，就可能换出另一个词。','N:ship /ʃɪp/|N:sheep /ʃiːp/','I compare ship and sheep in a recording.','我在录音中比较 ship 和 sheep 的发音。',['ship 和 sheep 的元音不同；辨别时要关注音质等特征，不能只把区别理解为读久一点。','真实听辨要使用可用音频，先辨认再模仿，并核对听到的是哪个词。'],'本页文字选择题只能检查概念理解，不能据此证明你已能在音频中分辨或发准。',[
 ['ship 与 sheep 是哪类练习材料？',['拼写完全相同的词','最小对立词例子','意义完全相同的词'],1,'两词在对应元音位置存在音素对立，适合集中练习该区别。'],
 ['仅做完这道文字题，可以说明什么？',['已经能在所有口音中听辨','发音已经完全准确','理解了最小对立这一概念'],2,'文字答题不能替代真实声音的听辨与口头产出。']
]);
L('pronunciation',4,'单词重音：哪一节更突出','词重音','多音节词中的重音位置是词语发音的一部分，应与单词一起学习。','一个词有自己的节拍，重音告诉你主要落点在哪里。','N:banana：第 2 音节主重音|N:音标中 ˈ 放在重读音节前','I mark the stressed syllable before I practise.','我练习前先标出重读音节。',['重读不只是提高音量，还可能与时长、音高和元音清晰度有关。','查词时一起记录主重音位置；不确定时不要只按拼写猜。'],'重音符号标记的是后面音节，不是前一个字母；词族变化时重音也可能改变。',[
 ['词典音标中的 ˈ 通常表示什么？',['后面音节具有主重音','单词到此结束','前一个字母必须省略'],0,'主重音符号位于相应重读音节之前。'],
 ['学习多音节词时，哪项应一起记录？',['只记录字母数量','主重音位置与实际发音','只记录中文翻译'],1,'重音位置属于词语的发音信息，需要和词一起学习。']
]);
L('pronunciation',5,'schwa 与弱读：轻的地方也有信息','弱元音','/ə/ 常出现在非重读音节或弱读形式中，是理解自然语流的重要线索。','有些声音像轻轻带过的连接线，轻不意味着可以随意丢掉。','N:/ə/：schwa|N:非重读音节／部分弱读形式','I listen for weak forms in short conversations.','我留意短对话中的弱读形式。',['一些功能词在不强调时常出现弱读形式；具体形式取决于词、语境和口音。','同一词在强调、对比或单独读出时，可能采用较强形式。'],'不能把每个非重读元音都机械读成 /ə/，也不能把所有功能词永远弱读。',[
 ['/ə/ 常被称为什么？',['主重音','schwa','字母名称'],1,'schwa 是常见非重读央元音的名称，用 /ə/ 表示。'],
 ['关于弱读，哪项更准确？',['每个功能词在任何场景都必须弱读','弱读等于把词删掉','是否弱读取决于语境、强调和发音变体'],2,'弱读是一种发音实现，受到语境与强调等因素影响。']
]);
L('pronunciation',6,'连接语流：词与词不总各自停顿','连读与语流','连续说话时，词边界处可能连接、同化或省音，要结合实际录音观察。','自然语流像一条路，词与词之间不一定都有减速带。','N:turn off：留意词边界|N:先听辨|N:再核对文本','Please turn off the light before you leave.','离开前请关灯。',['辅音与后面的元音相邻时，常可连贯衔接；不要在每个单词后强行停顿。','用短录音对照文本，标出自己漏听的边界，比只背抽象规则更容易定位问题。'],'连读、同化和省音不是必须到处使用的炫技规则；清晰可懂优先。',[
 ['为什么只会单词独立发音，仍可能听不懂短句？',['词在连续语流中的实现可能变化','短句不存在单词','所有词都完全不发音'],0,'词边界、弱读和其他语流特征会影响实际听到的形式。'],
 ['练习连接语流时更合适的做法是？',['越快越好，忽略可懂度','听短录音、核对文本、再模仿','把所有词都删除一半'],1,'听辨与文本核对帮助发现具体困难，之后再练产出。']
]);
L('pronunciation',7,'句子重音和语调：表达真正的意图','重音与语调','同样的词，通过不同突出位置和音高走向，可以表达不同重点或态度。','词语是台词，重音与语调告诉听众这句台词为什么说。','N:I said TUESDAY|N:not Thursday|N:对比焦点','I said Tuesday, not Thursday.','我说的是周二，不是周四。',['对比 Tuesday 和 Thursday 时，可以突出时间词，帮助对方抓住纠正信息。','常见升降调模式只能作入门线索；语境、态度和话轮功能会影响语调。'],'不能简化成“所有疑问句必须升调、所有陈述句必须降调”。',[
 ['I said TUESDAY, not Thursday. 突出 Tuesday 通常在强调什么？',['说话人的姓名','纠正具体日期信息','句子没有主语'],1,'对比重音使纠正的时间信息更突出。'],
 ['关于疑问句语调，哪项更准确？',['所有疑问句只能升调','语调完全不影响意义','常见模式有参考价值，但不能脱离语境'],2,'语调与交流意图和语境共同作用，不能套用单一绝对规则。']
]);
L('pronunciation',8,'发音变体：理解 rhotic 与 non-rhotic','口音差异','不同发音变体对某些 r 的处理不同；学习时明确参考变体，同时尊重可懂的差异。','地图有不同路线，目标是到达理解，而不是把所有路线画成一条。','N:rhotic：保留元音后 r|N:non-rhotic：部分位置不读 r|N:具体形式看语境与口音','I compare the British and American dictionary recordings.','我比较词典中的英式和美式录音。',['rhotic 口音通常保留元音后的 r；non-rhotic 口音在后面是辅音或停顿等位置通常不读这个 r。','英美内部都有差异；不要把所有英国人或所有美国人的发音当作单一模板。'],'non-rhotic 不等于所有 r 都消失；后面接元音等环境下，r 的表现需要结合具体语流。',[
 ['non-rhotic 可以直接理解成什么？',['所有位置都不读 r','英语中没有 r 这个字母','某些元音后 r 的发音受到位置与语境限制'],2,'non-rhotic 描述的是特定位置的 r 实现，不是删除所有 r。'],
 ['选择发音参考材料时，哪项更合适？',['明确参考变体，并理解内部也有差异','认定所有英国人发音完全一样','把不同口音差异都判为错误'],0,'明确参考来源利于练习，同时要避免把变体差异等同于错误。']
]);
E('pronunciation',1,1,'拼出一句学习安排；本题不评测实际发音。','我先听这个词，再跟读。','S:I|V:listen|M:to the word|M:before I repeat it','本题练习表达顺序；是否听清或读准需要真实音频与口头练习。','先放 I listen，再放听的对象和时间从句。');
E('pronunciation',2,2,'说明你如何查发音信息。','我在词典里查看音标。','S:I|V:check|O:the phonetic symbols|M:in a dictionary','本题句子说明一种学习行为，拼装正确不代表读音正确。','主语之后放 check，再放查询对象。');
E('pronunciation',3,3,'用句子描述一次对比听辨。','我在录音中比较这两个词。','S:I|V:compare|O:the two words|M:in a recording','compare the two words 表达比较行为；本题没有音频听辨评分。','I compare 后接对象，录音短语放后面。');
E('pronunciation',4,4,'描述练习前标重音的步骤。','我练习前先标出重读音节。','S:I|V:mark|O:the stressed syllable|M:before I practise','拼装检查的是词序，不判断你是否真的标对或读对重音。','先放 I mark，再放标记对象。');
E('pronunciation',5,5,'描述你在对话中留意的声音信息。','我留意短对话中的弱读形式。','S:I|V:listen|M:for weak forms|M:in short conversations','listen for 表示留意某种声音；目标仍是句子表达练习。','listen 后接 for weak forms。');
E('pronunciation',6,6,'拼出一个适合练习词边界的真实请求。','离开前请关灯。','M:Please|V:turn off|O:the light|M:before you leave','turn off 是自然表达，可在真实录音里留意词边界衔接；本题不评测连读。','Please 后放 turn off，再接 the light。');
W('pronunciation',1,2,'写下查发音的方法','用英语说明你如何用词典核对发音。',['包含 dictionary 和 pronunciation。','说明一个自己的实际步骤；此题只练书面表达。'],'I check the pronunciation in a dictionary...。','I check the pronunciation in a dictionary before I practise.','我练习前会在词典里核对发音。',[['包含 dictionary','\\bdictionary\\b'],['包含 pronunciation','\\bpronunciation\\b']]);
W('pronunciation',2,4,'给自己一个重音提醒','写一句话提醒自己标出单词的重读音节。',['包含 mark 和 stressed syllable。','自行检查提醒是否明确；本题不能判断你的口头重音。'],'可以用 I mark... before...。','I mark the stressed syllable before I read the word aloud.','我大声读词之前先标出重读音节。',[['包含 mark','\\bmark\\b'],['包含 stressed syllable','\\bstressed\\s+syllable\\b']]);
W('pronunciation',3,6,'安排一次录音对照','写一句话说明你会录下自己的声音，再与示范比较。',['包含 record 和 voice。','说明如何比较；没有自动发音打分。'],'I record my voice and compare it with...。','I record my voice and compare it with the example.','我录下自己的声音，再与示范比较。',[['包含 record','\\brecord\\b'],['包含 voice','\\bvoice\\b']]);
W('pronunciation',4,8,'说明你的参考变体','写一句话说明你会比较英式与美式词典录音。',['包含 British 和 American。','说明一次具体听音行为，避免把差异都看成错误。'],'可以用 I compare the British and American recordings...。','I compare the British and American recordings in the dictionary.','我比较词典里的英式和美式录音。',[['包含 British','\\bBritish\\b'],['包含 American','\\bAmerican\\b']]);

// WORLD: reading — original short texts and explicit evidence.
L('reading',1,'抓主旨：先知道这段在做什么','主旨与略读','先辨认主题和主要信息，再决定哪些细节值得精读。','先看地图上的目的地，再看路边每一个门牌号。','N:主题对象|N:主要动作／判断|N:细节支持','The app stores notes locally and lets users export them.','这个应用把笔记保存在本机，并允许用户导出。',['例句主要介绍应用的两项功能，不是在评价价格或下载量。','标题、首尾句和重复概念能提供线索，但主旨仍要覆盖全段而不只取一个词。'],'主旨不一定在第一句；抓到一个重复单词也不等于理解了中心意思。',[
 ['读句子：The app stores notes locally and lets users export them. 主旨最接近哪项？',['这个应用的两项笔记功能','用户一定都喜欢这个应用','这个应用比所有软件便宜'],0,'文本介绍本地保存和导出两项功能，没有评价受欢迎程度或价格。'],
 ['略读一篇文章时，首先希望获得什么？',['每个介词的完整语法分析','文章的大致主题与主要信息','所有生词的唯一译法'],1,'略读优先建立整体理解；有需要时再定位和精读。']
]);
L('reading',2,'找细节：带着问题定位','寻读与准确性','先明确要找时间、地点、对象还是条件，再定位并核对原文。','把问题当检索词，在文本里找对门牌号。','N:要找的信息类型|N:定位关键词|N:核对范围与单位','The workshop starts at 9:30 in Room 204.','工作坊九点半在 204 室开始。',['例句里的 9:30 是时间，204 是房间编号；数字出现不等于意义相同。','找到关键词后再读相关短语，留意否定、日期、时区和适用对象。'],'不要只匹配数字或同一个词而忽略它们在句中的关系。',[
 ['The workshop starts at 9:30 in Room 204. 地点是什么？',['9:30','Room 204','workshop starts'],1,'in Room 204 表示地点，at 9:30 表示时间。'],
 ['寻读找到相同关键词后，下一步应怎样做？',['立刻选答案，不再读','把所有相邻数字相加','核对相关短语、范围和条件'],2,'关键词只是定位线索，答案还取决于上下文。']
]);
L('reading',3,'做推断：有根据，也保留边界','推断与证据','推断应由文本线索支持，并区分可能、确定和完全没有依据。','证据是一段桥面，可以迈一步，但不能凭空跨过整条河。','N:文本线索|N:合理解释|N:不确定性','Mia checked the forecast and took an umbrella.','米娅看了天气预报，带上了一把伞。',['从例句可合理推测她可能预期下雨，但不能确定之后一定下雨。','比较多个解释，优先选需要最少额外假设、并符合上下文的一项。'],'自己的常识可以帮助理解，却不能替代文中没有提供的事实。',[
 ['Mia checked the forecast and took an umbrella. 哪个推断最有根据？',['她一定遇到了暴雨','她可能预期会下雨','她刚买了一辆车'],1,'看预报后带伞支持“可能预期下雨”，但不保证天气实际如此。'],
 ['区分文本事实和推断，主要是为了什么？',['避免把可能解释说成已经明示的事实','禁止使用任何常识','让答案越具体越好，即使没证据'],0,'推断有支持程度，不能把推断自动升级为事实。']
]);
L('reading',4,'追踪指代：it、they 指向谁','指代与衔接','根据数、句法和语义找出代词或指示表达指向的内容。','代词像省略的名牌，读者要顺着线找到它的主人。','N:A model scored well|J:but|N:it was slow','A model scored well, but it was slow.','一个模型得分不错，但它速度较慢。',['本例 it 指 model；不能只靠“最近一个单词”机械决定指代。','this、that 也可能指前面整个观点或事件，不一定只指一个名词。'],'找指代时要同时核对意义是否合理，不能只看距离。',[
 ['A model scored well, but it was slow. it 指什么？',['分数这个数字','model','单词 but'],1,'语义和结构都表明 it 指代这个模型。'],
 ['关于 this 的指代，哪项可能成立？',['只能指前一个字母','永远只能指人','可以概括前面一个观点或事件'],2,'指示表达可以指名词，也可概括更大范围的内容。']
]);
L('reading',5,'逻辑标记：顺着关系读','因果、转折与结果','because、however、therefore 等词帮助读者追踪原因、对比和推论。','连接词是路口指示牌，告诉你两句话是什么关系。','N:The sample was small|J:so|N:we collected more data','The sample was small, so we collected more data.','样本较小，所以我们收集了更多数据。',['例句中样本小是原因，收集更多数据是采取的行动。','however 常提示转折；therefore 提示推论或结果，但逻辑是否成立仍要看内容。'],'出现 therefore 不代表论证已经充分；同时发生也不自动证明因果关系。',[
 ['The sample was small, so we collected more data. 原因是什么？',['样本较小','数据一定错误','所有实验都结束了'],0,'so 前的 The sample was small 给出采取行动的原因。'],
 ['however 在篇章中通常提示什么关系？',['时间完全相同','转折或对比','名词必须变复数'],1,'however 常引出与前面信息形成对比的内容。']
]);
L('reading',6,'精读与泛读：选择合适的镜头','阅读策略','精读聚焦具体语言和论证，泛读更重视较长输入中的整体理解与持续阅读。','有时用放大镜看细节，有时拉远镜头看整个故事。','N:精读：分析关键段|N:泛读：持续理解较长材料','I read the article for the main idea before studying one paragraph.','我先读文章抓主旨，再仔细研究其中一段。',['精读时可拆句、查关键搭配并核对论证；不必把每一篇都逐字分析。','泛读适合选择能持续读懂大意的材料；难度过高时可换更合适的文本。'],'策略要服务目的；速度快不一定是泛读，读得慢也不自动等于理解深入。',[
 ['需要分析一段复杂论证时，哪种策略更适合？',['只看标题就结束','逐段乱猜','有目的地精读相关段落'],2,'精读有助于核对结构、语言和论证关系。'],
 ['较好的泛读材料通常应怎样选择？',['尽量能持续理解整体意思','每句话都完全看不懂','只按书的页数选择'],0,'能持续理解有助于保持有意义的较长输入。']
]);
L('reading',7,'精听与泛听：从整体到具体困难','听力策略','真实听力练习需要音频；可以先把握整体，再针对漏听处反复听与核对。','先听懂故事讲什么，再回放没听清的一小段。','N:初听主旨|N:重听细节|N:需要时核对文本','I listen once for the main idea and then check the details.','我先听一遍抓主旨，然后核对细节。',['精听可聚焦一小段，记录听到的内容并用文本定位漏听原因。','泛听强调较长的有意义输入；根据水平调整材料和字幕使用，不必追求一种固定流程。'],'本世界的文字选择题和拼装只检查方法与文本理解，不证明真实听力水平。',[
 ['没有播放任何音频，只答对听力方法题，能说明什么？',['所有对话都听得懂','理解了一项听力策略','口音已经标准'],1,'了解方法和真正完成听辨是两种不同证据。'],
 ['反复漏听同一个短语时，哪项更有针对性？',['永远把整段放快','直接认定没有这个词','重听短片段，必要时核对文本定位原因'],2,'局部重听和文本核对能帮助区分词汇、语流或注意力等困难。']
]);
L('reading',8,'记笔记：留下信息关系','笔记与行动项','笔记优先保留主题、证据和行动项，而不是试图逐字抄写。','笔记像给未来的自己留下路标，要知道谁做什么、何时完成。','N:对象／观点|N:关键证据|N:行动与截止时间','Leo will send the draft by Friday.','利奥会在周五前发出草稿。',['会议行动项可记录负责人、任务和截止时间；例句中三者分别是 Leo、send the draft、by Friday。','记录数字时保留单位、比较基准和不确定性；不清楚的信息标为待确认。'],'by Friday 表示不晚于周五；on Friday 表示在周五，不能无条件互换。',[
 ['Leo will send the draft by Friday. 哪份笔记最准确？',['Leo — send draft — no later than Friday','Friday — 谁都不用行动','Leo — 周五之后才开始'],0,'笔记保留负责人、动作和最晚时间。'],
 ['听到数字但没听清单位时，最好怎样处理？',['随便补一个单位','标记待确认，之后核对','永远删除所有数字'],1,'不确定信息应保留边界，避免把猜测当成可靠记录。']
]);
E('reading',1,1,'用真实句子概括应用的功能。','这个应用把笔记保存在本机。','S:The app|V:stores|O:notes|M:locally','句子明确表达应用的一项功能；本题练概括表达。','The app 后接 stores，再接对象。');
E('reading',2,2,'把时间和地点信息放进句子。','工作坊九点半在 204 室开始。','S:The workshop|V:starts|M:at 9:30|M:in Room 204','at 9:30 说明时间，in Room 204 说明地点。','先放 The workshop starts，然后按题目顺序放时间与地点。');
E('reading',3,3,'表达观察到的事实，保留推断边界。','米娅看了天气预报，带上了一把伞。','S:Mia|V:checked|O:the forecast|J:and|V:took|O:an umbrella','本句只报告两个行为，没有断言后来一定下雨。','主语之后先放 checked the forecast，再用 and 连接动作。');
E('reading',4,4,'用代词衔接同一个模型的信息。','这个模型准确，但速度很慢。','S:The model|V:was|C:accurate|J:but|S:it|V:was|C:slow','it 指前面的 model；but 连接形成对比的特点。','先组成 The model was accurate，再接 but。');
E('reading',5,5,'用 so 把原因和行动连起来。','样本较小，所以我们收集了更多数据。','S:The sample|V:was|C:small,|J:so|S:we|V:collected|O:more data','样本小是采取进一步行动的原因。','先说 The sample was small，再说采取了什么行动。');
E('reading',6,6,'描述先看整体再看局部的阅读安排。','我先略读文章，然后研究其中一段。','S:I|V:skim|O:the article|J:and then|V:study|O:one paragraph','本题说明阅读策略，不以词序成绩推断真实阅读水平。','先说 I skim the article，再接 and then。');
W('reading',1,2,'转述活动信息','根据 The workshop starts at 9:30 in Room 204. 写一句给同事的活动提醒。',['包含 workshop、9:30 和 Room 204。','保持时间地点与原句一致；规则不会全面判断转述准确性。'],'可以沿用原句，也可加 Please remember that...。','The workshop starts at 9:30 in Room 204.','工作坊九点半在 204 室开始。',[['包含 workshop','\\bworkshop\\b'],['保留 9:30','9:30'],['保留 Room 204','\\bRoom\\s+204\\b']]);
W('reading',2,3,'有边界地表达推断','根据“米娅看预报后带伞”，写一句表示可能下雨的推断。',['包含 may 和 rain。','不要声称已经确定下雨；自行核对推断是否受文本支持。'],'例如 She may think that...；也可以说 It may rain...。','Mia may think that it will rain later.','米娅可能认为稍后会下雨。',[['包含 may','\\bmay\\b'],['包含 rain','\\brain\\b']]);
W('reading',3,7,'设计一次听力练习','用英语写出“先听主旨，再检查细节”的练习安排。',['包含 main idea 和 details。','写出听的动作；本题没有音频评分。'],'I listen for the main idea and then...。','I listen for the main idea and then check the details.','我先听主旨，再核对细节。',[['包含 main idea','\\bmain\\s+idea\\b'],['包含 details','\\bdetails\\b'],['包含 listen','\\blisten\\b']]);
W('reading',4,8,'写下一条行动项','根据 Leo will send the draft by Friday. 写一句给团队的行动提醒。',['包含 Leo、draft 和 by Friday。','保持负责人、任务和最晚时间；自行检查含义。'],'可直接用 Leo will...，不要把 by 改成 after。','Leo will send the draft by Friday.','利奥会在周五前发出草稿。',[['包含 Leo','\\bLeo\\b'],['包含 draft','\\bdraft\\b'],['保留 by Friday','\\bby\\s+Friday\\b']]);

// WORLD: writing — original examples; no invented bibliographic references.
L('writing',1,'先定目的与读者，再选表达','写作规划与语域','写之前先明确希望读者知道什么或采取什么行动，再决定细节和语气。','同一封信寄给同事和陌生客户，需要不同的信封和说明。','N:目的|N:读者与背景|N:语气与细节','Could you review this paragraph before the meeting?','你能在会议前看一下这一段吗？',['向同事请求帮助时，要写清任务与时间；对不熟悉背景的读者应补充必要信息。','语域要符合关系和场景；正式不等于堆长词，简洁也不等于没礼貌。'],'不要把口语缩略、聊天俚语或生硬命令无差别搬进所有正式场景。',[
 ['开始写一封工作邮件前，应优先明确什么？',['读者是谁，以及希望对方做什么','怎样让每个句子最长','怎样使用最多生词'],0,'目的和读者决定内容、语气与信息量。'],
 ['关于正式表达，哪项更准确？',['必须尽可能复杂','应清楚、得体，并适合场景','越模糊越正式'],1,'得体的正式表达强调清楚和适用，不要求无谓复杂。']
]);
L('writing',2,'主题句：给段落一个方向','段落中心','一段文字通常围绕一个中心展开，主题句帮助读者知道这段要解释什么。','主题句像段落的路标，后面的句子要朝同一方向走。','N:主题句|N:支撑细节|N:必要的总结或过渡','Regular feedback helps our team improve its work.','定期反馈有助于团队改进工作。',['这个主题可由具体反馈方式、实际改进例子或相关证据支撑。','主题句不一定永远在第一句；本课先用开头明确主题的结构练习。'],'不要在同一短段里突然跳到无关的天气、旅行等主题，除非解释了联系。',[
 ['主题句说“定期反馈有助于团队改进工作”，哪项最相关？',['描述团队如何根据反馈修改报告','介绍完全无关的旅游路线','列出所有国家首都'],0,'支撑细节应解释或证明当前段落中心。'],
 ['关于主题句的位置，哪项更准确？',['所有段落都必须第一句直说中心','主题句不能帮助读者','位置可以变化，但中心和支撑关系应清楚'],2,'开头放主题句是有用练习方式，不是所有文体的绝对规则。']
]);
L('writing',3,'支撑句：用例子和证据展开','具体性与证据','主题之后补充解释、例子或证据，让读者看出判断如何得到支持。','主题句搭骨架，支撑句添上能站住的结构。','N:判断|N:具体例子／证据|N:解释二者的关系','For example, a checklist helps us notice missing sections.','例如，检查清单帮助我们发现缺失的部分。',['例子应与中心直接相关，并解释它为什么能支持观点。','事实、数据和引用要有可核实来源；个人经验应按个人经验表述。'],'不能为了让段落显得可靠而编造数据、实验结果或不存在的来源。',[
 ['写作中加入一个例子，主要是为了什么？',['让字数必然翻倍','具体解释或支持当前观点','代替所有证据核实'],1,'例子应服务当前论点，其本身也要准确且相关。'],
 ['暂时没有支持某项数字的证据，应怎么办？',['编一个看起来合理的数字','把它改成任何精确百分比','寻找可靠来源，或删除、限制该数字性断言'],2,'不能把缺少证据的精确数字写成已知事实。']
]);
L('writing',4,'衔接与连贯：让读者跟得上','篇章关系','用明确指代和合适的连接表达显示信息关系，同时保持内容本身有逻辑。','连接词像桥牌，桥两端也必须真的接得上。','N:前文信息|J:however / therefore|N:有逻辑关系的新信息','The tool is fast. However, it needs more memory.','这个工具速度很快，不过它需要更多内存。',['however 表示对比；因此不能随意替换为表示结果的 therefore。','清楚重复核心词有时比模糊代词更好；避免出现不知道指向谁的 this 或 it。'],'连接词数量多不等于段落连贯；逻辑断裂不能靠加 moreover 修好。',[
 ['The tool is fast. ___, it needs more memory. 表达对比宜选什么？',['Therefore','However','Because of'],1,'速度快与内存需求高构成不同维度的取舍，however 表示对比。'],
 ['段落已经偏离中心，最有用的修改是什么？',['重组或删除无关信息','再加十个连接词','把所有句子合成一个长句'],0,'内容和逻辑结构是连贯的基础，连接词不能替代它们。']
]);
L('writing',5,'工作邮件：把请求写到位','邮件结构','用明确主题、必要背景、具体请求和时间信息，让对方容易采取行动。','好邮件像一张清楚的任务卡，读完就知道下一步。','N:主题与称呼|N:背景与请求|N:时间与结束语','Could you send the revised draft by Friday?','你能在周五前发来修改稿吗？',['主题应说明事项，例如 Request for draft review；正文交代是什么稿件以及需要什么帮助。','涉及截止时间时写清日期；跨时区任务必要时注明时区并留出合理时间。'],'不要让 please review it 中的 it 没有明确指向，也不要把请求埋在很长的无关背景里。',[
 ['哪一项更便于同事执行？',['有空随便处理一下那个东西','Could you review the attached draft by Friday?','只写 Urgent 而不说明任务'],1,'该请求说明动作、对象和时间，比模糊催促更具体。'],
 ['跨时区约定会议，哪项信息可能需要补充？',['更多感叹号','随机缩写','明确日期、时间与时区'],2,'时间约定需要避免日期和时区歧义。']
]);
L('writing',6,'摘要：保留重点与限制','概括信息','用更少的话表达原文主要内容，保留对理解结论必要的范围与限制。','摘要是缩小后的地图，不能把关键边界擦掉。','N:原文核心发现|N:必要范围|N:重要限制','Model B was fastest in this test, but it used more memory.','模型 B 在这次测试中最快，但占用更多内存。',['练习原文设定为：团队测试三个模型；B 在本次测试最快，但内存用得更多。摘要应保留这个取舍。','摘要不应新增原文没有的“所有任务最好”或“已经商用”等结论。'],'最快不等于各方面最好；删除限制有时会改变原意。',[
 ['原文说 B 在本次测试最快但更耗内存，哪项摘要更忠实？',['B 在所有任务都最好','B 在本次测试最快，但更耗内存','B 一定最便宜'],1,'该摘要保留了测试范围和内存方面的限制。'],
 ['做摘要时遇到重要限制，应怎样处理？',['为了简短全部删除','改成更强的确定结论','保留影响主要结论理解的限制'],2,'摘要需要简洁，也需要保持原意和必要边界。']
]);
L('writing',7,'改写：换表达，不改意思','转述与改写','理解原文后重组表达，核对事实、关系、范围和不确定性有没有改变。','改写像换一张地图画法，目的地和边界仍要一致。','N:理解原意|N:重新组织|N:核对与归属','In this test, the revised tool processed the files faster.','在这次测试中，修改后的工具处理文件更快。',['练习原意为“修改工具后，本次测试的文件处理时间减少”；改写可换结构，但保留本次测试这一范围。','只替换几个同义词可能保留原文结构过多，也可能产生不自然搭配。'],'改写不自动免除注明来源的需要；具体署名与引用格式遵循实际任务要求。',[
 ['改写后应优先核对什么？',['原意、范围和关系是否保持','是否每个词都更长','是否删掉了所有限制'],0,'改写的核心是换表达而保持信息准确。'],
 ['关于引用归属，哪项更合适？',['只要换同义词就永远不用说明来源','使用别人的观点仍应按要求注明来源','改写可以编造原文没有的结果'],1,'表达改变不等于观点来源改变，归属仍要清楚。']
]);
L('writing',8,'引用与归属：分清谁说了什么','学术表达与诚信','明确区分他人观点、直接引文和自己的解释，并核对来源是否真实支持所述内容。','给观点贴好来源标签，读者才能沿线回去检查。','N:来源提示|N:准确转述／短引文|N:自己的解释','According to the project report, the sample was small.','根据项目报告，样本规模较小。',['本课 project report 只是情境例子，不是一条已经存在的正式参考文献。实际写作要填写真实可查的来源。','直接使用原文措辞时按要求加引号或引文格式；转述观点也应适当归属。'],'不能捏造作者、年份、DOI 或页码；引用存在也不代表它支持你写的具体论断。',[
 ['According to... 这类表达主要帮助做什么？',['说明观点或信息的来源','保证后面的结论永远正确','代替对来源的核验'],0,'来源提示建立归属，但内容准确性与支持关系仍需核验。'],
 ['还没有找到真实来源，最不应做什么？',['继续寻找支持证据','缩小或删去缺乏支持的断言','编造作者年份来填满引用'],2,'参考文献和具体元数据必须真实，不能为了完整外观而虚构。']
]);
E('writing',1,1,'提出一个对象与时间都明确的请求。','你能在会议前看一下这一段吗？','V:Could|S:you|V:review|O:this paragraph|M:before the meeting','Could you + 动词原形提出礼貌请求，同时明确对象和时间。','以 Could you 开头，再放动作和对象。','?');
E('writing',2,2,'写出一条明确的段落主题句。','定期反馈有助于团队改进工作。','S:Regular feedback|V:helps|O:our team|C:improve its work','本句提出可进一步解释和支撑的中心观点。','先说 Regular feedback，再说它帮助谁做什么。');
E('writing',3,3,'用例子解释检查清单的作用。','例如，检查清单帮助我们发现缺失的部分。','M:For example,|S:a checklist|V:helps|O:us|C:notice missing sections','For example 引出支撑信息，但例子仍需要与段落中心相关。','For example, 放在前面，后接 a checklist helps us。');
E('writing',4,4,'用 but 表达一个工具的取舍。','这个工具速度很快，但需要更多内存。','S:The tool|V:is|C:fast|J:but|V:needs|O:more memory','同一主语 The tool 支配 is fast 和 needs more memory 两个并列部分。','先说优点，再用 but 接另一项需求。');
E('writing',5,5,'写清交付对象与截止时间。','你能在周五前发来修改稿吗？','V:Could|S:you|V:send|O:the revised draft|M:by Friday','by Friday 表示最晚在周五，区别于只说一个模糊的时间。','先放 Could you send，再放对象和 by Friday。','?');
E('writing',6,6,'保留摘要中的测试范围和取舍。','模型 B 在这次测试中最快，但占用更多内存。','S:Model B|V:was|C:fastest|M:in this test,|J:but|S:it|V:used|O:more memory','in this test 限定范围，but 部分保留重要限制。','先形成 Model B was fastest，再接范围和转折。');
W('writing',1,2,'写一个有支撑的短段落','写两句介绍“定期反馈怎样帮助团队”的短段落。',['第一句包含 feedback，表达中心。','第二句用 For example 引出一个具体例子。','自行核对两句话是否围绕同一中心；规则只查目标标记。'],'可以先说 Regular feedback helps...，再给出一个修改工作成果的例子。','Regular feedback helps our team improve its work. For example, comments from colleagues help us clarify the report.','定期反馈有助于团队改进工作。例如，同事的意见帮助我们把报告写清楚。',[['包含 feedback','\\bfeedback\\b'],['包含 For example','\\bFor\\s+example\\b']]);
W('writing',2,5,'写一句能执行的邮件请求','请同事在周五前审阅草稿，写一句明确的礼貌请求。',['包含 Could you、review、draft 和 by Friday。','自行检查请求内容与时间是否清晰。'],'Could you review... by Friday? 是一种结构。','Could you review the draft by Friday?','你能在周五前审阅这份草稿吗？',[['包含 Could you','\\bCould\\s+you\\b'],['包含 review','\\breview\\b'],['包含 draft','\\bdraft\\b'],['包含 by Friday','\\bby\\s+Friday\\b']]);
W('writing',3,6,'用一句话概括带限制的结果','根据本课设定，概括模型 B 在测试中的速度优势和内存代价。',['包含 Model B、fastest 和 memory。','保留 in this test 这一范围，以及 but 表示的取舍。','不要扩展成在所有任务中最好；规则不全面验证忠实度。'],'Model B was fastest in this test, but...。','Model B was fastest in this test, but it used more memory.','模型 B 在这次测试中最快，但占用更多内存。',[['包含 Model B','\\bModel\\s+B\\b'],['包含 fastest','\\bfastest\\b'],['保留 in this test','\\bin\\s+this\\s+test\\b'],['包含 but 和 memory','\\bbut\\b[\\s\\S]*\\bmemory\\b']]);
W('writing',4,7,'改写并保留测试范围','把“The revised tool reduced file processing time in this test.”改写成强调文件处理更快的一句话。',['保留 revised tool 与 in this test。','使用 faster，表达处理更快。','自行核对原意与范围；这段原文是本站练习示例。'],'可以改成 In this test, the revised tool processed...。','In this test, the revised tool processed the files faster.','在这次测试中，修改后的工具处理文件更快。',[['保留 revised tool','\\brevised\\s+tool\\b'],['保留 in this test','\\bin\\s+this\\s+test\\b'],['包含 faster','\\bfaster\\b']]);

// Resource checks document access scope rather than claiming per-sentence sourcing.
pack.sources.forEach(source=>{source.checkedOn='2026-10-21';source.verification=source.url.includes('cambridge.org')?'官方搜索片段已核对；直接读取页面返回403，未逐行核验整页':'已成功读取官方网页或PDF正文；仅核对对应基础概念';});
