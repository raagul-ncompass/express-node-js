const { mySqlOperation } = require('./db');
var bcrypt = require('bcrypt');


const getSignupData = (req,res) =>{
    let firstname = req.body.firstname
    let lastname = req.body.lastname
    let username = req.body.username;
    let password = req.body.password;
    bcrypt.hash(password, 10, async (err, hash) => {
        if(err) {
            res.sendStatus(500)
            console.log("error in encryption"); 
            return;
        }
        var sql = "INSERT INTO userinfo (firstname,lastname,username,password) VALUES (?)";
        var values = [[firstname,lastname,username,hash]];
        res.status(202).send(await mySqlOperation(sql,values));
    })
}


const display = (req, res)=> {
    res.status(200).send(`welcome autherized user!`);
}


const getStudentData = async(req,res)=>{
    try{
        res.status(202).send(await mySqlOperation("select * from student where name = ?;",(req.params.name)));
    }
    catch(err)
    {
        res.status(406).send(err)   
    }}

const delStudentData=async(req,res)=>{
    try{
        res.status(202).send(await mySqlOperation("delete from student where id = ?;",(req.params.id)));
    }
    catch(err){
        res.status(406).send(err)    
    }}

const insertStudentData=async(req,res)=>{
    try{
        res.status(202).send(await mySqlOperation("insert into student values(?);",[Object.values(req.body)]));
    }
    catch(err)
    {
        res.status(406).send(err) 
    }}


const updateStudentData=async(req,res)=>{
    try{
        res.status(202).send(await mySqlOperation("update student set name = ? where id=?;",[req.body.name,req.params.id]))
    }
    catch(err){
        res.status(406).send(err)    
    }
}

const urlNotFound =(req,res)=>{
    res.status(404).send('Not found');
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
