const mongodb = require('mongoose');

const Schema = mongodb.Schema;

const venueModel = Schema({
    venueName:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
});

const venuemodel = mongodb.model('venues',venueModel);

module.exports = venuemodel;