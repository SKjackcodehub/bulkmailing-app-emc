const express= require("express")
const cors=require("cors")

const app=express()

app.use(cors())
app.use(express.json())

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service:"gmail",
  auth: {
    user: "sathishkumarprabakar@gmail.com",
    pass: "kusg pscc yeji nawv",
  },
});


app.post("/sendemail",function(req,res){

    var msg = req.body.msg
    var emailList=req.body.emailList
    new Promise(async function(resolve,reject){
       
        try{
            for(var i=0;i<emailList.length;i++)
            {
              await transporter.sendMail(
                    {
                    from:"sathishkumarprabakar@gmail.com",
                    to:emailList[i],
                    subject:"A message from Bulk Mailing App",
                    text:msg
                },
                
              )
              console.log("Email send to:"+emailList[i])
            }
            resolve("Success")
            }
            catch(error){
                reject("Failed")
            }

    }).then(function(){
        res.send(true)
    }).catch(function(){
        res.send(false)
    })

    


})

app.listen(8080,function(){
    console.log("server start....")
})