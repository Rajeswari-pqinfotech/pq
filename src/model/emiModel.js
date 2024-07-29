const mongodb = require('mongoose');
const Schema = mongodb.Schema;

const emiSchema = Schema({
    emiName:{
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

const emiModel = mongodb.model('emi',emiSchema);

module.exports = emiModel;