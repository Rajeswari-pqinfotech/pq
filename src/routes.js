const express = require('express');
const multer = require('multer');
const Employee = require('./controllers/employeecontroll.js');
const utilController = require('./controllers/utilsController.js');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({storage:storage});

router.post("/util/addRole",utilController.AddRoleDetail);
router.get("/util/getRole",utilController.GetRoleDetail);
router.post("/util/addVenue",utilController.AddVenueDetail);
router.get("/util/getVenue",utilController.GetVenueDetail);

router.post("/employee/register",upload.single('image'),Employee.Register);//upload.single('image'),
router.post("/employee/login",Employee.Login);
router.post("/employee/logout",Employee.Logout);
router.post("/employee/forgetpassword",Employee.ForgetPassword);
router.post("/employee/Verify",Employee.VerifyOtp);
router.post("/employee/resetpassword",Employee.ResetPassword);
router.get("/employee/getEmployee",Employee.GetEmployee);
router.get("/employee/loginHistroy/:employeeId/:logindate/:logoutdate",Employee.GetLoginHistry);
router.post("/employee/addImage",upload.single('dpImg'),Employee.addImage);
router.get("/employee/getImage/:id",Employee.GetImage);

module.exports=router;