const mongodb = require('mongoose');
const Schema = mongodb.Schema;

const roleSchema = Schema({
    rolename:{
        type:String
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