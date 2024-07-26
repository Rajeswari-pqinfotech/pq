const mongodb = require('mongoose');
const Schema = mongodb.Schema;

const roleSchema = Schema({
    rolename:{
        type:String,
        required:true
    },
    depCode:{
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

const role = mongodb.model('roles',roleSchema);

module.exports = role;