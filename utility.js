var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { mySqlOperation } = require('./db');


const autherizationOfUser = (req,res,next) => {
    console.log("authorization started!!!");
    const header = req.headers["authorization"];
    if (typeof header === 'undefined'){
        res.status(403).send("Forbidden authorization required");    
        return;
    }
    req.token = header;
    const token = req.token;
    if (!token) {
        res.status(401).send("unauthorized token: emty");
        console.log("unauthorized token: emty");
        return;
    }
    
    jwt.verify(token, process.env.JWT_SECRET ,function (err,data){
        if(err) {
            console.log("not authorized token!");
            res.status(401).send("not authorized token!");
            return ;
        }
    console.log(Object.values(data)[0],Object.values(data)[1]);
    res.status(200)
    next();    
    })
}

async function authenticateOfUser(req,res) {
    let temp =  await mySqlOperation("select username,password from userinfo where username = ?;",req.body.username);
    const hash = temp[0].password;
    if(!(temp[0].username)){
        res.status(404).send("Please sign up username not found");
        return;
    }
    const validPassword = await bcrypt.compare(req.body.password,hash);
    if(!(validPassword)){
        res.status(401).send("wrong password");
        return;
    }
    const token = jwt.sign({ username: temp[0].username ,password: temp[0].password } , process.env.JWT_SECRET , { expiresIn: '1h' });
    console.log("token generated!!!")
    res.status(202).send(token);

}

module.exports={
    authenticateOfUser,
    autherizationOfUser
}