# 句子玩家 · Sentence Quest

一个纯前端英语互动学习站，适合已有一定基础、希望提高造句和表达能力的学习者。结合知识地图、系统讲解、句子拼装和自主造句，场景涵盖日常交流、工作与学术表达。

**在线学习：[句子玩家 · Sentence Quest](https://wewcc.github.io/sentence-quest/)**

源码仓库：[wewCc/sentence-quest](https://github.com/wewCc/sentence-quest)。已使用 `main` 分支根目录发布 GitHub Pages，后续提交到该分支会自动重新部署。

使用原生 HTML、CSS、JavaScript，没有 npm 依赖、账号服务或后端。网站运行和发布不需要构建；内容维护时可用自带 Node 脚本合并课程。页面采用相对资源路径和 hash 路由，可部署到 GitHub Pages 的仓库子路径。

## 当前功能

当前收录 **122 个知识点、180 道拼装题、124 道知识测验、64 道自主造句**，合计 **368 个练习任务**。每个知识点都有配套任务。

- 十个知识世界：词性、句型、时态、修饰、从句、表达、词汇、发音、听读、篇章写作。
- 中文讲解、结构色块、双语例句、易错点和例句朗读。
- 句子拼装：点击词块排列、撤回、提示、预设答案检查和错题复习。
- 知识测验：语法辨析、词义、发音知识和听读写方法选择题，附逐题解释。
- 自主造句：场景任务、本地目标特征检查、参考表达和自查确认。
- 学习记录：本机保存、草稿自动保存、经验值、JSON 导入和导出。
- 适配桌面与手机，支持键盘操作及减少动态效果偏好。
- 课程和练习均支持搜索、世界筛选、难度筛选和分页。
- 好词好句：48 个词、36 个短语、48 个原创好句，附双语语境、搭配或句型；支持六类场景筛选、搜索、收藏、复制和设备朗读。
- 单词检索：内置中文精选与在线英英释义，按词性展示；支持生词收藏、最近查询、超时回退和会话缓存。

课程覆盖常用词法、句法与听说读写的学习框架，完整目录见 [CURRICULUM.md](CURRICULUM.md)。它不是收录全部词汇和语言现象的百科，也不是完整等级教材。发音与听读相关测验检查知识和方法，不代替真实音频训练、口头练习或发音评测。已读、任务完成与 XP 代表学习活动记录，不代表经过评测的掌握程度。

## 本地运行

在项目目录打开 PowerShell：

```powershell
py -m http.server 8010
```

然后访问 [http://localhost:8010](http://localhost:8010)。按 `Ctrl+C` 停止服务。Python 只用于提供本地静态预览，线上不需要 Python。

也可使用你已有的任意静态 HTTP 服务器。不建议用 `file://` 预览，以免本地存储和浏览器安全策略产生差异。

## 发布到 GitHub Pages

1. 在 GitHub 新建仓库，将项目文件上传至仓库根目录，包括空文件 `.nojekyll`。
2. 确保 `index.html` 位于发布目录的最顶层。
3. 进入仓库的 **Settings → Pages**。
4. 在 **Build and deployment** 下，选择 **Deploy from a branch**，分支选择 `main`，目录选择 `/(root)`，保存。若默认分支不是 `main`，选择实际存放文件的分支。
5. 等待 GitHub 发布完成，在 Pages 设置中点击 **Visit site**。项目站点通常位于 `https://你的用户名.github.io/仓库名/`。

本项目无需执行构建命令。所有页面都在 `index.html` 中通过 hash 路由切换，刷新知识图鉴或练习页面不会请求额外服务器路由。免费 GitHub 账户使用公开仓库即可；其他仓库可用性以账户和组织设置为准。

实际运行只需 `index.html`、`styles.css`、`data.js`、`showcase-data.js`、`dictionary.js`、`extras.js`、`app.js` 和 `.nojekyll`。也可使用 `sentence-quest-pages.zip` 中的文件部署；`.qa/` 是本地验收材料，不需要上传。

官方说明：[Creating a GitHub Pages site](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site)。

## 单词检索与数据来源

当前先请求 [Datamuse](https://www.datamuse.com/api/) 的精确拼写条目，失败时尝试 [Free Dictionary API](https://dictionaryapi.dev/)。Datamuse 的释义来自 WordNet / Wiktionary，查询结果可能包含相近拼写，本站只采用匹配查询词的条目。在线内容是英英释义；内置精选词条另外提供中文、搭配和原创双语例句，不声称覆盖完整英汉词典。备用接口返回的条目许可和来源会在结果中显示。

目前无需账号或密钥。Datamuse 公告 2027 年初将要求 API key；本站保守地从 **2027-01-01 UTC** 停止匿名请求该服务，继续尝试备用接口并保留内置内容。开发者需届时确认服务政策，不能将私密 API key 放入前端。实测可用性和接口限制见 [API_NOTES.md](API_NOTES.md)。

每个接口最多等待 5.5 秒；成功结果在当前页面内缓存 30 分钟、最多 50 条。页面刷新后在线缓存清空。最近 20 次查询、生词收藏（最多 200 个）和精选表达收藏保存在本机，并包含在学习记录导入导出中。查询词在点击查询时会发送至第三方服务，请勿输入个人信息。请求不携带本站账号凭据；第三方服务仍可按其规则处理网络访问日志。

课程、练习和精选表达可在页面资源已加载后离线使用，在线词典需要联网。项目未实现离线安装或 Service Worker 缓存。

## 检查范围

**句子拼装**只匹配题目列出的标准或备选词序。英语表达可能有多个合理答案，未匹配不意味着任何其他表达都错误。新增题目时应主动维护 `acceptedAnswers`。

**自主造句**通过正则规则检查指定词形或结构特征。例如，某关检查是否出现 `because`，它不能据此判断因果关系是否合理，也不能保证整句语法、语义、拼写或自然度正确。通过规则后仍需对照任务、查看参考表达并自查。参考表达是一种可能答案。

**例句朗读**使用浏览器 `speechSynthesis` 和设备英语语音，语音质量、可用性及是否需要联网由设备和浏览器决定。

**本地记录**保存在当前网站来源下的 `localStorage`，不同设备、浏览器、本地预览地址和线上站点之间不会自动同步。清理浏览器数据或退出某些隐私模式可能删除记录。可在“学习手记”导出 JSON，在其他环境导入；导入会替换当前记录，并会先要求确认。

## 文件说明

| 文件 | 用途 |
| --- | --- |
| `index.html` | 页面入口、导航和弹窗容器 |
| `styles.css` | 视觉样式、响应式布局和交互状态 |
| `data.js` | 浏览器直接加载的合并课程与三类题库 |
| `content/` | 首版基础内容和分模块课程来源 |
| `tools/compile-content.cjs` | 合并课程并生成 data.js 和课程目录，无外部依赖 |
| `CURRICULUM.md` | 每个知识点及其练习数量目录 |
| `app.js` | 路由、练习交互、规则检查与记录管理 |
| `showcase-data.js` | 132 条精选词、短语、原创例句 |
| `dictionary.js` | 词典请求、超时、回退、规范化和缓存 |
| `extras.js` | 好词好句、查词页面和收藏交互 |
| `API_NOTES.md` | 词典接口选型、出处与可用性记录 |
| `.nojekyll` | GitHub Pages 静态发布标记 |
| `tests/content.test.cjs` | 课程和题库的数据一致性检查 |
| `tests/extras.test.cjs` | 精选表达与词典输入、匹配、回退、缓存、取消请求检查 |

## 扩展课程和题库

维护 `content/base.json` 与 `content/*.pack.cjs`，用 `node tools/compile-content.cjs` 生成 `data.js` 和 `CURRICULUM.md`。不要只修改生成的 `data.js`，否则下次合并时会覆盖修改。保持现有 ID 稳定，以保留已保存记录的对应关系；当前扩充内容保留原有全部课程、题目和进度 ID。

- `worlds`：`id`、`title`、`subtitle`、`description` 等世界信息。
- `lessons`：使用 `world` 引用世界；提供 `title`、`summary`、`analogy`、`formula`、双语 `example`、`points`、`pitfall` 和 `level`。
- `exercises`：使用 `lessonId` 引用课程；`tokens` 中每个词块具有本题唯一的 `id`、`text`、`role`；`answer` 按正确顺序列出词块 ID；可用 `acceptedAnswers` 添加其他可接受词序；`punctuation` 可指定 `.`、`?` 或 `!`。
- `writingChallenges`：提供 `requirements`、`hint`、`reference`、`referenceZh`；`checks` 包含 `label`、字符串形式 `pattern` 和可选 `flags`。
- `quizzes`：提供 `world`、`lessonId`、`prompt`、3～5 个不同的 `options`、从 0 起的 `correctIndex` 及具体 `explanation`。答题时会打乱选项顺序。

分模块文件可使用 `content/helpers.cjs` 的 `createPack()` 创建内容。`lesson()` 的 `formula` 和 `exercise()` 的 `chunks` 使用 `S:主语|V:谓语|O:宾语` 这样的缩写格式；S/V/O/C/M/J/N 分别对应主语、动词、宾语、补足、修饰、连接、其他。拼装题中的词块按答案顺序编写，辅助脚本会生成稳定的词块 ID；题库展示时再打乱顺序。不要通过机械替换主语或照搬例句增加数量，应保留不同场景与目标结构。

词块 `role` 取值：`subject`、`verb`、`object`、`complement`、`modifier`、`connector`、`neutral`。颜色表示词块在当前句子中的成分，不等同于词性分类。正则字符串中的反斜线需要按 JavaScript 字符串规则转义，例如 `"\\bbecause\\b"`。

新增内容后运行：

```powershell
node tools/compile-content.cjs
node --check app.js
node --check extras.js
node --check dictionary.js
node --test tests/content.test.cjs tests/extras.test.cjs
```

内容检查验证实体 ID、引用、答案词块完整性和参考表达能否通过目标规则；它不能代替英语内容校对和实际浏览器交互验证。

延伸学习资源记录在内容包的 `sources` 中，合并后可在知识图鉴底部展开。来源标注保留实际读取范围；这些链接是延伸资料，不表示每一句本站讲解都有逐句外部出处。
