const mongodb = require('mongoose');
const Schema = mongodb.Schema;

const seasonSchema = Schema({
    seasonName:{
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

const seasonModel = mongodb.model('seasonTypes',seasonSchema);

module.exports = seasonModel;