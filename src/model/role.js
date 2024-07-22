const mongodb = require('mongoose');
const Schema = mongodb.Schema;

const roleSchema = Schema({
    rolename:{
        type:String
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
});

const role = mongodb.model('roles',roleSchema);

module.exports = role;