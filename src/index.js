const express = require("express")
const app=express()
const path = require("path")
const hbs = require("hbs")

const LogInCollection= require("./mongodb")
//module.exports= collection
//we have to require it in whatever we have exported it in mongodb.js that is "collection"

const nodemailer = require('nodemailer');


app.use(express.json())

app.use(express.urlencoded({ extended: false }))


const templatePath= path.join(__dirname,'../templates')
const publicPath = path.join(__dirname, '../public')
console.log(publicPath);

app.set('view engine', 'hbs')
//app.set('views', views)
app.set('views', templatePath) //by default, it will check for the views folder
//this is to say that, you have to check templatePath instead of views folder
//it works fine if tou just rename templates to views

app.use(express.static(publicPath))

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'spoorthi.is21@bmsce.ac.in',
      pass: 'Electronics321'
    }
  });

app.get("/signup", (req,res)=>{
    res.render('signup')
})
app.get('/', (req, res) => {
    res.render('login')
})
// app.get("/home", (req,res)=>{
//     res.render("home")
// })
app.post("/signup", async (req,res)=>{

    const data={
        email:req.body.email,
        password:req.body.password
    }
    //data.save();

    //inorder to work with mongodb, we have to work with async await functions

    console.log(data.email)
    await LogInCollection.insertMany([data])

    // const checking = await LogInCollection.findOne({name:data.name})
    // //find() returns a cursor whereas findOne() returns a document

    // console.log(data)
    // console.log("value of checking is ", checking)
    // try{
    //     console.log("111")
    //     if (checking.name === req.body.name && checking.password===req.body.password) {
    //         console.log("22")
    //         res.send("user details already exists")
    //     }
    //     else{
    //         console.log("333")
    //         await LogInCollection.insertMany([data])
    //     }
    // }
    // catch{(err)=>{
    //     console.log("444")
    //     res.send("wrong inputs")
    // }}

    
    // submit.addEventListener('submit',(e)=>{
    //     e.preventDefault();
    //     let ebody = `
    //     <h1>First Name: </h1>${fname.value}
    //     <br>
    //     <h1>Last Name: </h1>${lname.value}
    //     `;
    
        
        // });
        // document.getElementById("signupemail").value
    
    

        const mailOptions = {
            from: 'spoorthi.is21@bmsce.ac.in',
            to: req.body.email,
            subject: 'Thank you for logging in',
            text: 'You have successfully logged in to our blog post!'
          };
      
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });



    res.render("login", {
        naming: req.body.email
    })    
    // .status(201)
})
//async function cause we're working with mongodb

app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ email: req.body.email })

        if (check.password === req.body.password) {
            res.status(201).render("home", { email: `${req.body.password}+${req.body.email}` })
        }

        else {
             res.render("login")
        }
    } 
    
    catch (err) {
        res.send("wrong details")
    }

})


app.listen(3002, ()=>{
    console.log("server has started on port 3002")
})