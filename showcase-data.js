(() => {
  'use strict';
  const categories=[{id:'daily',title:'日常生活'},{id:'work',title:'工作协作'},{id:'academic',title:'学术研究'},{id:'polite',title:'礼貌沟通'},{id:'ideas',title:'观点表达'},{id:'growth',title:'成长学习'}];
  const items=[];
  const words=`
mindful|adjective|留心的；有意识的|daily|be mindful of|Be mindful of how much time you spend online.|留意自己花在网上的时间。
cozy|adjective|舒适温暖的|daily|a cozy corner|I found a cozy corner to read in.|我找到一个舒适的角落看书。
nourishing|adjective|有营养的；滋养身心的|daily|a nourishing meal|A nourishing meal helps me feel ready for the day.|营养丰富的一餐让我准备好迎接一天。
unwind|verb|放松下来|daily|unwind after work|I unwind by taking a short walk after work.|下班后我散一小会儿步来放松。
cherish|verb|珍惜；珍爱|daily|cherish a memory|I cherish the time we spend together.|我珍惜我们共度的时光。
serene|adjective|宁静的；平和的|daily|a serene setting|The lake looked serene in the early morning.|清晨的湖面显得十分宁静。
spontaneous|adjective|自发的；未事先安排的|daily|a spontaneous decision|A spontaneous trip made our weekend memorable.|一次说走就走的旅行让周末难忘。
convenient|adjective|便利的；方便的|daily|a convenient location|The library is in a convenient location.|图书馆的位置很方便。
clarify|verb|澄清；说清楚|work|clarify the requirements|Could we clarify the requirements before we start?|开始前我们能先明确需求吗？
coordinate|verb|协调；统筹|work|coordinate with the team|I will coordinate with the team to confirm the date.|我会与团队协调，确认日期。
efficient|adjective|高效的|work|an efficient process|This process is more efficient than our old one.|这套流程比原来的更高效。
prioritize|verb|按重要性排序；优先处理|work|prioritize urgent tasks|We need to prioritize the tasks that affect users most.|我们需要优先处理对用户影响最大的任务。
reliable|adjective|可靠的；可信赖的|work|a reliable colleague|She is a reliable colleague who keeps her promises.|她是个守信可靠的同事。
concise|adjective|简洁的；简明的|work|a concise summary|Please write a concise summary of the discussion.|请简要总结讨论内容。
proactive|adjective|积极主动的；预先采取行动的|work|a proactive approach|A proactive approach helps us spot problems early.|主动采取措施有助于及早发现问题。
accountable|adjective|负有责任的；需作说明的|work|be accountable for|Each member is accountable for a specific part of the project.|每位成员都负责项目的一个具体部分。
evidence|noun|证据；依据|academic|provide evidence for|We need more evidence before drawing a conclusion.|得出结论之前，我们需要更多证据。
hypothesis|noun|假设；假说|academic|test a hypothesis|The experiment was designed to test our hypothesis.|这项实验旨在检验我们的假设。
rigorous|adjective|严谨的；缜密的|academic|a rigorous evaluation|A rigorous evaluation should include several baselines.|严谨的评估应包含多个基线。
robust|adjective|稳健的；耐受变化的|academic|robust across settings|The result remains robust across several settings.|这个结果在多种设置下仍然稳健。
plausible|adjective|看似合理的；可能成立的|academic|a plausible explanation|This is a plausible explanation, but it needs testing.|这是一个合理的解释，但仍需检验。
replicate|verb|重复实施；复现实验|academic|replicate an experiment|We tried to replicate the experiment using the published settings.|我们尝试按照公布的设置复现实验。
assess|verb|评估；评价|academic|assess the impact|We assess the impact on both accuracy and latency.|我们评估它对准确率和延迟的影响。
implication|noun|可能的影响；含义|academic|practical implications|The finding has practical implications for system design.|这项发现对系统设计有实际意义。
appreciate|verb|感激；欣赏；意识到|polite|appreciate your help|I really appreciate your help with the presentation.|我非常感谢你对这次展示的帮助。
considerate|adjective|体贴的；为他人着想的|polite|considerate of others|It was considerate of you to check with everyone first.|你先征询大家的意见，很体贴。
thoughtful|adjective|体贴的；经过认真思考的|polite|a thoughtful suggestion|Thank you for your thoughtful suggestion.|谢谢你认真提出的建议。
gracious|adjective|和善的；有礼貌的|polite|a gracious response|She gave a gracious response to the unexpected question.|她礼貌地回应了这个意外的问题。
sincere|adjective|真诚的；诚挚的|polite|a sincere apology|Please accept my sincere apology for the delay.|请接受我对延误的诚挚歉意。
respect|verb|尊重；重视|polite|respect a decision|I respect your decision, even though I see things differently.|虽然看法不同，我仍尊重你的决定。
acknowledge|verb|承认；确认收到；表示感谢|polite|acknowledge a contribution|We should acknowledge everyone's contribution.|我们应认可每个人的贡献。
courteous|adjective|彬彬有礼的|polite|a courteous reply|A courteous reply can keep a difficult conversation constructive.|礼貌的回复能让困难的对话保持建设性。
perspective|noun|视角；观点|ideas|from another perspective|Looking at the issue from another perspective may help.|换个角度看这个问题可能有帮助。
nuance|noun|细微差别；微妙之处|ideas|capture the nuance|The translation does not capture every nuance of the original.|这份译文未能体现原文所有细微之处。
insight|noun|深刻认识；洞见|ideas|gain insight into|The interviews gave us insight into users' needs.|访谈让我们更深入地了解用户需求。
compelling|adjective|令人信服的；引人入胜的|ideas|a compelling argument|She made a compelling argument for a smaller pilot study.|她为开展更小规模的先导研究提出了有力论据。
coherent|adjective|连贯的；有条理的|ideas|a coherent explanation|The report needs a more coherent explanation of the results.|报告需要更有条理地解释结果。
subtle|adjective|细微的；不易察觉的|ideas|a subtle difference|There is a subtle difference between the two expressions.|这两个表达之间有细微差别。
deliberate|adjective|有意的；深思熟虑的|ideas|a deliberate choice|Keeping the first version simple was a deliberate choice.|保持首版简洁是经过考虑的选择。
balanced|adjective|平衡的；兼顾各方的|ideas|a balanced view|We need a balanced view of the benefits and limitations.|我们需要兼顾收益和局限。
resilience|noun|恢复力；韧性|growth|build resilience|Learning from setbacks can help us build resilience.|从挫折中学习有助于培养韧性。
consistent|adjective|始终如一的；持续稳定的|growth|consistent practice|Consistent practice matters more than occasional bursts of effort.|持续练习比偶尔突击更重要。
curiosity|noun|好奇心；求知欲|growth|intellectual curiosity|Curiosity encourages me to ask better questions.|好奇心促使我提出更好的问题。
adaptable|adjective|能适应变化的|growth|an adaptable approach|An adaptable approach makes it easier to respond to change.|灵活的方法更便于应对变化。
persevere|verb|坚持不懈|growth|persevere through difficulties|We persevered through several unsuccessful attempts.|经历几次失败的尝试后，我们仍坚持了下来。
reflect|verb|反思；反映|growth|reflect on an experience|Take a moment to reflect on what you learned today.|花一点时间回顾今天所学。
initiative|noun|主动性；倡议|growth|take the initiative|She took the initiative to improve the onboarding guide.|她主动改进了入职指南。
sustainable|adjective|可持续的；能长期维持的|growth|a sustainable habit|Choose a study routine that is sustainable for you.|选择一种你能长期坚持的学习安排。
`;
  for(const row of words.trim().split('\n')) {const [text,pos,zh,category,usage,en,exampleZh]=row.split('|');items.push({id:'lib-word-'+text,type:'word',text,pos,zh,category,usage,en,exampleZh});}
  const phrases=`
make the most of|充分利用|daily|常接时间、机会或资源。|Let's make the most of this quiet afternoon.|让我们好好利用这个宁静的下午。
take a breather|稍作休息|daily|适合日常口语；比 take a break 更轻松。|Let's take a breather before we continue.|我们先休息一下再继续。
at your own pace|按自己的节奏|daily|用于学习、适应或完成过程。|You can work through the lessons at your own pace.|你可以按自己的节奏学习这些课程。
on the bright side|往好处看|daily|用于提出困难中的积极方面。|On the bright side, we now have more time to prepare.|往好处看，我们现在有更多时间准备了。
every now and then|偶尔；时不时|daily|频率表达，可放在句首或句末。|I try a new recipe every now and then.|我偶尔会尝试一道新食谱。
feel at home|感到自在；像在家一样|daily|也可描述在新环境中的舒适感。|The friendly staff made me feel at home.|友好的工作人员让我感到很自在。
keep someone in the loop|让某人了解最新情况|work|把 someone 换成 me、us 或具体人名。|Please keep me in the loop as the plan develops.|计划推进时，请随时让我了解进展。
on the same page|对情况有一致理解|work|常用 make sure we are on the same page。|Let's make sure we're on the same page before we start.|开始前，先确认我们理解一致。
follow up on|跟进|work|on 后接待处理事项或先前沟通。|I'm following up on our discussion about the timeline.|我来跟进我们关于时间安排的讨论。
take ownership of|主动承担并负责|work|强调责任，不表示法律意义的所有权。|I'll take ownership of the testing plan.|我会负责并推进测试计划。
work around|设法绕过或应对限制|work|宾语通常是问题或限制；不等同于彻底解决。|We found a way to work around the current limitation.|我们找到了一种应对当前限制的方法。
set realistic expectations|设定合理预期|work|常用于范围、时间和交付安排。|A small pilot can help us set realistic expectations.|小规模试点能帮助我们建立合理预期。
in light of|鉴于；考虑到|academic|介词短语，后接名词性成分。|In light of the new evidence, we revised our explanation.|鉴于新证据，我们修改了解释。
account for|解释；占据一定比例|academic|根据上下文区分“解释”和“占比”。|The added features may account for the improvement.|新增特征可能解释了这项提升。
be consistent with|与……一致|academic|表示相容，不自动证明因果或完全相同。|The result is consistent with our initial prediction.|这个结果与我们最初的预测一致。
under these conditions|在这些条件下|academic|明确结论的适用范围。|The approach performed well under these conditions.|在这些条件下，该方法表现良好。
to the best of our knowledge|据我们所知|academic|用于限定知识范围，仍需认真查证。|To the best of our knowledge, this setting has not been studied systematically.|据我们所知，这种设置尚未得到系统研究。
subject to|受……限制；以……为条件|academic|后接约束或条件，不是完整的被动句。|The conclusion is subject to the limitations of the sample.|该结论受样本局限的约束。
if it's convenient for you|如果你方便的话|polite|用于安排请求，给对方留出选择空间。|Could we speak tomorrow, if it's convenient for you?|如果你方便，我们明天能聊一下吗？
I was wondering if|我想请问是否……|polite|后面的问句采用陈述语序。|I was wondering if you could review this paragraph.|我想请问你能否看看这一段。
thank you for taking the time|感谢你抽出时间|polite|可接 to do 或 for doing，完成具体感谢。|Thank you for taking the time to explain the process.|感谢你抽空解释流程。
no worries at all|完全没关系|polite|适合较轻松的交流；正式致歉场景需视语境。|No worries at all; we can find another time.|完全没关系，我们可以另约时间。
please let me know|请告诉我|polite|后接 if、whether 或需要告知的内容。|Please let me know if anything is unclear.|如有不清楚的地方，请告诉我。
I appreciate your understanding|感谢你的理解|polite|常用于解释变更或不便，不能代替必要说明。|I appreciate your understanding while we resolve the issue.|问题处理期间，感谢你的理解。
from my perspective|在我看来|ideas|把观点明确限定为自己的视角。|From my perspective, clarity should come before complexity.|在我看来，应先把事情说清楚，再考虑复杂性。
that being said|话虽如此|ideas|用于对前述观点补充限制或另一面。|The first results are promising. That being said, more testing is needed.|初步结果令人期待，但仍需更多测试。
a case in point|一个恰当的例子|ideas|用于连接论点与具体实例。|The onboarding guide is a case in point.|入职指南就是一个恰当的例子。
strike a balance between|在……之间取得平衡|ideas|通常搭配两个平行的名词或动名词成分。|We need to strike a balance between speed and reliability.|我们需要在速度与可靠性之间取得平衡。
put it another way|换个说法|ideas|可用 let me put it another way 引出重述。|Let me put it another way: the feature saves time, but adds cost.|换句话说，这个功能节省时间，但增加成本。
there is room for|仍有……的空间|ideas|用于改进、讨论或变化等抽象名词。|There is room for improvement in the explanation.|这份解释还有改进空间。
step by step|一步一步地|growth|强调过程，可用于句首或句末。|We can build the habit step by step.|我们可以逐步养成这个习惯。
learn by doing|在实践中学习|growth|by 后用 doing，而不是 do。|I learn by doing small projects.|我通过做小项目来学习。
get the hang of|逐渐掌握……的窍门|growth|偏口语，常用于新技能。|It took me a while to get the hang of the tool.|我花了一些时间才掌握这个工具的用法。
build on|以……为基础继续发展|growth|后接已有知识、成果或工作。|This lesson builds on what we practised yesterday.|这节课建立在昨天练习的内容之上。
turn feedback into action|把反馈落实为行动|growth|可以补充具体改进事项，让表达可执行。|I try to turn feedback into action after each review.|每次评审后，我都会努力把反馈落实为行动。
keep an open mind|保持开放的心态|growth|不表示放弃判断，仍可核实理由和证据。|Keep an open mind when you hear a different explanation.|听到不同解释时，保持开放心态。
`;
  phrases.trim().split('\n').forEach((row,i)=>{const [text,zh,category,usage,en,exampleZh]=row.split('|');items.push({id:'lib-phrase-'+(i+1),type:'phrase',text,zh,category,usage,en,exampleZh});});
  const sentences=`
A little preparation makes the rest of the day easier.|提前做一点准备，会让这一天接下来的安排更轻松。|daily|主语 + make + 宾语 + 形容词|表达某件事带来的实际影响。
I'd rather take a short walk than spend the whole evening online.|比起整晚待在网上，我更愿意散一小会儿步。|daily|would rather do A than do B|rather 后与 than 后都用动词原形。
What I enjoy most about this place is how peaceful it feels.|这个地方最让我喜欢的是它带来的平静感。|daily|What 从句作主语 + be + 表语从句|把真正喜欢的特点放在句末。
There is no need to rush; we still have time.|不用着急，我们还有时间。|daily|There is no need to do|用分号连接两个关系紧密的完整分句。
The more regularly I cook, the more confident I feel.|越经常做饭，我就越有信心。|daily|The + 比较级，the + 比较级|表达两种变化之间的联系。
It's the small routines that make a new place feel familiar.|正是那些小习惯，让陌生的地方慢慢熟悉起来。|daily|It is ... that ... 强调结构|强调真正产生作用的因素。
If the weather holds, we could spend the afternoon outside.|如果天气保持这样，我们下午可以在外面待一会儿。|daily|If + 条件，主句含 could|could 提出一种可以考虑的选择。
I didn't realize how tired I was until I finally slowed down.|直到终于慢下来，我才意识到自己有多累。|daily|not ... until ...|realize 后的 how 从句用陈述语序。
Could we agree on the priorities before discussing the details?|讨论细节之前，我们能先就优先事项达成一致吗？|work|Could we ... before doing ...?|礼貌地建议调整讨论顺序。
I'll send a short summary so that everyone knows what to do next.|我会发一份简短总结，让大家知道下一步该做什么。|work|主句 + so that + 目的从句|what to do next 表示下一步行动。
The goal is to make the process easier to follow, not just faster.|目标是让流程更容易理解和执行，而不仅仅是更快。|work|The goal is to ...|比较并明确工作目标，不只追求单一指标。
If anything changes, I'll keep you updated.|如果情况有变，我会及时告诉你。|work|If + 一般现在时，主句 will|keep + 宾语 + updated 表示持续告知。
We can start with a small pilot and expand once it works reliably.|我们可以先小规模试点，稳定运行后再扩展。|work|并列动作 + once 从句|once 在这里表示一旦，后面不用 will 表未来。
I'd like to clarify who is responsible for each part of the project.|我想明确项目每个部分分别由谁负责。|work|I'd like to + 动词 + 宾语从句|who 在宾语从句中作主语，不额外倒装。
This approach saves time, but it also introduces a new dependency.|这种方式节省时间，但也引入了新的依赖。|work|主句 + but + 并列分句|同时交代收益与代价。
Let's review what went well and what we can improve.|我们来回顾一下做得好的地方，以及还能改进什么。|work|Let's + 动词原形 + 并列宾语从句|两部分保持平行的语法结构。
The results suggest that the additional context may improve accuracy.|结果提示，额外上下文可能提高准确率。|academic|suggest that + 含 may 的从句|把结果与谨慎的推测连接起来。
This finding should be interpreted in light of the sample size.|这项发现应结合样本规模来理解。|academic|should be + 过去分词|限定结论的解释背景。
We report both the improvement in quality and the increase in cost.|我们同时报告质量提升和成本增加。|academic|both A and B|用平行名词短语完整报告取舍。
Although the trend is consistent, the mechanism remains unclear.|虽然趋势一致，但其机制仍不明确。|academic|Although 从句 + 主句|although 不与同一层的 but 重复使用。
The experiment was repeated to assess whether the result was stable.|我们重复了实验，以评估结果是否稳定。|academic|被动主句 + to do + whether 从句|说明重复实验的目的。
One possible explanation is that the examples provide a stronger signal.|一种可能的解释是，这些例子提供了更强的信号。|academic|One possible explanation is that ...|把候选解释与已确认事实区分开。
Further analysis is needed before a broader conclusion can be drawn.|得出更广泛的结论之前，还需要进一步分析。|academic|主句 + before + 被动从句|清楚表达证据尚未支持的范围。
Compared with the baseline, the method used fewer retrieval calls in this test.|在这次测试中，相比基线，该方法使用了更少的检索调用。|academic|Compared with ... + 主句|明确比较对象和测试范围。
Would you mind giving me a moment to check the details?|你介意给我一点时间核对细节吗？|polite|Would you mind doing ...?|mind 后接动名词，不接 to do。
Thank you for pointing that out; I'll correct it in the next version.|谢谢你指出这一点，我会在下一版更正。|polite|Thank you for doing + 后续行动|感谢后给出具体的回应。
I understand your concern, and I'd like to explain how we reached this decision.|我理解你的顾虑，也想解释我们是如何作出这个决定的。|polite|承认关切 + 礼貌说明|how 从句采用陈述语序。
I'm sorry for the confusion caused by my earlier message.|很抱歉，我之前的消息造成了困惑。|polite|be sorry for + 名词短语|caused by ... 后置修饰 confusion。
If now isn't a good time, I'm happy to find another slot.|如果现在不方便，我愿意另约时间。|polite|条件从句 + 可协商的提议|给对方一个具体的替代选择。
Could you let me know which option would work best for you?|你能告诉我哪个选项最适合你吗？|polite|Could you let me know + 宾语从句?|which option 作从句主语，不需改变语序。
I may be missing something, but could we check the assumption once more?|也许是我有所遗漏，不过我们能再核对一次这个假设吗？|polite|谨慎开场 + 具体请求|避免把个人不确定性包装成对他人的指责。
I appreciate the explanation, even though I still have a few questions.|虽然我还有几个问题，但很感谢你的解释。|polite|主句 + even though 从句|可以同时表达感谢与尚存的疑问。
What matters most is whether the solution addresses the actual problem.|最重要的是，方案是否解决了实际问题。|ideas|What 从句 + be + whether 从句|把讨论焦点放回判断标准。
There are good reasons for both options, so the choice depends on our priorities.|两个选项都有合理之处，因此选择取决于我们的优先事项。|ideas|原因 + so + 结论|用 depends on 表达条件性的判断。
I agree with the goal, but I'm not convinced that this is the best way to reach it.|我认同目标，但还不确定这是否是实现目标的最佳方式。|ideas|认同目标 + 保留方法上的判断|be convinced that 后接具体观点。
The issue is not simply whether we can do it, but whether we should.|问题不仅在于能不能做，还在于应不应该做。|ideas|not simply whether ... but whether ...|用平行的 whether 从句表达判断维度。
For example, a simpler explanation may help more people use the tool correctly.|例如，更简单的解释可能帮助更多人正确使用工具。|ideas|For example + 具体例子|用例子支持观点，避免只重复抽象结论。
The distinction becomes clearer when we compare the two cases side by side.|把两个案例并排比较时，区别会更清楚。|ideas|主句 + when 从句|side by side 表示并列、并排比较。
It depends on what we mean by success in this context.|这取决于在这个语境下，我们如何定义成功。|ideas|depend on + what 从句|介词后可以接名词性从句。
A useful starting point is to ask which trade-offs we are willing to accept.|一个有用的起点是询问：我们愿意接受哪些取舍。|ideas|A useful starting point is to ...|把抽象讨论变成可回答的问题。
Progress becomes easier to notice when I compare myself with where I started.|回顾自己的起点时，我更容易看到进步。|growth|主句 + when 从句|compare ... with ... 建立具体比较。
Instead of waiting for confidence, I practise until the task feels more familiar.|我不再等待自信出现，而是持续练习，让任务变得更熟悉。|growth|Instead of doing ... + 主句|instead of 后接名词或动名词。
Each mistake gives me a clearer idea of what to practise next.|每次错误都让我更清楚下一步该练什么。|growth|give + 宾语 + 宾语|what to practise next 表示下一步练习内容。
The habit only needs to be small enough that I can repeat it consistently.|习惯只需足够小，让我能持续重复。|growth|small enough that ...|强调适合自己的可持续规模。
I'm learning to ask for feedback before small problems become harder to fix.|我正在学习早点寻求反馈，避免小问题变得更难解决。|growth|learn to do + before 从句|harder to fix 描述问题修复难度的变化。
Even when a plan fails, I can still learn which assumption needs to change.|即使计划失败，我仍能看出哪个假设需要调整。|growth|Even when ... + 主句|把失败与可学习的信息联系起来。
What I can sustain for a month is more useful than what I can only manage for a day.|能坚持一个月的安排，比只能做到一天的安排更有用。|growth|What 从句 + 比较级 + than + what 从句|用两个平行从句比较可持续性。
I don't need to understand everything at once to take the next useful step.|不必一次弄懂一切，我也能迈出下一步有用的行动。|growth|not need to do ... to do ...|说明行动所需的合理条件。
`;
  sentences.trim().split('\n').forEach((row,i)=>{const [text,zh,category,pattern,usage]=row.split('|');items.push({id:'lib-sentence-'+(i+1),type:'sentence',text,zh,category,pattern,usage,en:text,exampleZh:zh});});
  window.EXPRESSION_LIBRARY={categories,items};
})();
