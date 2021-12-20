const express = require("express")
const app = express()
const mongoose = require('mongoose');
// mongoose.connect('mongodb://172.21.2.236:27017/190110910405');
// const schema = {
//     username:String,
//     password:String ,
//     sex:String,
//     hobby:String,
//     role:String
// }
// const mydata = mongoose.model('tuser', schema);
// const user = new mydata({ username: 'admin',password:'admin',role:'admin'});
// user.save()
// app.use('/',express.static('public'))
app.get("/",(req,res)=>{
    res.send("hello world!")
})
app.listen(3000)