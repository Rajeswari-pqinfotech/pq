const mongodb = require('mongoose');

const Schema = mongodb.Schema;

const membShipSchema=Schema({
    membShipName:{
        type:String,
        required:true
    },
    membShipYears:{
        type:Number,
        required:true
    },
    MembShipFee:{
        type:Number,
        required:true
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
});

const membershipPlanModel = mongodb.model('MemberShipPlans',membShipSchema);

module.exports = membershipPlanModel;