const { mySqlOperation } = require('./db');
var bcrypt = require('bcrypt');


const getSignupData = async (req,res) =>{
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let username = req.body.username;
    let password = req.body.password;
    bcrypt.hash(password, 10, async (err, hash) => {
        if(err) {
            res.status(500);
            res.send({message:"Error in encryption"});
            console.log("Error in encryption"); 
            return;
        }
        var sql = "INSERT INTO userinfo (firstname,lastname,username,password) VALUES (?)";
        var values = [[firstname,lastname,username,hash]];
        let result = await mySqlOperation(sql,values)
        res.status(202).send(
            {
            message:"successfully signed up!",
            data: result
            }
        );
    })
}


const display = (req, res)=> {
    res.status(200).send({
        message :`welcome autherized user!`
    });
}

const usecaseForCompression = async(req,res) =>{
    try{
        let result = await mySqlOperation("select * from surveydataforcompress;")
        res.status(202).send({
            message:"operation result",
            data:result
        });
    }
    catch(err)
    {
        res.status(406).send({
            message:err.message
        })   
    }
}
const getStudentData = async(req,res)=>{
    try{
        let result = await mySqlOperation("select * from student where name = ?;",(req.params.name));
        res.status(202).send({
            message:"operation result",
            data: result 
        });
    }
    catch(err)
    {
        res.status(406).send({
            message:err
        })   
    }
}

const delStudentData=async(req,res)=>{
    try{
        let result = await mySqlOperation("delete from student where id = ?;",(req.params.id))
        res.status(202).send({
            message:"operation result",
            data: result 
        });
    }
    catch(err){
        res.status(406).send({
            message:err
        })    
    }}

const insertStudentData=async(req,res)=>{
    try{
        let result = await mySqlOperation("insert into student values(?);",[Object.values(req.body)]);
        res.status(202).send({
            message:"operation result",
            data: result 
        });
    }
    catch(err)
    {
        res.status(406).send({
            message:err
        })  
    }}


const updateStudentData=async(req,res)=>{
    try{
        let result = await mySqlOperation("update student set name = ? where id=?;",[req.body.name,req.params.id]);
        res.status(202).send({
            message:"operation result",
            data: result 
        })
    }
    catch(err){
        res.status(406).send({
            message:err
        })    
    }
}

const urlNotFound =(req,res)=>{
    res.status(404).send({
        message:'404 page Not found'
    });
}


module.exports={
    display,
    urlNotFound,  
    insertStudentData,
    delStudentData,
    updateStudentData,
    getSignupData,
    getStudentData,
    usecaseForCompression
}
