const mongodb = require('mongoose');
const autopopulate = require('mongoose-autopopulate');

const Schema = mongodb.Schema;

const membershipSchema = Schema({
    employeeId:{
        type:mongodb.Schema.ObjectId,
        ref:'employees',
        autopopulate:true
    },
    memberName:{
        type:String,
        required:[true,"membership name is required."]
    },
    memberDOB:{
        type:Date,
        required:[true,"membership date of birth is required."]
    },
    spouseName:{
        type:String,
        required:[true,"spouse name is required."]
    },
    spouseDOB:{
        type:Date,
        required:[true,"spouse date of birth is required."]
    },
    address1:{
        type:String
    },
    address2:{
        type:String
    },
    address3:{
        type:String
    },
    mobileNo:{
        type:String,
        unique:true,
        required:[true,"mobile is required."]
    },
    alterMobileNo:{
        type:String
    },
    emailId:{
        type:String,
        unique:true,
        required:[true,"email id is required."]
    },
    membershipType:{
        type:mongodb.Schema.ObjectId,
        ref:'MemberShipPlans',
        required:[true,"membershipType id is required."],
        autopopulate:true
    },
    noOfDay:{
        type:Number,
        default:7
    },
    expireOn:{
        type:Date,
        required:[true,"expireOn is required."]
    },
    memberCount:{
        type:Number,
        required:[true,"member count is required."]
    },
    seasonId:{
        type:mongodb.Schema.ObjectId,
        ref:'seasonTypes',
        autopopulate:true
    },
    membershipUnit:{
        type:mongodb.Schema.ObjectId,
        ref:'MemberShipUnits',
        autopopulate:true
    },
    discountFee:{
        type:Number
    },
    totalFee:{
        type:Number,
        required:[true,"total fee is required."]
    },
    initialFee:{
        type:Number,
        required:[true,"inital fee is required."]
    },
    amountWords:{
        type:String,
        required:[true,"amount in words is required."]
    },
    balanceFee:{
        type:Number
    },
    emiMonth:{
        type:mongodb.Schema.ObjectId,
        ref:'emis',
        autopopulate:true
    },
    emiDueFee:{
        type:Number
    },
    memberSign:{
        type:Buffer,
        required:[true,"member signature is required."]
    },
    spouseSign:{
        type:Buffer,
        required:[true,"spouse signature is required."]
    }
});

membershipSchema.plugin(autopopulate);

const membershipModel = mongodb.model('memberships',membershipSchema);

module.exports = membershipModel;