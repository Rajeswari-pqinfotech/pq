const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const shortid = require('shortid');
const fs = require('fs');

const employeemodel = require('../model/employeemodel.js');
const attenModel = require('../model/attendancemodel.js');

const Employessresponse = require('../utils/respondMessage.js');
const mailer = require('../utils/Mailer.js');
const roleModel = require('../model/role.js');
const employeeModel = require('../model/employeemodel.js');

const Employee = {
    Register: async (req, res) => {
        try {

            const roledata = await roleModel.findOne({ _id: req.body.roleid, depCode: req.body.refCode });//
            var autoEmpId = req.body.refCode.split('_');
            
            if (!roledata) {
                Employessresponse.Fail.message = "Refferal code is wrong.";
                res.send(Employessresponse.Fail);
            }
            else {

                const salt = await bcrypt.genSalt(10);
                const pass = bcrypt.hashSync(req.body.password, salt);
                req.body.password = pass;
                req.body.createdAt = new Date();
                const verifCode = shortid.generate();

                req.body.verificationCode = verifCode;

                // req.body.imgName = req.file.originalname;
                // req.body.imgContextType = req.file.mimetype;
                // req.body.imgData = req.file.buffer;

                // // req.body.imgData = "Binary.createFromBase64("+req.body.imgData+",0)";
                //    console.log(req.body.imgData);

                const countemp = await employeeModel.find().countDocuments();
                req.body.employeeId = autoEmpId[0]+'_'+autoEmpId[1]+'_'+(countemp+1);
                 console.log(req.body.employeeId);
                const result = await new employeemodel(req.body).save();

                if (!result) {
                    Employessresponse.Fail.message = "something went wrong.";
                    res.send(Employessresponse.Fail);

                }
                else {
                    var imgDa = Buffer.from(req.body.imgData, 'base64');
                    fs.writeFileSync("./public/" + result._id + ".jpeg", imgDa);

                    // const token = jwt.sign(resetkey, process.env.resetKey);
                    // const text = "http://localhost:8080/api/rest/?:" + token;
                    // const txt = "Hi "+empData.employeeName+"! Your verification code is "+verifCode+". Enter this code in our [website or app] to reset your password.";
                    const forMail = mailer.otpMailer(req.body.email, req.body.employeeName, verifCode);
                    if (!forMail) {
                        Employessresponse.Fail.message = "something went wrong";
                        res.send(Employessresponse.Fail);
                    }

                    const response = Employessresponse.success;
                    response.message = "employee registered successfully, to Verifiy your account check your mail."
                    response.data = [];
                    res.send(response);
                }
            }
        }
        catch (error) {
            console.log(error)
            Employessresponse.Error.message = error;
            res.send(Employessresponse.Error);
        }
    },
    Login: async (req, res) => {
        try {
            const response = Employessresponse.success;
            response.data=[];

            var userdata = await employeemodel.findOne({ email: req.body.email }, { imgName: 0, imgContextType: 0, imgData: 0 });

            if (!userdata) {
                Employessresponse.Fail.message = "invalid credentials";
                res.send(Employessresponse.Fail);
            }
            else if (!userdata.isVerified) {
                Employessresponse.Fail.message = "Kindly verify your account.";
                res.send(Employessresponse.Fail);
            }
            else {
                const passres = await bcrypt.compare(req.body.password, userdata.password);

                if (!passres) {
                    Employessresponse.Fail.message = "invalid Password";
                    res.send(Employessresponse.Fail);
                }
                else {
                    const tokenData = {
                        id: userdata._id,
                        empid: userdata.employeeId
                    };

                    const token = jwt.sign(tokenData, process.env.secreteKey);
                    const logindata = { emprefid: userdata._id, logedin: Date.now() };

                    // const logintm = {days:new Date()};
                    // const logupdt = await attenModel.findOneAndUpdate({emprefid:userdata._id},{$push:{logedin:logintm}},{ new: true, upsert: true }).exec();
                    const logupdt = await new attenModel(logindata).save();
                    var imgdata = "http://10.167.22.106:8080/public/"+userdata._id+".jpeg";
                    // console.log(imgdata);
                    // userdata._doc = { ...userdata._doc, token,imgpath:imgdata, loginTime: logindata.logedin };
                    userdata._doc = { ...userdata._doc,imgpath:imgdata, loginTime: logindata.logedin };
                    userdata = userdata._doc;
                    console.log(userdata)
                    // response.data[0]=[];
                    response.data[0] = userdata;
                    res.send(response);
                }

            }
        } catch (error) {
            console.log(error);
            Employessresponse.Error.message = error;
            res.send(Employessresponse.Error);
        }
    },
    Logout: async (req, res) => {
        try {
            // const logdt = {days:new Date()};
            // const logData = await attenModel.findOneAndUpdate({emprefid:req.body.employeeId},{$push:{logedout:logdt}},{new:true,upsert:true}).exec();

            const logoutdata = await attenModel.findOneAndUpdate({ emprefid: req.body.id }, { logedout: Date.now() }).sort({ logedin: -1 }).exec();

            if (logoutdata) {
                Employessresponse.success.message = "Logged of successfully";
                Employessresponse.success.data = [];
                res.send(Employessresponse.success);
            }
            else {
                Employessresponse.Fail.message = "Failed to log off.";
                res.send(Employessresponse.Fail);
            }
        }
        catch (error) {
            Employessresponse.Error.message = error;
            res.send(Employessresponse.Error);
        }
    },
    ForgetPassword: async (req, res) => {
        try {
            const empData = await employeemodel.findOne({ email: req.body.email });
            if (!empData) {
                Employessresponse.Fail.message = "Email Id is not available";
                res.send(Employessresponse.Fail);
            }
            else {
                const verifCode = shortid.generate();

                // const token = jwt.sign(resetkey, process.env.resetKey);
                // const text = "http://localhost:8080/api/rest/?:" + token;
                // const txt = "Hi "+empData.employeeName+"! Your verification code is "+verifCode+". Enter this code in our [website or app] to reset your password.";
                const forMail = mailer.otpMailer(empData.email, empData.employeeName, verifCode);
                if (!forMail) {
                    Employessresponse.Fail.message = "something went wrong";
                    res.send(Employessresponse.Fail);
                }
                else {
                    const vData = await employeemodel.findOneAndUpdate({ _id: empData._id }, { verificationCode: verifCode, isVerified: false }).exec();
                    if (!vData) {
                        Employessresponse.Fail.message = "something went wrong";
                        res.send(Employessresponse.Fail);
                    }
                    else {
                        Employessresponse.success.message = "Kinldy refer your email for verification code."
                        Employessresponse.success.data = [];
                        Employessresponse.success.data[0] = forMail;
                        res.send(Employessresponse.success)
                    }
                }
            }
        }
        catch (err) {
            Employessresponse.Error.message = err;
            res.send(Employessresponse.Error);
        }
    },
    VerifyOtp: async (req, res) => {
        try {

            const refData = await employeemodel.findOneAndUpdate({ verificationCode: req.body.referalCode, isVerified: false }, { isVerified: true }).exec();

            if (!refData) {
                Employessresponse.Fail.message = "Code is already verified or invalid code.";
                res.send(Employessresponse.Fail);
            }
            else {
                Employessresponse.success.message = "code is verified successfully.";
                const dt = { empId: refData.employeeId };
                Employessresponse.success.data = [];
                Employessresponse.success.data[0] = dt;
                res.send(Employessresponse.success);
            }

        }
        catch (error) {
            Employessresponse.Error.message = error;
            res.send(Employessresponse.Error);
        }
    },
    ResetPassword: async (req, res) => {
        try {
            // const tk = req.headers.token;
            // const emdata = jwt.verify(tk, process.env.resetKey);
            // const empid = emdata.id;

            const salt = await bcrypt.genSalt(10);
            const pass = bcrypt.hashSync(req.body.password, salt);

            const empUpdata = await employeemodel.findOneAndUpdate({ employeeId: req.body.employeeId }, { $set: { password: pass } }).exec();
            if (!empUpdata) {
                Employessresponse.Fail.message = "Invalid referal code."
                res.send(Employessresponse.Fail);
            }
            else {
                Employessresponse.success.message = "password updated successfully.";
                Employessresponse.success.data = [];
                Employessresponse.success.data[0] = empUpdata;
                res.send(Employessresponse.success);
            }
        }
        catch (error) {
            Employessresponse.Error.message = error;
            res.send(Employessresponse.Error);
        }
    },
    GetEmployee: async (req, res) => {
        try {

            // const tk = req.headers.token;
            // const emptoken = jwt.verify(tk, process.env.secreteKey);
            // var empid = emptoken.id;

            const empid = req.params.empId;
            if (empid) {

                const empData = await employeemodel.findOne({ employeeId: empid });

                if (empData) {
                    Employessresponse.success.message = "successfully data given."
                    Employessresponse.success.data = [];
                    Employessresponse.success.data[0] = empData;
                    res.send(Employessresponse.success);
                }
                else {
                    Employessresponse.Fail.message = "Invalid id.";
                    res.send(Employessresponse.Fail);
                }
            }
            else {
                Employessresponse.Fail.message = "employee id is empty.";
                res.send(Employessresponse.Fail);
            }

        }
        catch (err) {
            Employessresponse.Error.message = err;
            res.send(Employessresponse.Error);
        }
    },
    GetLoginHistry: async (req, res) => {
        try {
            // console.log(req.params.logindate);
            var empdata = await employeeModel.findOne({ employeeId: req.params.employeeId }, { _id: 1 });

            if (empdata) {
                var quer = {
                    emprefid: empdata._id
                };
                if (req.params.logindate)
                    quer = { ...quer, logedin: { $gte: req.params.logindate } };
                if (req.params.logoutdate)
                    quer = { ...quer, logedout: { $lte: req.params.logoutdate } };

                const logdata = await attenModel.find(quer, { _id: 0, emprefid: 0, __v: 0 });

                Employessresponse.success.data = [];
                for (loghis of logdata)
                    Employessresponse.success.data.push(loghis);
                res.send(Employessresponse.success);
            }
            else {
                Employessresponse.Fail.message = "invalid employee id.";
                res.send(Employessresponse.Fail);
            }
        } catch (error) {
            Employessresponse.Error.message = error;
            res.send(Employessresponse.Error);
        }
    },
    addImage: async (req, res) => {
        try {
            if (req.file) {
                const updata = {
                    imgName: req.file.originalname,
                    imgContextType: req.file.mimetype,
                    imgData: req.file.buffer,
                    // imgContextType:req.file.imgContextType,
                    // imgData:req.file.imgData
                };
                const bsimgName = req.file.imgName
                var imgDa = Buffer.from(req.body.imgData, 'base64');
                fs.writeFileSync("./public/" + req.body.id + ".jpeg", imgDa);

                //  console.log(req.body.id);
                const imgupdt = await employeeModel.findOneAndUpdate({ _id: req.body.id }, { $set: updata }).exec();
                // console.log(imgupdt);
                Employessresponse.success.message = "images uploaded successfully.";
                Employessresponse.success.data = [];
                res.send(Employessresponse.success);
            } else {
                Employessresponse.Fail.message = "Images is missing";
                res.send(Employessresponse.Fail);
            }
        }
        catch (error) {
            console.error('Error retrieving image:', error);
            res.status(500).send('Error retrieving image');
        }
    },
    GetImage: async (req, res) => {
        try {
            const image = await employeeModel.findById({ _id: req.params.id });
            
            if (!image) {
                Employessresponse.Fail.message = "image not found.";
                res.send(Employessresponse.Fail);
            }

            var img = Buffer.from(image.imgData, 'base64');

            res.writeHead(200, {
                'Content-Type': image.imgContextType,
                // 'Content-Type':'image/jpeg',
                'Content-Length': img.length
            });
            res.end(img);

            // Set response headers to serve the image
            // res.set('Content-Type', image.imgContextType);
            // res.send(image);
        } catch (error) {
            console.error('Error retrieving image:', error);
            res.status(500).send('Error retrieving image');
        }
    }
}

module.exports = Employee;

