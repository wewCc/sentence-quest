# 单词接口选型记录

核验日期：2026-10-21。公开接口的政策和可用性会变化。

| 接口 | 本次核验 | 用途 |
| --- | --- | --- |
| [Datamuse](https://www.datamuse.com/api/) | clarity 查询 HTTP 200；Origin 为本地预览时返回匹配的 CORS 头；浏览器 evidence、clarity 查询显示真实释义 | 当前主接口，精确匹配查询词，按词性归组 |
| [Free Dictionary API](https://dictionaryapi.dev/) | 官方文档支持免密钥词条查询；本次网络请求 HTTP 530 | 备用接口；不能保证任何时刻均可用 |
| English Dictionary API | 本次请求 15 秒超时，未接入 | 未作为可用服务发布 |

请求格式：

```text
https://api.datamuse.com/words?sp=clarity&md=dpr&ipa=1&max=8
https://api.dictionaryapi.dev/api/v2/entries/en/clarity
```

Datamuse 会返回近似拼写，必须寻找 `word` 与查询一致的条目，不能简单取第一项。`defs` 按制表符分隔词性与释义；若提供 `defHeadword`，页面注明对应原形。读音数据为服务的自动估计参考，可能采用音素编码；设备朗读单独使用浏览器语音，不声称提供发音评分。Datamuse 的释义数据来自 WordNet / Wiktionary；页面保留接口出处。备用接口返回的词条来源及内容许可也会保留显示。

Datamuse 官方页公告 2027 年初要求密钥，页面不同段落给出的切换日期不一致（1 月 / 2 月）。本站选择 2027-01-01 UTC 停用匿名 Datamuse 请求。不要将付费或私密密钥硬编码进公开前端；将来可调整免密钥服务选型，或由维护者另行设计受控服务。

请求每家服务超时 5.5 秒，主服务异常后回退一次；用户切换页面或发起新查询会取消旧请求，防止旧结果覆盖新词。成功响应会话缓存 30 分钟、最多 50 条。请求使用 `credentials: omit` 和 `referrerPolicy: no-referrer`；页面明确说明查询词将发送给第三方。接口故障、查无结果和本地精选内容分开呈现，不用模拟结果充当在线数据。
