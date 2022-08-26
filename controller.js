const { mySqlOperation } = require('./db');
var bcrypt = require('bcrypt');


const getSignupData = (req,res) =>{
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
        res.status(202).send(
            {
            message:"successfully signed up!",
            data:await mySqlOperation(sql,values)
            }
        );
    })
}


const display = (req, res)=> {
    res.status(200).send({
        message :`welcome autherized user!`
    });
}


const getStudentData = async(req,res)=>{
    try{
        res.status(202).send({
            message:"operation result",
            data:await mySqlOperation("select * from student where name = ?;",(req.params.name))
        });
    }
    catch(err)
    {
        res.status(406).send({
            message:err
        })   
    }}

const delStudentData=async(req,res)=>{
    try{
        res.status(202).send({
            message:"operation result",
            data:await mySqlOperation("delete from student where id = ?;",(req.params.id))
        });
    }
    catch(err){
        res.status(406).send({
            message:err
        })    
    }}

const insertStudentData=async(req,res)=>{
    try{
        res.status(202).send({
            message:"operation result",
            data: await mySqlOperation("insert into student values(?);",[Object.values(req.body)])
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
        res.status(202).send({
            message:"operation result",
            data:await mySqlOperation("update student set name = ? where id=?;",[req.body.name,req.params.id])
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
        message:'Not found'
    });
}


module.exports={
    display,
    urlNotFound,  
    insertStudentData,
    delStudentData,
    updateStudentData,
    getSignupData,
    getStudentData
}
