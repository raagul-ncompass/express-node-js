const Joi = require('joi');

const validateNameParams = (req, res,next) =>{
    const nameJoi = Joi.object({
        name: Joi.string().alphanum().min(3).max(30).required()
    })
    const result = nameJoi.validate(req.params);
    if(result.error){
        res.status(406);
        res.send(result.error.message);
        return;
    }
    next()
}

const validateNameBody = (req, res,next) =>{
    const nameJoi = Joi.object({
        name: Joi.string().alphanum().min(3).max(30).required()
    })
    const result = nameJoi.validate(req.body);
    if(result.error){
        res.status(406);
        res.send(result.error.message);
        return;
    }
    next()
}

const validateIdParams = (req, res,next) =>{
    const idJoi = Joi.object({
        id: Joi.string().length(4).required()
    })
    const result = idJoi.validate(req.params);
    if(result.error){
        res.status(406);
        res.send(result.error.message);
        return;}
    next();
}

const validateInsertData = (req, res,next) =>{
    const nameJoi = Joi.object({
        id: Joi.string().length(4).required(),
        name: Joi.string().alphanum().min(3).max(30).required(),
        department: Joi.string().min(2).max(20).required(),
        cgpa: Joi.number().min(5).max(10).required()
    })
    const result = nameJoi.validate(req.body);
    if(result.error){
        res.status(406); 
        res.send(result.error.message);
        return;
    }
    next()
}

const validateSignupData = (req, res,next) =>{
    const nameJoi = Joi.object({
        firstname: Joi.string().alphanum().min(3).max(30).required(),
        lastname: Joi.string().alphanum().min(3).max(30).required(),
        username: Joi.string().alphanum().min(3).max(60).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{8,30}$/).required()
    })
    const result = nameJoi.validate(req.body);
    if(result.error){
        res.status(406); 
        res.send(result.error.message);
        return;
    }
    next()
}

module.exports={
    validateIdParams,
    validateInsertData,
    validateNameBody,
    validateNameParams,
    validateSignupData 
}