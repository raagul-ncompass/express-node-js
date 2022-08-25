const router = require("express").Router();
const { urlNotFound, display, getSignupData, getStudentData, delStudentData, insertStudentData, updateStudentData } = require("./controller");
const { autherizationOfUser, authenticateOfUser } = require("./utility");
const { validateIdParams, validateInsertData, validateNameBody, validateNameParams, validateSignupData } = require('./validation')

router.post("/login/",authenticateOfUser);

router.get('/getstudentdetails/:name',validateNameParams,getStudentData);

router.delete('/deletestudentdetails/:id',autherizationOfUser,validateIdParams,delStudentData);

router.post('/insertstudentdata/',autherizationOfUser,validateInsertData,insertStudentData);

router.put('/updatestudent/:id',autherizationOfUser,validateIdParams,validateNameBody,updateStudentData);

router.get('/hello',autherizationOfUser, display);

router.post("/signup/",validateSignupData,getSignupData);

router.use(urlNotFound);

module.exports={router};
