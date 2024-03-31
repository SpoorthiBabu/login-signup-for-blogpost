const mongoose= require("mongoose")

mongoose.connect("mongodb://127.0.0.1/LoginFormPractice")
//logindb is the name od the database used

.then( ()=>{
    console.log("mongodb connected");
})
.catch( (err)=>{
    console.log("failed to connect", err);
})
//these are the commands to connect mongodb to node js

const loginSchema= new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }    
})

const LogInCollection= new mongoose.model('LogInCollection', loginSchema)
//collection is the name given in vs code and collection1 is the name of the actual collections which follows the schema of loginschema

module.exports= LogInCollection