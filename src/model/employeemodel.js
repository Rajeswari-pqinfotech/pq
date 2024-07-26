const mongodb = require('mongoose');
const mongoautopopulate = require('mongoose-autopopulate');


const Schema = mongodb.Schema;

const employeemodel = Schema({
    employeeName:{
        type:String,
        required:[true,"employee name is missing"]
    },
    employeeId:{
        type:String,
        required:[true,"employee id is missing"],
        unique:true
    },
    mobile:{
        type:String,
        required:[true,"mobile number is missing"],
        unique:true
    },
    email:{
        type:String,
        required:[true,"email id is missing"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"password is missing"]
    },
    refCode:{
        type:String,
        required:[true,"referal code is missing"]
    },
    verificationCode:{
        type:String
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    imgName:String,
    imgContextType:String,
    imgData:Buffer,
    roleid:{
        type:mongodb.Schema.ObjectId,
        ref:'roles',
        autopopulate:true
    },
    // venueId:{
    //     type:mongodb.Schema.ObjectId,
    //     ref:'venues',
    //     autopopulate:true
    // },
    createdAt: {
        type: Date
    }
});

employeemodel.plugin(mongoautopopulate);

const employeeModel = mongodb.model('employees',employeemodel);

module.exports=employeeModel;