'use strict';
const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),out=path.join(root,'.qa','release');
const files=['index.html','styles.css','app.js','data.js','showcase-data.js','dictionary.js','extras.js','.nojekyll','.gitignore','README.md','CURRICULUM.md','PROJECT.md','VALIDATION.md','API_NOTES.md'];
fs.mkdirSync(out,{recursive:true});
for(const name of files)fs.copyFileSync(path.join(root,name),path.join(out,name));
for(const name of ['content','tools','tests'])fs.cpSync(path.join(root,name),path.join(out,name),{recursive:true});
console.log(JSON.stringify({directory:out,files:files.length,sourceDirectories:['content','tools','tests']}));
