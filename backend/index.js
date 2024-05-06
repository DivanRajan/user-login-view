import express from 'express';
import bodyParser from 'body-parser';
const app = express();
import db from './db.js';
const port = 3001;

app.use(bodyParser.json());
app.post('/user/register',(req,res)=>{
    db.userInsert(req.body)
    .then((response)=>{
        res.status(200).send(response);
    })
    .catch(error=>{
        res.status(500).send(error)
    })
});

app.get('',(req,res)=>{
    db.getUser()
    .then(response=>{
        res.status(200).send(response)
    })
    .catch(error=>{
        res.status(500).send(error)
    })
});

app.post('/login',(req,res)=>{
db.userLogin(req.body)
.then(response=>{
    res.status(200).send(response);
})
.catch(error=>{
    res.status(500).send(error)
})
});

app.listen(port,()=>{
    console.log("port running successfully")
})