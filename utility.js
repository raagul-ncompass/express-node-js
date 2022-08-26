var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { mySqlOperation } = require('./db');


const authorizationOfUser = (req,res,next) => {
    console.log("authorization started!!!");
    const header = req.headers["authorization"];
    if (typeof header === 'undefined'){
        res.status(403).send({
            message:"Forbidden authorization required"
        });    
        return;
    }
    req.token = header;
    const token = req.token;
    if (!token) {
        res.status(401).send({
            message:"token: emty"
        });
        console.log("token: emty");
        return;
    }
    
    jwt.verify(token, process.env.JWT_SECRET ,function (err,data){
        if(err) {
            console.log("not authorized token!");
            res.status(401).send({
                message:"not authorized token!"
            });
            return ;
        }
    console.log("valid user!!!");
    res.status(200)
    next();    
    })
}

const authenticationOfUser = async (req,res) => {
    let temp =  await mySqlOperation("select username,password from userinfo where username = ?;",req.body.username);
    try {
    const hash = temp[0].password;
    const validPassword = await bcrypt.compare(req.body.password,hash);
    if(!(validPassword)){
        res.status(401).send({
            message:"wrong password"
        });
        return;
    }
    const token = jwt.sign({ username: temp[0].username ,password: temp[0].password } , process.env.JWT_SECRET , { expiresIn: '1h' });
    console.log("token generated!!!")
    res.status(202).send({
        message:"this is the token",
        data:{token}       
    });
    }
    catch(err){
        res.status(404).send({
            message:"Please sign up username not found"
        });
        console.log(err.message+ "     in errr");
    }
}

module.exports={
    authenticationOfUser,
    authorizationOfUser
}