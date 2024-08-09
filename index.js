const express = require('express')
const app = express()


app.get('/heavy', (req,res)=>{
    let total = 0;
  for (let i = 0; i < 5_000_000; i++) {
    total++;
  }
//   console.log('res----')
  res.send(`The result of the CPU intensive task is ${total}\n`);
    // res.send('reponse')
})

app.listen(5000,()=>{
    console.log("process:",process.pid)
    console.log('server is running')
})