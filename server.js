const cluster = require('cluster')
const os = require('os')
const totalCpus=  os.cpus().length
const express = require('express')
const { dirname } =  require("node:path")
const url = require('url')
const{ pathToFileURL ,} =  require("node:url");

console.log(`totalCpus: ${totalCpus}`)

console.log(`Primary pid=${process.pid}`);
cluster.setupPrimary({
    "exec": __dirname + '/index.js'
})

for(let i = 0; i< totalCpus;i++){
    cluster.fork();
}

