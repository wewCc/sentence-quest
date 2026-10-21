'use strict';
// Development-only content authoring helpers. The website loads compiled data.js.
const role = {S:'subject',V:'verb',O:'object',C:'complement',M:'modifier',J:'connector',N:'neutral'};
function parts(input) {
  return input.split('|').map(item=>{const p=item.indexOf(':');if(p<1)throw new Error('Bad role/text: '+item);const key=item.slice(0,p);if(!role[key])throw new Error('Bad role: '+key);return {text:item.slice(p+1),role:role[key]};});
}
function createPack() {
  const pack={lessons:[],exercises:[],quizzes:[],writingChallenges:[]};
  return {
    pack,
    lesson(o){pack.lessons.push({id:o.id,world:o.world,title:o.title,tag:o.tag,summary:o.summary,analogy:o.analogy,formula:parts(o.formula),example:{en:o.en,zh:o.zh},points:o.points,pitfall:o.pitfall,level:o.level||'基础'});},
    exercise(o){const tokens=parts(o.chunks).map((t,i)=>({id:o.id+'-t'+i,...t}));const answer=tokens.map(t=>t.id);pack.exercises.push({id:o.id,world:o.world,lessonId:o.lessonId,prompt:o.prompt,translation:o.zh,tokens,answer,explanation:o.explanation,hint:o.hint,punctuation:o.punctuation||'.',...(o.alternatives?{acceptedAnswers:o.alternatives.map(order=>order.map(i=>tokens[i].id))}:{})});},
    quiz(o){pack.quizzes.push({...o});},
    writing(o){pack.writingChallenges.push({...o});}
  };
}
module.exports={createPack};
