const router = require("express").Router();
const { urlNotFound, display, getSignupData, getStudentData, delStudentData, insertStudentData, updateStudentData, usecaseForCompression } = require("./controller");
const { authenticationOfUser, authorizationOfUser } = require("./utility");
const { validateIdParams, validateInsertData, validateNameBody, validateNameParams, validateSignupData } = require('./validation')

router.post("/login/",authenticationOfUser);

router.get('/getstudentdetails/:name',authorizationOfUser,validateNameParams,getStudentData);

router.delete('/deletestudentdetails/:id',authorizationOfUser,validateIdParams,delStudentData);

router.post('/insertstudentdata/',authorizationOfUser,validateInsertData,insertStudentData);

router.put('/updatestudent/:id',authorizationOfUser,validateIdParams,validateNameBody,updateStudentData);

router.get('/hello',authorizationOfUser, display);

router.get('/usecaseforcompress',usecaseForCompression);

router.post("/signup/",validateSignupData,getSignupData);

router.use(urlNotFound);

module.exports={router};
