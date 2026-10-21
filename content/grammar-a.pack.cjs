'use strict';
const {createPack}=require('./helpers.cjs');
const {pack,lesson,exercise,quiz,writing}=createPack();

module.exports=pack;
function unit(world,id,info,practice,question){
  lesson({id,world,...info});
  practice.forEach((item,i)=>exercise({id:id+'-e'+(i+1),world,lessonId:id,...item}));
  quiz({id:id+'-q',world,lessonId:id,...question});
}
// PARTS 1–5: countability, quantity, and articles.
unit('parts','xa-p-count',{
 title:'可数与不可数：先选对计量方式',tag:'count / non-count',summary:'同一个概念是否能直接用数字计数，决定它能否加复数、搭配 a，以及使用哪类数量词。',analogy:'书可以一本本数，建议常要先装进“条”这样的计量盒。',formula:'S:We|V:need|O:two pieces of advice',en:'We need two pieces of advice.',zh:'我们需要两条建议。',points:['advice、information、equipment 在常见用法中是不可数名词。','用 a piece of advice / two pieces of advice 表达一条或两条建议。','一些名词可有不同用法：a paper 可指一篇论文，paper 也可指纸这种材料。'],pitfall:'不要写 two advices；要数的是 pieces。',level:'基础'},[
 {prompt:'说明需要两条建议。',zh:'我们需要两条建议。',chunks:'S:We|V:need|O:two pieces of advice',explanation:'advice 不直接加复数，数量由 pieces 表达。',hint:'先确定需要什么，再选择计量短语。'},
 {prompt:'说明收到了一些有用的信息。',zh:'我收到了一些有用的信息。',chunks:'S:I|V:received|O:some useful information',explanation:'information 为不可数名词，这里用 some 修饰。',hint:'information 不加 -s。'}],
 {prompt:'哪一句正确表达“我需要一些建议”？',options:['I need some advices.','I need some advice.','I need an advice.'],correctIndex:1,explanation:'advice 在此不可数，some advice 正确；也可用 a piece of advice。'});
unit('parts','xa-p-plural',{
 title:'复数形式：不只是末尾加 s',tag:'plural nouns',summary:'可数名词的复数可能是规则变化、不规则变化，或单复数同形；动词也要和实际数匹配。',analogy:'多数角色复制时加标记，有些角色有专用的“多人形态”。',formula:'S:These analyses|V:reveal|O:three problems',en:'These analyses reveal three problems.',zh:'这些分析揭示了三个问题。',points:['study → studies；box → boxes；child → children。','analysis 的复数是 analyses；person 的常用复数是 people。','this / that 配单数，these / those 配复数。'],pitfall:'these analysis 形式不一致；用 these analyses。',level:'基础'},[
 {prompt:'说明两项研究支持你的结论。',zh:'两项研究支持这个结论。',chunks:'S:Two studies|V:support|O:the conclusion',explanation:'study 变复数 studies；复数主语后用 support。',hint:'“两项研究”是一个复数主语词块。'},
 {prompt:'用不规则复数介绍团队成员。',zh:'三个人加入了团队。',chunks:'S:Three people|V:joined|O:the team',explanation:'person 的常用复数是 people。',hint:'先说三个人，再说加入的组织。'}],
 {prompt:'analysis 的常用复数形式是哪一个？',options:['analysises','analysis','analyses'],correctIndex:2,explanation:'analysis → analyses。单复数词尾的拼写和读音都不同。'});
unit('parts','xa-p-quantity',{
 title:'数量词：many、much、few 与 little',tag:'quantifiers',summary:'先看名词是否可数，再区分“有一些”和“几乎没有”的语气。',analogy:'数量词既是计量尺，也带有说话人对数量是否足够的判断。',formula:'S:We|V:have|O:a little time|M:before lunch',en:'We have a little time before lunch.',zh:'午饭前我们还有一点时间。',points:['many / a few / few 配复数可数名词；much / a little / little 配不可数名词。','a few / a little 表示有一些；few / little 常突出很少、可能不够。','a lot of 可用于复数可数名词和不可数名词。'],pitfall:'few time 搭配不对；time 表示时间量时通常用 little。',level:'基础'},[
 {prompt:'说明你还有一点时间。',zh:'截止日期前我还有一点时间。',chunks:'S:I|V:have|O:a little time|M:before the deadline',explanation:'time 是不可数时间量，因此用 a little。',hint:'“有一点”带 a。'},
 {prompt:'说明会议中提出了几个问题。',zh:'我们在会议中提出了几个问题。',chunks:'S:We|V:raised|O:a few questions|M:at the meeting',explanation:'questions 可数复数，a few 表示有几个。',hint:'a few 后接复数问题。'}],
 {prompt:'哪一项最明确表达“还有一点水”？',options:['a little water','few water','many water'],correctIndex:0,explanation:'water 表示水这种物质时不可数，a little water 表示有一点水。'});
unit('parts','xa-p-indefinite',{
 title:'a 与 an：由读音决定的首次介绍',tag:'a / an',summary:'a / an 常用于单数可数名词前介绍一个对象，选择取决于后面紧接着的读音。',analogy:'首次登场先发一张“某一个”的入场券；券型由读音选择。',formula:'S:She|V:is|C:an experienced engineer',en:'She is an experienced engineer.',zh:'她是一位经验丰富的工程师。',points:['an hour 用 an，因为 hour 的 h 不发音。','a university 用 a，因为 university 以 /j/ 音开头。','选择看紧接的词：an engineer，但 a skilled engineer。'],pitfall:'不要只看拼写中的元音字母；an university 不正确。',level:'基础'},[
 {prompt:'介绍一位经验丰富的工程师。',zh:'她是一位经验丰富的工程师。',chunks:'S:She|V:is|C:an experienced engineer',explanation:'experienced 以元音音素开头，使用 an。',hint:'冠词和它后面紧接的读音配合。'},
 {prompt:'说明一项培训持续一小时。',zh:'这次培训持续了一个小时。',chunks:'S:The training|V:lasted|M:an hour',explanation:'hour 以元音音素开头，因此用 an hour。',hint:'这里的 hour 不发 h 音。'}],
 {prompt:'哪一个短语正确？',options:['an useful tool','a useful tool','a hour'],correctIndex:1,explanation:'useful 以 /j/ 音开头，用 a；hour 的 h 不发音，用 an。'});
unit('parts','xa-p-definite',{
 title:'the 与零冠词：特指和泛指分清楚',tag:'the / zero article',summary:'the 常标记双方可以识别的对象；泛指复数事物或不可数概念时常不用冠词。',analogy:'the 像一道聚光灯，照向语境中能认出的那一个或那一组。',formula:'S:The report|V:is|C:on the desk',en:'The report is on the desk.',zh:'那份报告在桌上。',points:['I read a report. The report was useful. 第二次提及可用 the。','Books can change ideas. 中 Books 泛指书，不用 the。','不可数概念泛指也常省冠词：Research takes time。'],pitfall:'Research takes time 中不能为了凑单数形式写 a research。',level:'基础'},[
 {prompt:'指明那份已知报告的位置。',zh:'那份报告在桌上。',chunks:'S:The report|V:is|C:on the desk',explanation:'语境中能识别的报告使用 the report。',hint:'is 后面的短语说明位置。'},
 {prompt:'概括研究活动需要什么。',zh:'研究需要耐心。',chunks:'S:Research|V:requires|O:patience',explanation:'research 和 patience 在此泛指不可数概念，不加 a。',hint:'泛指概念直接用名词。'}],
 {prompt:'泛指“书能改变想法”，哪句自然？',options:['A books can change ideas.','The book can change an ideas.','Books can change ideas.'],correctIndex:2,explanation:'泛指书这一类事物可用零冠词复数 Books。'});
// PARTS 6–10: pronouns, determiners, and agreement.
unit('parts','xa-p-pronoun-case',{
 title:'代词格与反身代词：谁做、对谁、自己',tag:'I / me / myself',summary:'人称代词随句中任务变化；动作回到主语自己时，常用反身代词。',analogy:'主格是行动者名牌，宾格是接收者名牌，反身代词把动作箭头折回自己。',formula:'S:I|V:taught|O:myself|O:Python',en:'I taught myself Python.',zh:'我自学了 Python。',points:['I / she / we / they 常作主语；me / her / us / them 常作宾语。','介词后也通常用宾格：with me、for them。','myself / herself / ourselves 等可指与主语相同的对象：We introduced ourselves。'],pitfall:'不要把 myself 当作 I 或 me 的“更正式”替代词随意使用。',level:'基础'},[
 {prompt:'说明你自学了一门语言。',zh:'我自学了 Python。',chunks:'S:I|V:taught|O:myself|O:Python',explanation:'学习者和施教者都是 I，因此用反身代词 myself。',hint:'teach oneself something 表示自学某内容。'},
 {prompt:'说明对方邀请了我们。',zh:'她邀请我们参加工作坊。',chunks:'S:She|V:invited|O:us|M:to the workshop',explanation:'us 是 invite 的宾语，不能换成主格 we。',hint:'动词后用宾格 us。'}],
 {prompt:'选择正确句子。',options:['Her helped I.','She helped myself.','She helped me.'],correctIndex:2,explanation:'She 作主语，me 作宾语；myself 不能在这里替代 me。'});
unit('parts','xa-p-possessive',{
 title:'所有格：my 后有名词，mine 可以独立',tag:'my / mine / team’s',summary:'所有格限定词放在名词前；名词性物主代词可以独立表示所属物。',analogy:'my 像贴在物品上的标签，mine 像直接代指“我的那件”的取物牌。',formula:'S:This notebook|V:is|C:hers',en:'This notebook is hers.',zh:'这本笔记本是她的。',points:['my / your / her / our 后通常接名词：our project。','mine / yours / hers / ours 可独立使用：The project is ours。','the team’s plan 表达团队的计划；复数 teams 的所有格可写 teams’。'],pitfall:'hers 和 its 不带表示所有关系的撇号；it’s 是 it is 或 it has 的缩写。',level:'基础'},[
 {prompt:'用物主代词说明笔记本归属。',zh:'这本笔记本是她的。',chunks:'S:This notebook|V:is|C:hers',explanation:'hers 独立作表语，不再跟 notebook。',hint:'“她的那本”可以用 hers。'},
 {prompt:'说明团队完成了自己的项目。',zh:'我们完成了自己的项目。',chunks:'S:We|V:finished|O:our project',explanation:'project 前使用所有格限定词 our。',hint:'our 与 project 组成完整宾语。'}],
 {prompt:'哪一项能填入 This laptop is ___？',options:['mine','my','me'],correctIndex:0,explanation:'mine 可独立表示“我的那台”；my 后需要名词。'});
unit('parts','xa-p-determiners',{
 title:'each、every 与 both：逐个还是整体',tag:'distributive determiners',summary:'each / every 常搭配单数可数名词，both 搭配复数名词，关注方式不同。',analogy:'each 把镜头逐个推近，both 把两位成员一起装进画面。',formula:'S:Each applicant|V:submits|O:a portfolio',en:'Each applicant submits a portfolio.',zh:'每位申请者都提交一份作品集。',points:['each applicant 和 every applicant 都是单数名词短语。','both methods 表示两种方法，作主语时通常用复数谓语。','either option 表示两者中的任意一个；neither option 表示两者都不。'],pitfall:'不能写 every applicants；every 后的可数名词通常为单数。',level:'基础'},[
 {prompt:'描述逐人的申请要求。',zh:'每位申请者都提交一份作品集。',chunks:'S:Each applicant|V:submits|O:a portfolio',explanation:'Each applicant 视作单数，使用 submits。',hint:'每一位对应单数动词。'},
 {prompt:'比较两种方法的共同需求。',zh:'两种方法都需要更多数据。',chunks:'S:Both methods|V:require|O:more data',explanation:'Both methods 是复数主语，require 不加第三人称单数 -s。',hint:'both 表示两种都包括。'}],
 {prompt:'选择与 both 匹配的形式。',options:['Both method works.','Both methods work.','Both methods works.'],correctIndex:1,explanation:'both + 复数名词，复数主语通常搭配 work。'});
unit('parts','xa-p-agreement',{
 title:'主谓一致：让动词认出主语的数',tag:'subject–verb agreement',summary:'一般现在时中，第三人称单数主语常让实义动词加 -s / -es；be 也随主语变化。',analogy:'动词要读取主语的身份卡，而不是根据句子长度决定形态。',formula:'S:The software|V:runs|M:on my laptop',en:'The software runs on my laptop.',zh:'这个软件在我的笔记本电脑上运行。',points:['She works，但 I / you / we / they work。','software、equipment 常为不可数名词，作主语时通常按单数处理。','疑问或否定有 does 时，主要动词回到原形：Does it work?'],pitfall:'Does it works? 重复标记第三人称单数；应写 Does it work?。',level:'基础'},[
 {prompt:'说明软件运行环境。',zh:'这个软件在我的笔记本电脑上运行。',chunks:'S:The software|V:runs|M:on my laptop',explanation:'software 在这里不可数，使用 runs。',hint:'单数主语和 runs 配对。'},
 {prompt:'介绍同事的工作方式。',zh:'我的同事们远程工作。',chunks:'S:My colleagues|V:work|M:remotely',explanation:'colleagues 为复数，谓语用 work。',hint:'复数不加第三人称单数 -s。'}],
 {prompt:'哪一句正确？',options:['The equipment are ready.','The equipment be ready.','The equipment is ready.'],correctIndex:2,explanation:'equipment 在此为不可数名词，通常搭配 is。'});
unit('parts','xa-p-agreement-head',{
 title:'长主语的一致：找到中心词',tag:'head noun',summary:'主语后即使带有 of 等修饰短语，谓语的数通常仍由主语中心词决定。',analogy:'长队伍里负责发号施令的是队长，旁边的成员数量不能替队长投票。',formula:'S:The list of changes|V:is|C:ready',en:'The list of changes is ready.',zh:'更改清单准备好了。',points:['The list of changes 中心词是单数 list，因此用 is。','The results of the study 中心词是复数 results，因此用 are。','One of my colleagues 作主语时，中心是 one：One of my colleagues works here。'],pitfall:'不要被距离动词更近的 changes 误导成 The list of changes are。',level:'进阶'},[
 {prompt:'报告更改清单状态。',zh:'更改清单准备好了。',chunks:'S:The list of changes|V:is|C:ready',explanation:'主语中心词 list 是单数，changes 只是 of 短语中的名词。',hint:'先找到 list。'},
 {prompt:'介绍其中一位同事的工作地点。',zh:'我的一位同事在伦敦工作。',chunks:'S:One of my colleagues|V:works|M:in London',explanation:'主语核心 one 为单数，因此用 works。',hint:'“同事中的一位”仍然是一位。'}],
 {prompt:'哪一项能填入 The results of the study ___ promising？',options:['are','is','was'],correctIndex:0,explanation:'主语中心词 results 为复数；of the study 不改变它的数。'});
// SENTENCE 1–5: transformations and existential sentences.
unit('sentence','xa-s-negative',{
 title:'否定句：先识别助动词',tag:'not / do not',summary:'有 be、情态动词或已有助动词时通常在其后加 not；一般时实义动词常借助 do。',analogy:'否定开关装在助动词位置，主要动作不需要再重复变化。',formula:'S:The tool|V:does not support|O:this format',en:'The tool does not support this format.',zh:'这个工具不支持这种格式。',points:['She is not ready；We cannot access the file。','一般现在时：I do not know / He does not know。','一般过去时：They did not reply；did 后接动词原形。'],pitfall:'不能写 He does not knows；does 已经承担相应变化。',level:'基础'},[
 {prompt:'明确说明你还没理解要求。',zh:'我不理解这个要求。',chunks:'S:I|V:do not understand|O:the requirement',explanation:'一般现在时实义动词否定使用 do not + 原形。',hint:'否定词块 do not understand 是整体谓语。'},
 {prompt:'说明工具的功能限制。',zh:'这个工具不支持这种格式。',chunks:'S:The tool|V:does not support|O:this format',explanation:'单数 The tool 使用 does not，support 保持原形。',hint:'把功能限制放在工具之后。'}],
 {prompt:'哪句否定表达正确？',options:['She did not replied.','She did not reply.','She not replied.'],correctIndex:1,explanation:'did not 后使用动词原形 reply。'});
unit('sentence','xa-s-yesno',{
 title:'一般疑问句：把助动词放到主语前',tag:'yes / no questions',summary:'一般疑问句常用助动词、be 或情态动词置于主语之前；实义动词一般时常借助 do。',analogy:'把句子的“开关”移到门口，就能邀请对方确认是否成立。',formula:'V:Can|S:you|V:share|O:the file',en:'Can you share the file?',zh:'你能分享这个文件吗？',points:['You are ready → Are you ready?','They confirmed it → Did they confirm it?','情态动词提前后，主要动词仍用原形：Can she join?'],pitfall:'不要写 Did they confirmed it?；did 后面用 confirm。',level:'基础'},[
 {prompt:'请求对方确认能否分享文件。',zh:'你能分享这个文件吗？',chunks:'V:Can|S:you|V:share|O:the file',explanation:'Can 放到 you 前面，share 使用原形。',hint:'情态动词放在句首。',punctuation:'?'},
 {prompt:'询问对方是否确认了会议。',zh:'他们确认这次会议了吗？',chunks:'V:Did|S:they|V:confirm|O:the meeting',explanation:'过去时疑问使用 Did + 主语 + 动词原形。',hint:'过去时间由 Did 表达。',punctuation:'?'}],
 {prompt:'哪一句是正确的一般疑问句？',options:['Does she works remotely?','She does work remotely?','Does she work remotely?'],correctIndex:2,explanation:'does 提到主语前，work 使用原形。'});
unit('sentence','xa-s-wh',{
 title:'特殊疑问句：确定缺少哪类信息',tag:'who / what / where / how',summary:'特殊疑问词指出未知信息，许多问句使用“疑问词 + 助动词 + 主语 + 动词”。',analogy:'先给信息缺口贴上“谁、什么、哪里”的标签，再请求补齐。',formula:'O:What|V:did|S:you|V:change',en:'What did you change?',zh:'你改了什么？',points:['Where does she work? 询问地点，where 后使用疑问语序。','How did you solve it? 询问方式。','疑问词本身作主语时通常不加 do：Who sent the email?'],pitfall:'Who sent it? 和 Who did you invite? 中 who 的句中任务不同，语序也不同。',level:'基础'},[
 {prompt:'询问对方改动的内容。',zh:'你改了什么？',chunks:'O:What|V:did|S:you|V:change',explanation:'What 代替 change 的宾语并放在句首，did 后接 change。',hint:'先放未知对象 What。',punctuation:'?'},
 {prompt:'询问同事的工作地点。',zh:'她在哪里工作？',chunks:'M:Where|V:does|S:she|V:work',explanation:'Where 指地点，does 位于主语 she 前。',hint:'Where + does + she + work。',punctuation:'?'}],
 {prompt:'询问“谁发了这封邮件”，哪句最合适？',options:['Who sent the email?','Who did sent the email?','Who the email sent?'],correctIndex:0,explanation:'who 在此作主语，直接接 sent，无需加 did。'});
unit('sentence','xa-s-imperative',{
 title:'祈使句：清楚地给出行动指令',tag:'imperatives',summary:'祈使句通常省略主语 you，以动词原形开头；否定常用 do not。',analogy:'操作指南直接亮出下一步动作，不必每一步都重新叫出执行者。',formula:'M:Please|V:save|O:your work',en:'Please save your work.',zh:'请保存你的工作。',points:['Save the file. 的隐含执行者通常是听者 you。','Do not share your password. 是否定指令。','please 可以缓和语气，但复杂请求常用 Could you ...? 更合适。'],pitfall:'祈使句的动作通常用原形，不能写 Please saves the file。',level:'基础'},[
 {prompt:'提醒对方保存工作。',zh:'请保存你的工作。',chunks:'M:Please|V:save|O:your work',explanation:'祈使句省略 you，动词用原形 save。',hint:'Please 放在句首。'},
 {prompt:'给出账号使用提醒。',zh:'不要分享你的密码。',chunks:'V:Do not|V:share|O:your password',explanation:'Do not + 原形表达否定祈使。',hint:'Do not 引出禁止的动作。'}],
 {prompt:'哪一句适合用作操作指令？',options:['Please opening the file.','Please open the file.','Please opens the file.'],correctIndex:1,explanation:'祈使句通常用动词原形 open。'});
unit('sentence','xa-s-there',{
 title:'there be：先介绍某处有什么',tag:'existential there',summary:'there be 用来引入存在的事物；标准书面语中 be 的形式通常与后面的名词数一致。',analogy:'先打开场景，再把场景里出现的人或物推到前台。',formula:'N:There|V:is|S:a problem|M:with the upload',en:'There is a problem with the upload.',zh:'上传出现了一个问题。',points:['There is a problem；There are two options。','There was / were 可表达过去存在的情况。','There is ... 介绍存在，It is ... 常继续描述已知对象。'],pitfall:'写作中不要把 There is two options 当作标准搭配；复数通常用 are。',level:'基础'},[
 {prompt:'说明上传过程存在问题。',zh:'上传出现了一个问题。',chunks:'N:There|V:is|S:a problem|M:with the upload',explanation:'存在一个问题，单数 a problem 配 is。',hint:'先用 There 引出存在结构。'},
 {prompt:'说明可供选择的方案数量。',zh:'目前有两个可供考虑的选项。',chunks:'N:There|V:are|S:two options|M:on the table',explanation:'two options 为复数，因此使用 are。',hint:'are 和 two options 匹配。'}],
 {prompt:'哪句符合常见标准书面语？',options:['There is three reasons.','There has three reasons.','There are three reasons.'],correctIndex:2,explanation:'three reasons 是复数，there be 结构通常使用 are。'});
// SENTENCE 6–10: information structure and connected clauses.
unit('sentence','xa-s-it',{
 title:'形式主语 it：把较长内容放到后面',tag:'It is ... to / It takes ...',summary:'用 it 先占据主语位置，再把较长的不定式或从句放到句后，让句子更易读。',analogy:'先用一个轻便的占位牌开场，再展开真正需要解释的事项。',formula:'S:It|V:is|C:useful|N:to keep a learning log',en:'It is useful to keep a learning log.',zh:'保留学习日志很有用。',points:['It is useful to keep a log. 中 it 是形式主语，真正讨论的是记日志这件事。','It takes twenty minutes to get there. 可说明做某事需要多长时间。','不是每个 it 都是占位词：I bought a book. It is useful. 中 it 指书。'],pitfall:'不要把指代具体事物的 it 和形式主语 it 一概当成同一种用法。',level:'基础'},[
 {prompt:'评价记录学习过程的价值。',zh:'保留学习日志很有用。',chunks:'S:It|V:is|C:useful|N:to keep a learning log',explanation:'较长的 to keep a learning log 后置，it 占据主语位置。',hint:'先给评价，再说评价的事项。'},
 {prompt:'说明路程所需时间。',zh:'到那里需要二十分钟。',chunks:'S:It|V:takes|O:twenty minutes|N:to get there',explanation:'It takes + 时间 + to do 表达做某事耗时。',hint:'takes 后先放时间。'}],
 {prompt:'哪句正确表达“核对来源很重要”？',options:['It is important to check the source.','It important checking the source.','It is importance check the source.'],correctIndex:0,explanation:'It is + 形容词 + to do 是常见形式主语结构。'});
unit('sentence','xa-s-indirect-question',{
 title:'间接问句：嵌入句子后用陈述语序',tag:'embedded questions',summary:'把问题放进 know、wonder、Could you tell me 等结构时，内部问句通常使用主语在谓语前的顺序。',analogy:'直接问句进入外层句子后，要收起自己的倒装队形。',formula:'S:I|V:wonder|O:whether the data are available',en:'I wonder whether the data are available.',zh:'我想知道这些数据是否可用。',points:['Where is the station? → Could you tell me where the station is?','Do they agree? → I wonder whether they agree。','整体是否加问号取决于外层句子：Could you ...? 是问句；I wonder ... 通常是陈述。'],pitfall:'不能写 Could you tell me where is the station?；内部要用 where the station is。',level:'进阶'},[
 {prompt:'礼貌询问车站位置。',zh:'你能告诉我车站在哪里吗？',chunks:'V:Could|S:you|V:tell|O:me|O:where the station is',explanation:'外层 Could you ... 是疑问语序，内层 where the station is 使用陈述语序。',hint:'最后一个词块的 is 已在主语后。',punctuation:'?'},
 {prompt:'表达你关心数据能否使用。',zh:'我想知道这些数据是否可用。',chunks:'S:I|V:wonder|O:whether the data are available',explanation:'whether 引出嵌入的是非问题，内部使用陈述语序。',hint:'wonder 后接完整问题内容。'}],
 {prompt:'哪一个内部语序正确？',options:['I know where does she work.','I know where she works.','I know where works she.'],correctIndex:1,explanation:'嵌入的 where 从句使用主语 she + 谓语 works 的顺序。'});
unit('sentence','xa-s-tag',{
 title:'附加问句：确认共同认知',tag:'question tags',summary:'陈述后追加简短问句进行确认，常见模式是前肯后否、前否后肯，并匹配助动词和代词。',analogy:'说完一句判断后，回头加一句“对吗”，邀请对方确认。',formula:'S:You|V:have finished|O:the draft,|N:haven’t you',en:'You have finished the draft, haven’t you?',zh:'你已经完成初稿了，对吗？',points:['She is ready, isn’t she? 匹配 be。','You work here, don’t you? 一般现在时实义动词借助 do。','They did not reply, did they? 前否后肯；真实语气还受到语调影响。'],pitfall:'附加部分不能一律写 isn’t it；要匹配前面的主语和助动词。',level:'进阶'},[
 {prompt:'确认对方已经完成初稿。',zh:'你已经完成初稿了，对吗？',chunks:'S:You|V:have finished|O:the draft,|N:haven’t you',explanation:'前句有 have，后面用否定附加问句 haven’t you。',hint:'附加问句放在逗号后。',punctuation:'?'},
 {prompt:'确认她会参加。',zh:'她会加入我们，对吗？',chunks:'S:She|V:is joining|O:us,|N:isn’t she',explanation:'前面是 is joining，附加部分使用 isn’t she。',hint:'is 与 isn’t 对应。',punctuation:'?'}],
 {prompt:'补全 You work here, ___？',options:['isn’t it','doesn’t you','don’t you'],correctIndex:2,explanation:'一般现在时主语 you 的实义动词问句用 do，前肯后否用 don’t you。'});
unit('sentence','xa-s-focus',{
 title:'强调与部分倒装：把重点推到前面',tag:'clefts / partial inversion',summary:'强调句可突出特定信息；某些限制或否定成分前置时，会触发助动词与主语的部分倒装。',analogy:'舞台可以把聚光灯照向一个角色，也可以先亮出关键时间让读者注意。',formula:'M:Only then|V:did|S:I|V:understand|O:the problem',en:'Only then did I understand the problem.',zh:'直到那时我才理解这个问题。',points:['It was your example that clarified the idea. 突出起作用的例子。','Only then / Never 等状语放在句首时，常出现 did I understand 这样的部分倒装。','普通陈述 I understood the problem 不需要倒装；倒装中 did 后使用原形。'],pitfall:'不要把所有前置状语都倒装：Yesterday I worked at home 是正常语序。',level:'进阶'},[
 {prompt:'强调理解发生的关键时刻。',zh:'直到那时我才理解这个问题。',chunks:'M:Only then|V:did|S:I|V:understand|O:the problem',explanation:'Only then 前置触发 did I understand 的部分倒装。',hint:'did 位于主语 I 前。'},
 {prompt:'强调真正澄清观点的是对方的例子。',zh:'正是你的例子澄清了这个想法。',chunks:'S:It|V:was|C:your example|N:that clarified the idea',explanation:'It was ... that ... 把焦点放在 your example。',hint:'焦点信息放在 was 与 that 从句之间。'}],
 {prompt:'Only then 放在句首时，哪句正确？',options:['Only then did I understand it.','Only then I did understood it.','Only then did understand I it.'],correctIndex:0,explanation:'Only then 作为限制性状语前置，常用助动词 + 主语 + 动词原形。'});
unit('sentence','xa-s-coordinate',{
 title:'并列与省略：相同部分不必重复',tag:'coordination / ellipsis',summary:'and、but、or 可以连接结构相当的成分；共享且清楚的部分有时可以省略。',analogy:'两段路径共用同一个起点时，不必给每条路径再画一个起点。',formula:'S:I|V:checked|O:the figures|J:and|V:updated|O:the report',en:'I checked the figures and updated the report.',zh:'我核对了数字并更新了报告。',points:['两个动作共享 I：I checked ... and updated ...。','并列完整分句可各有主语：The method is fast, but it is less accurate。','省略的前提是意思清楚；不要省掉第二个分句真正不同的主语或必要信息。'],pitfall:'I reviewed the paper and the reply drafted 不平行；可写 I reviewed the paper and drafted the reply。',level:'进阶'},[
 {prompt:'简洁报告完成的两个动作。',zh:'我核对了数字并更新了报告。',chunks:'S:I|V:checked|O:the figures|J:and|V:updated|O:the report',explanation:'and 连接两个共享主语 I 的动词短语。',hint:'先放一个完整动作，再用 and 接第二个。'},
 {prompt:'对比两种方法的长处。',zh:'第一种方法很快，但第二种更准确。',chunks:'S:The first method|V:is|C:fast,|J:but|S:the second|V:is|C:more accurate',explanation:'but 连接两个对比的完整分句，第二个 method 可以从语境恢复。',hint:'两种方法各有自己的主语和评价。'}],
 {prompt:'哪句具有自然的并列结构？',options:['I checked the file and the email sent.','I checked the file and sent the email.','I checked the file and sending the email.'],correctIndex:1,explanation:'checked 和 sent 是并列的过去式谓语，共享主语 I。'});
// TENSE 1–5: past reference points and future perspectives.
unit('tense','xa-t-past-continuous',{
 title:'过去进行时：在过去的镜头里看过程',tag:'was / were + -ing',summary:'过去进行时把某个过去时刻作为镜头，展示当时正在展开的动作；一般过去时常推进事件。',analogy:'一个镜头持续播放背景动作，另一个镜头切入突然发生的事件。',formula:'S:I|V:was writing|O:the report|M:when you called',en:'I was writing the report when you called.',zh:'你打电话来时，我正在写报告。',points:['was / were + -ing 描述过去某时正在进行的动作。','when you called 中 called 表示切入的过去事件。','while 常连接两个同时进行的过程，但不能仅凭 when / while 机械决定时态。'],pitfall:'I was write 缺少 -ing；I writing 则缺少助动词。',level:'进阶'},[
 {prompt:'说明来电时正在做的事。',zh:'你打电话来时，我正在写报告。',chunks:'S:I|V:was writing|O:the report|M:when you called',explanation:'was writing 是当时的持续背景，called 是发生的事件。',hint:'先拼过去进行的主句。'},
 {prompt:'回顾昨晚八点的工作。',zh:'昨晚八点我们正在测试服务器。',chunks:'S:We|V:were testing|O:the server|M:at eight last night',explanation:'过去具体时刻的过程用 were testing 展示。',hint:'We 与 were 搭配。'}],
 {prompt:'描述过去某时正在写作，应选哪个结构？',options:['was writing','was wrote','had write'],correctIndex:0,explanation:'过去进行时的结构是 was / were + 动词 -ing。'});
unit('tense','xa-t-past-perfect',{
 title:'过去完成时：比过去的参照点更早',tag:'had + past participle',summary:'过去完成时从一个过去参照点向前回看，强调某动作在那个点之前已经完成。',analogy:'先把日历翻到过去，再向更早的一页追溯。',formula:'S:We|V:had completed|O:the tests|M:before the meeting began',en:'We had completed the tests before the meeting began.',zh:'会议开始前，我们已经完成了测试。',points:['had + 过去分词对各人称形式相同。','过去参照点可由 before / by the time 从句或上下文提供。','如果事件先后已经清楚，一般过去时也可能自然；过去完成时用于突出更早的层次。'],pitfall:'had finished 通常需要过去参照语境，不要把它当作任意“很久以前”的标签。',level:'进阶'},[
 {prompt:'突出会议前已完成的工作。',zh:'会议开始前，我们已经完成了测试。',chunks:'S:We|V:had completed|O:the tests|M:before the meeting began',explanation:'完成测试发生在过去的会议开始之前。',hint:'更早的动作使用 had completed。'},
 {prompt:'说明你到达前同事已经离开。',zh:'在我到达之前，她已经离开办公室了。',chunks:'S:She|V:had left|O:the office|M:before I arrived',explanation:'left 是 leave 的过去分词；离开发生得更早。',hint:'过去完成时不使用 had leaved。'}],
 {prompt:'过去完成时的规范形式是哪一个？',options:['has finished','had finished','had finish'],correctIndex:1,explanation:'过去完成时由 had + 过去分词组成。'});
unit('tense','xa-t-future-plans',{
 title:'未来表达：预测、计划与已安排事项',tag:'will / be going to / present progressive',summary:'未来可以用不同结构表达；选择时要区分预测、事先打算和较明确的安排，而不只盯着未来时间词。',analogy:'同一张未来日历上，猜测、打算和已确认的预约使用不同标记。',formula:'S:I|V:am meeting|O:the supervisor|M:tomorrow',en:'I am meeting the supervisor tomorrow.',zh:'我明天要见导师。',points:['will 可表达预测、承诺或当下决定，具体含义取决于上下文。','be going to 常表达已有打算，也可基于当前迹象预测。','现在进行时加未来时间可以表达已经安排的事项：I am meeting her tomorrow。'],pitfall:'不能用“出现 tomorrow 就必须 will”这样的单一规则。',level:'进阶'},[
 {prompt:'说明明天已安排的会面。',zh:'我明天要见导师。',chunks:'S:I|V:am meeting|O:the supervisor|M:tomorrow',explanation:'现在进行时配未来时间可表达已安排的会面。',hint:'这里不是正在见面，而是已安排的未来事项。'},
 {prompt:'说明团队已有的改进打算。',zh:'我们打算下周重新设计仪表盘。',chunks:'S:We|V:are going to redesign|O:the dashboard|M:next week',explanation:'are going to redesign 表达已有打算。',hint:'把完整计划谓语放在 We 后。'}],
 {prompt:'哪句话常用于表达已安排的明天会面？',options:['I meeting her tomorrow.','I met her tomorrow.','I am meeting her tomorrow.'],correctIndex:2,explanation:'am meeting 可在 tomorrow 的未来语境中表达安排。'});
unit('tense','xa-t-future-continuous',{
 title:'将来进行时：未来某刻正在做什么',tag:'will be + -ing',summary:'将来进行时从未来某一时刻观看一个正在展开的动作或预计中的活动。',analogy:'把摄像机提前安放在明天的某个时刻，观察那时的过程。',formula:'S:We|V:will be discussing|O:the budget|M:at this time tomorrow',en:'We will be discussing the budget at this time tomorrow.',zh:'明天这个时候我们将正在讨论预算。',points:['结构是 will be + 动词 -ing。','常与 at this time tomorrow、at ten tomorrow 等未来参照点配合。','它强调那时的过程，与 will finish 所强调的完成事件不同。'],pitfall:'不能省略 be 写成 will discussing。',level:'进阶'},[
 {prompt:'说明明天此时的会议内容。',zh:'明天这个时候我们将正在讨论预算。',chunks:'S:We|V:will be discussing|O:the budget|M:at this time tomorrow',explanation:'未来某刻的持续过程使用 will be discussing。',hint:'进行时里的 be 不能漏。'},
 {prompt:'告知同事你明天九点的安排。',zh:'我明天九点将正在主持培训。',chunks:'S:I|V:will be leading|O:the training|M:at nine tomorrow',explanation:'will be leading 从未来九点看正在进行的活动。',hint:'先拼未来过程，再加时间。'}],
 {prompt:'将来进行时的完整结构是哪一个？',options:['will be working','will working','will have worked'],correctIndex:0,explanation:'will be working 表达未来某刻的进行过程。'});
unit('tense','xa-t-future-perfect',{
 title:'将来完成时：到未来节点已经完成',tag:'will have + past participle',summary:'将来完成时站在未来参照点回看，说明某动作到那时已经完成。',analogy:'提前站到交付日，回头检查哪些任务已经打上完成标记。',formula:'S:We|V:will have finished|O:the draft|M:by Friday',en:'We will have finished the draft by Friday.',zh:'到周五我们就已经完成初稿了。',points:['结构是 will have + 过去分词。','by Friday 强调截至周五这一节点，和 on Friday 的“在周五”不同。','by the time 引出的未来时间从句通常用现在时：by the time she arrives。'],pitfall:'不能写 will have finish；have 后需过去分词 finished。',level:'进阶'},[
 {prompt:'承诺截至周五初稿已完成。',zh:'到周五我们就已经完成初稿了。',chunks:'S:We|V:will have finished|O:the draft|M:by Friday',explanation:'站在周五节点回看，完成状态用 will have finished。',hint:'by Friday 给出完成截止点。'},
 {prompt:'预测月底前的课程完成量。',zh:'到月底我就已经完成三门课程了。',chunks:'S:I|V:will have completed|O:three courses|M:by the end of the month',explanation:'will have completed 说明未来节点前累计完成的量。',hint:'先说届时已完成，再说明数量。'}],
 {prompt:'哪句表达“截至明天已经完成”？',options:['We will have finish it by tomorrow.','We will have finished it by tomorrow.','We will have finishing it by tomorrow.'],correctIndex:1,explanation:'will have + 过去分词 finished 是将来完成时。'});
// TENSE 6–10: continuous duration, passive forms, and modal distinctions.
unit('tense','xa-t-perfect-continuous',{
 title:'现在完成进行时：持续过程连到现在',tag:'have / has been + -ing',summary:'现在完成进行时强调从过去持续到现在或刚结束、仍与现在相关的活动过程。',analogy:'进度条从过去一直拉到现在，重点是持续投入的过程。',formula:'S:I|V:have been working|M:on this problem|M:for two hours',en:'I have been working on this problem for two hours.',zh:'我研究这个问题已经两小时了。',points:['结构是 have / has been + 动词 -ing。','for + 时长，since + 起点：for two hours / since Monday。','I have written three pages 关注完成量；I have been writing 关注过程，不必断言已经结束。'],pitfall:'know 等常见状态义通常不用完成进行时；例如 I have known her for years。',level:'进阶'},[
 {prompt:'说明你持续处理问题的时间。',zh:'我研究这个问题已经两小时了。',chunks:'S:I|V:have been working|M:on this problem|M:for two hours',explanation:'have been working 强调延续到现在的工作过程。',hint:'for two hours 表示持续时长。'},
 {prompt:'说明团队从周一起一直在测试。',zh:'我们从周一起一直在测试这个原型。',chunks:'S:We|V:have been testing|O:the prototype|M:since Monday',explanation:'since Monday 给出开始时间，完成进行时把过程连到现在。',hint:'since 后是起点。'}],
 {prompt:'哪句最明确强调延续到现在的写作过程？',options:['I write yesterday.','I had wrote for an hour.','I have been writing for an hour.'],correctIndex:2,explanation:'have been writing + for 时长 强调与现在相连的持续过程。'});
unit('tense','xa-t-perfect-continuous-anchors',{
 title:'完成进行时的锚点：过去与未来',tag:'had been / will have been + -ing',summary:'完成进行时不只连接现在，也能从过去或未来参照点回看一段持续活动。',analogy:'同一条持续进度条，终点摄像机可以放在昨天，也可以放在明天。',formula:'M:By noon,|S:we|V:will have been testing|O:the system|M:for three hours',en:'By noon, we will have been testing the system for three hours.',zh:'到中午我们就已经连续测试这个系统三小时了。',points:['had been + -ing 表示到过去某点之前持续的过程。','will have been + -ing 表示到未来某点已经持续的过程。','这类结构需要清楚的参照点和持续时长，不适合只为把句子写得复杂而使用。'],pitfall:'不要把 had been working 和 will have been working 混淆：它们的参照点不同。',level:'进阶'},[
 {prompt:'回顾会议开始前的讨论时长。',zh:'会议开始时，我们已讨论预算一小时了。',chunks:'M:When the meeting began,|S:we|V:had been discussing|O:the budget|M:for an hour',explanation:'过去会议开始是参照点，之前持续的过程用 had been discussing。',hint:'主句的过程从更早处延续到会议开始。'},
 {prompt:'预测截至中午的测试时长。',zh:'到中午我们就已经连续测试这个系统三小时了。',chunks:'M:By noon,|S:we|V:will have been testing|O:the system|M:for three hours',explanation:'未来中午是参照点，持续时长用将来完成进行时表达。',hint:'will have been 后接 testing。'}],
 {prompt:'要表达“到未来某点已持续工作三年”，选哪种结构？',options:['will have been working','had working','has been worked'],correctIndex:0,explanation:'will have been + -ing 可以从未来参照点回看持续过程。'});
unit('tense','xa-t-passive-forms',{
 title:'被动语态的时间组合：正在、已经与将来',tag:'being / been / modal passive',summary:'被动的 be + 过去分词可以嵌入进行、完成或情态结构，时间和语态分别承担不同任务。',analogy:'先把镜头对准承受者，再为镜头安装“正在、已经、将要”的时间滤镜。',formula:'S:The data|V:are being checked|M:by the team',en:'The data are being checked by the team.',zh:'团队正在检查这些数据。',points:['现在进行被动：is / are being checked；过去进行被动：was / were being checked。','现在完成被动：has / have been checked；过去完成被动：had been checked。','未来或情态被动：will be checked / can be checked / must be checked。','being 用于进行结构，been 是 be 的过去分词，用于完成结构。'],pitfall:'has being checked 错把 being 放进完成结构；应为 has been checked。',level:'进阶'},[
 {prompt:'突出数据正在接受检查。',zh:'团队正在检查这些数据。',chunks:'S:The data|V:are being checked|M:by the team',explanation:'are being checked 同时体现现在进行和被动。',hint:'正在被检查需要 being。'},
 {prompt:'突出初稿已经获得批准。',zh:'初稿已经获得导师批准。',chunks:'S:The draft|V:has been approved|M:by the supervisor',explanation:'has been approved 是现在完成时的被动结构。',hint:'已经被批准需要 been。'}],
 {prompt:'哪项正确表达“必须被检查”？',options:['must checked','must be checked','must been checking'],correctIndex:1,explanation:'情态动词 + be + 过去分词构成情态被动。'});
unit('tense','xa-t-modal-meaning',{
 title:'must、can、may：区分义务与判断',tag:'obligation / deduction / possibility',summary:'同一个情态动词可能表达义务、许可或判断；要结合语境辨认含义，尤其注意否定。',analogy:'情态旋钮既能调整行动规则，也能调整说话人对事实的把握。',formula:'S:The server|V:may be|C:unavailable',en:'The server may be unavailable.',zh:'服务器可能暂时不可用。',points:['must 可表达必须，也可表达有把握的推断；may / might 常表达不确定的可能。','can 常表达能力、许可或一般可能性；不能把它在所有场景中简单等同于 may。','must not 常表示禁止；do not have to 表示没有必要，而非禁止。','否定推断常用 cannot / can’t：That can’t be right。'],pitfall:'You do not have to attend 表示可以不参加，不等于 You must not attend。',level:'进阶'},[
 {prompt:'谨慎提出服务器问题的可能性。',zh:'服务器可能暂时不可用。',chunks:'S:The server|V:may be|C:unavailable',explanation:'may be 表达一种可能，并不保证情况已被确认。',hint:'把不确定性放进 may。'},
 {prompt:'说明同事没有参加会议的义务。',zh:'你不必参加这次会议。',chunks:'S:You|V:do not have to attend|O:the meeting',explanation:'do not have to 是“不必”，不是“禁止”。',hint:'没有必要与不得做要区分。'}],
 {prompt:'“你不必参加”最合适的表达是哪句？',options:['You must not attend.','You cannot attend.','You do not have to attend.'],correctIndex:2,explanation:'do not have to 表示没有必要，must not 通常表示禁止。'});
unit('tense','xa-t-used-to',{
 title:'used to 与 be used to：过去习惯还是已经适应',tag:'used to do / be used to doing',summary:'used to + 原形描述过去而现在通常不再如此的习惯或状态；be used to + 名词或 -ing 描述习惯了某事。',analogy:'一个结构打开旧相册，另一个结构显示当前的适应程度。',formula:'S:I|V:used to work|M:in a library',en:'I used to work in a library.',zh:'我过去在图书馆工作。',points:['used to work 表达过去的习惯或状态。','be used to working 中 to 是介词，后面用 -ing 或名词。','get used to working 强调逐渐适应的过程。','常见否定和疑问形式：did not use to / Did you use to ...?。'],pitfall:'I am used to work here 混淆两种结构；表达习惯在这里工作通常用 working。',level:'进阶'},[
 {prompt:'介绍以前的一段工作经历。',zh:'我过去在图书馆工作。',chunks:'S:I|V:used to work|M:in a library',explanation:'used to + work 描述过去而现在通常不同的情况。',hint:'这里 to 后面是动词原形。'},
 {prompt:'说明你已习惯远程工作。',zh:'我习惯远程工作。',chunks:'S:I|V:am|C:used to working remotely',explanation:'be used to 中 to 是介词，因此用 working。',hint:'“已经习惯”由 am used to 表达。'}],
 {prompt:'哪句正确表达“我习惯早起”？',options:['I am used to getting up early.','I am used to get up early.','I used to getting up early.'],correctIndex:0,explanation:'be used to + -ing 表示习惯某事；used to + 原形表示过去习惯。'});
// Local writing checks validate only the stated structural targets, not full grammar or meaning.
const ck=(label,re)=>({label,pattern:re.source,flags:'i'});
function task(world,lessonId,id,title,prompt,requirements,hint,reference,referenceZh,checks){
 writing({id,world,lessonId,title,prompt,requirements:['至少写 6 个空格分隔词；完成后自行核对意思和语法。',...requirements],hint,reference,referenceZh,checks:[ck('至少 6 个空格分隔词',/^\S+(?:\s+\S+){5,}$/),...checks]});
}
task('parts','xa-p-count','xa-p-w1','把建议按条计数','向同事说明面试前需要几条建议。',['使用 a piece of advice、two pieces of advice 或 three pieces of advice。','补充获得建议的场景或时间。'],'We need ... before ...；advice 不直接变成 advices。','We need two pieces of advice before the interview.','面试前我们需要两条建议。',[
 ck('包含正确的 advice 计量短语',/\b(?:a piece|two pieces|three pieces) of advice\b/)
]);
task('parts','xa-p-quantity','xa-p-w2','有几个问题要确认','说明你或团队对安排还有几个问题。',['用 a few questions 表达有几个问题。','用 about 指出问题涉及的事项。'],'I have / We have a few questions about ...。','We have a few questions about the new schedule.','我们对新的安排有几个问题。',[
 ck('包含 a few questions',/\ba few questions\b/),ck('指出问题涉及事项',/\bquestions\s+about\s+\S+/)
]);
task('parts','xa-p-indefinite','xa-p-w3','介绍经验丰富的新成员','用一句话介绍团队里一位有经验的专业人员。',['使用 an experienced + 职业名称。','职业可选择 engineer、designer、analyst、researcher 或 developer。'],'experienced 以元音音素开头，前面使用 an。','She is an experienced designer on our team.','她是我们团队里一位经验丰富的设计师。',[
 ck('包含 an experienced + 支持的职业',/\ban experienced (?:engineer|designer|analyst|researcher|developer)\b/)
]);
task('parts','xa-p-pronoun-case','xa-p-w4','团队在工作坊自我介绍','描述团队在一次活动中做自我介绍。',['使用 We introduced ourselves。','补充活动、地点或时间。'],'ourselves 指回主语 We；不要写 We introduced us。','We introduced ourselves at the start of the workshop.','我们在工作坊开始时做了自我介绍。',[
 ck('主语与反身代词对应',/\bWe introduced ourselves\b/)
]);
task('parts','xa-p-possessive','xa-p-w5','说明我们的东西在哪里','告诉同事属于团队的一份文件或物品的位置。',['用 our report / our notes / our equipment / our prototype 之一作主语。','用 is 或 are，并加地点短语。'],'Our notes are ...；Our report is ...；自行检查单复数。','Our notes are on the shared drive now.','我们的笔记现在在共享网盘上。',[
 ck('以支持的 our 名词短语开头',/^Our (?:report|notes|equipment|prototype)\b/),ck('包含 be + 地点介词',/\b(?:is|are)\s+(?:on|in|at|under|near)\s+\S+/)
]);
task('parts','xa-p-agreement-head','xa-p-w6','长主语也保持一致','报告一份包含多项变化的清单状态。',['用 The list of changes 作主语。','使用 is，并说明 ready、available 或 complete 之一，再补充场景。'],'不要被 changes 的复数形式带偏，中心词是 list。','The list of changes is ready for review.','更改清单已准备好供审阅。',[
 ck('长主语与单数 be 对应',/^The list of changes is\b/),ck('包含支持的状态词',/\bis\s+(?:ready|available|complete)\b/)
]);
// SENTENCE writing: communicate constraints, questions, and focused updates.
task('sentence','xa-s-negative','xa-s-w1','说明你尚未理解的地方','向同事具体说明你不理解哪一项要求。',['用 I do not understand 开头。','写出具体对象，可补充 yet 或说明场景。'],'do not 后使用 understand 原形；把需要澄清的对象写清楚。','I do not understand the second requirement yet.','我还不理解第二项要求。',[
 ck('以否定谓语 I do not understand 开头',/^I do not understand\s+\S+/)
]);
task('sentence','xa-s-wh','xa-s-w2','追问解决问题的方式','用 How did ...? 向同事询问一个过去问题的解决办法。',['使用 How did you / they / we + 动词原形。','用问号结尾；检查 did 后没有重复加过去式。'],'How did you solve ...? / How did they handle ...?。','How did you solve the problem so quickly?','你是怎么这么快解决这个问题的？',[
 ck('包含支持的 How did 问句骨架',/^How did (?:you|they|we) (?:solve|handle|fix|complete|improve)\b/),ck('以问号结尾',/\?$/)
]);
task('sentence','xa-s-there','xa-s-w3','介绍下一步的可选事项','用存在句介绍下一阶段有哪些选项或任务。',['以 There are two / three / four / five 开头。','使用 options、tasks、problems 或 questions，并补充相关场景。'],'There are three options for ...；注意 are 后是复数。','There are three options for the next stage.','下一阶段有三个选项。',[
 ck('there are + 数量 + 支持的复数名词',/^There are (?:two|three|four|five) (?:options|tasks|problems|questions)\b/)
]);
task('sentence','xa-s-indirect-question','xa-s-w4','礼貌确认会议时间','用嵌入问句礼貌询问会议何时开始或结束。',['以 Could you tell me when 开头。','内部写 the / our / your meeting starts / begins / ends，使用陈述语序。','整个请求用问号结尾。'],'Could you tell me when the meeting starts?；内部不能写 when does the meeting start。','Could you tell me when the meeting starts?','你能告诉我会议什么时候开始吗？',[
 ck('内部使用 meeting + 支持的谓语形式',/^Could you tell me when (?:the|our|your) meeting (?:starts|begins|ends)\b/),ck('以问号结尾',/\?$/)
]);
task('sentence','xa-s-focus','xa-s-w5','突出终于理解的时刻','用部分倒装强调直到某时才理解或意识到什么。',['以 Only then did I / we / they 开头。','随后使用 understand、realize、notice 或 recognize 原形并补充具体内容。'],'Only then did I understand ...；did 已表示过去，后面不要写 understood。','Only then did I understand the main issue.','直到那时我才理解核心问题。',[
 ck('部分倒装与动词原形目标',/^Only then did (?:I|we|they) (?:understand|realize|notice|recognize)\b/)
]);
task('sentence','xa-s-coordinate','xa-s-w6','一个主语报告两个动作','报告你已完成的两个相关工作动作。',['用 I 开头，第一个动作选 reviewed / checked / read。','用 and 接第二个过去式动作 updated / revised / sent / drafted。','两个动作都要有清楚的对象。'],'I reviewed ... and updated ...；and 后可省略重复的 I。','I reviewed the proposal and updated the project schedule.','我审阅了提案，并更新了项目日程。',[
 ck('共享主语的两个目标动作',/^I (?:reviewed|checked|read)\s+.+\s+and\s+(?:updated|revised|sent|drafted)\s+\S+/)
]);
// TENSE writing: make reference points and duration explicit.
task('tense','xa-t-past-perfect','xa-t-w1','回顾某节点之前已完成的工作','说明在一次过去的会议开始前，你们已经完成了什么。',['用 had completed / finished / submitted / checked / reviewed。','用 before 补充一个过去参照情境，并检查两个动作的先后关系。'],'We had completed ... before the meeting began。','We had completed the review before the meeting began.','会议开始前，我们已经完成了审阅。',[
 ck('包含过去完成时目标',/\bhad (?:completed|finished|submitted|checked|reviewed)\b/),ck('包含 before 参照信息',/\bbefore\s+\S+/)
]);
task('tense','xa-t-future-perfect','xa-t-w2','站在截止日回看交付','预测截至某个未来节点已经完成的成果。',['使用 will have finished / completed / submitted。','使用 by 给出未来完成节点；自行检查该时间确实在未来。'],'We will have finished ... by Friday。','We will have finished the report by Friday.','到周五我们就已经完成报告了。',[
 ck('包含将来完成时目标',/\bwill have (?:finished|completed|submitted)\b/),ck('包含 by 时间提示',/\bby\s+\S+/)
]);
task('tense','xa-t-perfect-continuous','xa-t-w3','说明持续到现在的投入','介绍你或团队持续开展的学习、开发或测试活动。',['使用 have / has been working / testing / developing / studying。','用 for 或 since 引出持续时长或起点，自己检查两者搭配。'],'for two days 表示时长；since Monday 表示起点。','I have been working on this prototype since Monday.','我从周一起一直在制作这个原型。',[
 ck('包含现在完成进行时目标',/\b(?:have|has) been (?:working|testing|developing|studying)\b/),ck('包含时长或起点提示',/\b(?:for|since)\s+\S+/)
]);
task('tense','xa-t-perfect-continuous-anchors','xa-t-w4','预测届时累计持续多久','站在未来的一个节点，说明到那时某项活动将已持续多久。',['用 By 引出未来参照点。','用 will have been working / studying / testing / developing。','用 for 补充持续时长。'],'By June, I will have been working here for three years。','By June, I will have been working here for three years.','到六月我就在这里连续工作三年了。',[
 ck('以 By 参照点开头',/^By\s+\S+/),ck('包含将来完成进行时目标',/\bwill have been (?:working|studying|testing|developing)\b/),ck('包含 for 时长提示',/\bfor\s+\S+/)
]);
task('tense','xa-t-passive-forms','xa-t-w5','以交付物为主角报告状态','让报告、初稿或方案作主语，说明它已经由谁审阅或批准。',['用 has / have been approved / reviewed / checked / updated。','用 by 写出执行者。','自行检查单复数及过去分词形式。'],'The report has been approved by ...。','The report has been approved by the project manager.','报告已经由项目经理批准。',[
 ck('包含现在完成被动目标',/\b(?:has|have) been (?:approved|reviewed|checked|updated)\b/),ck('用 by 补充执行者',/\bby\s+\S+/)
]);
task('tense','xa-t-used-to','xa-t-w6','说明你现在已适应什么','介绍一种你已经习惯的工作或学习方式。',['以 I am used to 开头。','随后使用 working / studying / speaking / handling / reading 之一并补充内容。','不要把本题写成过去习惯 used to + 原形。'],'I am used to working ...；这里 to 是介词。','I am used to working with international teams now.','我现在已经习惯与国际团队合作。',[
 ck('包含 be used to + 支持的 -ing 形式',/^I am used to (?:working|studying|speaking|handling|reading)\b/)
]);
