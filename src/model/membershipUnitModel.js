const mongodb = require('mongoose');

const Schema = mongodb.Schema;

const membShipUnitSchema=Schema({
    membShipUnitName:{
        type:String,
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

const membershipUnitModel = mongodb.model('MemberShipUnits',membShipUnitSchema);

module.exports = membershipUnitModel;