#!/usr/bin/env node

const env = require("./env");
const request = require('request');
const path = require("path")
const fse = require("fs-extra");
var exec = require('child_process').exec;
var ghUrl = "git@github.com:ColinRoye/"
const Git = require("nodegit")

const args = process.argv;
//const svcName;






async function initService(svcName){
     Git.Clone("https://github.com/ColinRoye/template_service.git", svcName)
}
async function initGHRepo(svcName){
     var headers = {
    'Authorization': 'token ' + env.ghToken,
    'user-agent': 'node.js'
};

var dataString = JSON.stringify({"name": svcName});

var options = {
    url: 'https://api.github.com/user/repos',
    method: 'POST',
    headers: headers,
    body: dataString
};

function callback(error, response, body) {
         var ghUrl = "git@github.com:"+env.userName+"/"+svcName+".git"
         dir = exec(  "ls"
                    + " && cd " + svcName
                    + " && rm -rd .git"
                    + " && git init && touch readme.md"
                    + " && git add . "
                    + " && git commit -m \"First Commit\""
                    + " && git remote add gh " + ghUrl
                    + " && git push --set-upstream gh master &> log"
                         , {maxBuffer: 10000000 * 500} ,(t)=>{
                         })
}

request(options, callback);

}
async function initDHRepo(){

}
async function main(svcName){


     await initService(svcName);
     await initGHRepo(svcName);
     //await initDHRepo(svcName);
     //await initGHWebhook();
     //await initDHWebhook();
}

if(args.length >= 3){
     name = args[2];
}else{
     throw new Error("Must define name!")
}

main(name + "_service");


//main();
