'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const source = fs.readFileSync(path.join(__dirname, '..', 'data.js'), 'utf8');
const context = vm.createContext({ window: {} });
vm.runInContext(source, context, { filename: 'data.js', timeout: 1000 });
const data = JSON.parse(JSON.stringify(context.window.LEARNING_DATA));
const roles = new Set(['subject', 'verb', 'object', 'complement', 'modifier', 'connector', 'neutral']);
const nonempty = (value, label) => assert.equal(typeof value === 'string' && value.trim().length > 0, true, label);
const uniqueIds = (list, label) => {
  for (const item of list) nonempty(item.id, `${label}: id 不能为空`);
  assert.equal(new Set(list.map(item => item.id)).size, list.length, `${label}: id 不能重复`);
};

test('课程覆盖十个世界，具备成体系的知识点及三类任务', () => {
  assert.equal(data.worlds.length, 10);
  assert.ok(data.lessons.length >= 110);
  assert.ok(data.exercises.length >= 170);
  assert.ok(data.quizzes.length >= 110);
  assert.ok(data.writingChallenges.length >= 60);
  for (const field of ['worlds', 'lessons', 'exercises', 'quizzes', 'writingChallenges']) {
    assert.ok(Array.isArray(data[field]), `${field} 必须是数组`);
    uniqueIds(data[field], field);
  }
  uniqueIds([...data.worlds, ...data.lessons, ...data.exercises, ...data.quizzes, ...data.writingChallenges], '全局实体');
});

test('知识世界含标题、介绍、课程与两种练习入口', () => {
  for (const world of data.worlds) {
    for (const field of ['title', 'subtitle', 'description']) nonempty(world[field], `${world.id}.${field}`);
    assert.ok(data.lessons.filter(x => x.world === world.id).length >= 8, `${world.id} 至少八课`);
    assert.ok(data.exercises.filter(x => x.world === world.id).length >= 6, `${world.id} 至少六道拼装题`);
    assert.ok(data.quizzes.filter(x => x.world === world.id).length >= 10, `${world.id} 至少十道知识测验`);
    assert.ok(data.writingChallenges.filter(x => x.world === world.id).length >= 4, `${world.id} 至少四道自主造句题`);
  }
});

test('知识测验选项、答案及解析完整，且不存在完全重复的题目', () => {
  const lessons=new Map(data.lessons.map(x=>[x.id,x]));
  const fingerprints=new Set();
  for(const q of data.quizzes) {
    const l=lessons.get(q.lessonId);assert.ok(l,`${q.id}.lessonId`);assert.equal(q.world,l.world);
    nonempty(q.prompt,`${q.id}.prompt`);nonempty(q.explanation,`${q.id}.explanation`);
    assert.equal(/第[一二三四五1-5](?:句|项|个选项)|选项\s*[A-EＡ-Ｅ]/.test(q.explanation),false,`${q.id} 解析不能依赖会打乱的选项序号`);
    assert.ok(q.options.length>=3&&q.options.length<=5,`${q.id}.options`);
    q.options.forEach(x=>nonempty(x,`${q.id}.option`));
    assert.equal(new Set(q.options.map(x=>x.trim())).size,q.options.length,`${q.id} 选项不能重复`);
    assert.ok(Number.isInteger(q.correctIndex)&&q.correctIndex>=0&&q.correctIndex<q.options.length,`${q.id}.correctIndex`);
    const fingerprint=JSON.stringify([q.lessonId,q.prompt,[...q.options].sort()]);
    assert.ok(!fingerprints.has(fingerprint),`${q.id} 重复题`);fingerprints.add(fingerprint);
  }
});

test('每个知识点均有对应练习，首版 ID 和内容保持兼容', () => {
  const tasks=[...data.exercises,...data.quizzes,...data.writingChallenges];
  for(const l of data.lessons)assert.ok(tasks.some(t=>t.lessonId===l.id),`${l.id} 缺少练习`);
  const base=JSON.parse(fs.readFileSync(path.join(__dirname,'..','content','base.json'),'utf8'));
  for(const key of ['worlds','lessons','exercises','writingChallenges'])for(const item of base[key]) {
    assert.deepEqual(data[key].find(x=>x.id===item.id),item,`${item.id} 不应丢失或被扩充内容覆盖`);
  }
});

test('课程的引用、讲解、结构和双语例句完整', () => {
  const worldIds = new Set(data.worlds.map(x => x.id));
  for (const lesson of data.lessons) {
    assert.ok(worldIds.has(lesson.world), `${lesson.id} 的 world 不存在`);
    for (const field of ['title', 'tag', 'summary', 'analogy', 'pitfall', 'level']) nonempty(lesson[field], `${lesson.id}.${field}`);
    assert.ok(['入门', '基础', '进阶'].includes(lesson.level), `${lesson.id}.level`);
    assert.ok(Array.isArray(lesson.points) && lesson.points.length >= 1, `${lesson.id}.points`);
    lesson.points.forEach(point => nonempty(point, `${lesson.id}.point`));
    assert.ok(Array.isArray(lesson.formula) && lesson.formula.length >= 1, `${lesson.id}.formula`);
    for (const token of lesson.formula) {
      nonempty(token.text, `${lesson.id}.formula.text`);
      assert.ok(roles.has(token.role), `${lesson.id}: 非法的句子成分 ${token.role}`);
      if(/其他.*成分/.test(token.text))assert.notEqual(token.role,'object',`${lesson.id} 泛指成分不能强行标作宾语`);
    }
    nonempty(lesson.example?.en, `${lesson.id}.example.en`);
    nonempty(lesson.example?.zh, `${lesson.id}.example.zh`);
  }
});

test('拼装题引用正确，标准和备选答案都恰好覆盖全部词块', () => {
  const lessons = new Map(data.lessons.map(x => [x.id, x]));
  for (const exercise of data.exercises) {
    const label = exercise.id;
    const lesson = lessons.get(exercise.lessonId);
    assert.ok(lesson, `${label} 的 lessonId 不存在`);
    assert.equal(exercise.world, lesson.world, `${label} 的世界与课程不一致`);
    for (const field of ['prompt', 'translation', 'explanation', 'hint']) nonempty(exercise[field], `${label}.${field}`);
    assert.ok(Array.isArray(exercise.tokens) && exercise.tokens.length >= 2, `${label}.tokens`);
    uniqueIds(exercise.tokens, `${label}.tokens`);
    const tokenIds = exercise.tokens.map(x => x.id).sort();
    for (const token of exercise.tokens) {
      nonempty(token.text, `${label}.token.text`);
      assert.ok(roles.has(token.role), `${label}: 非法的句子成分 ${token.role}`);
    }
    const answers = [exercise.answer, ...(exercise.acceptedAnswers || [])];
    for (const answer of answers) {
      assert.ok(Array.isArray(answer), `${label}: 答案必须是数组`);
      assert.equal(new Set(answer).size, answer.length, `${label}: 答案中重复使用词块`);
      assert.deepEqual([...answer].sort(), tokenIds, `${label}: 答案必须恰好使用全部词块`);
    }
    if (exercise.punctuation !== undefined) assert.ok(['.', '?', '!'].includes(exercise.punctuation), `${label}.punctuation`);
  }
});

test('自主造句任务有目标、参考表达与可运行的规则，参考表达通过每条规则', () => {
  const lessons = new Map(data.lessons.map(x => [x.id, x]));
  for (const writing of data.writingChallenges) {
    const label = writing.id;
    const lesson = lessons.get(writing.lessonId);
    assert.ok(lesson, `${label} 的 lessonId 不存在`);
    assert.equal(writing.world, lesson.world, `${label} 的世界与课程不一致`);
    for (const field of ['title', 'prompt', 'hint', 'reference', 'referenceZh']) nonempty(writing[field], `${label}.${field}`);
    assert.ok(Array.isArray(writing.requirements) && writing.requirements.length >= 1, `${label}.requirements`);
    writing.requirements.forEach(x => nonempty(x, `${label}.requirement`));
    assert.ok(Array.isArray(writing.checks) && writing.checks.length >= 1, `${label}.checks`);
    for (const check of writing.checks) {
      nonempty(check.label, `${label}.check.label`);
      nonempty(check.pattern, `${label}.check.pattern`);
      const rule = new RegExp(check.pattern, check.flags || 'i');
      assert.ok(rule.test(writing.reference), `${label} 的参考表达未匹配规则：${check.label}`);
      assert.equal(new RegExp(check.pattern, check.flags || 'i').test(''), false, `${label} 的规则不能接受空字符串`);
      assert.equal(/[gy]/.test(check.flags || ''), false, `${label} 规则不使用有状态 g/y flags`);
    }
  }
});
