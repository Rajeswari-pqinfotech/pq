const mongodb = require('mongoose');
const mongoautopopulate = require('mongoose-autopopulate');

const Schema = mongodb.Schema;

const clientSchema = Schema({
    clientName:{
        type:String,
        required:[true,"Client name is missing"]
    },
    clientMobile:{
        type:String,
        required:[true,"mobile number is missing"],
        unique:true
    },
    clientEmail:{
        type:String,
        required:[true,"email id is missing"],
        unique:true
    },
    gender:{
        type:String,
        required:[true,"gender is missing."]
    },
    occupation:{
        type:String,
        required:[true,"occupation is missing."]
    },
    clientStatus:{
        type:String
    },
    venue:{
        type:String,
        required:[true,"address is missing."]
    },
    empRefId:{
        type:mongodb.Schema.ObjectId,
        ref:'employees',
        autopopulate:true
    }
});
clientSchema.plugin(mongoautopopulate);
const clientModel = mongodb.Model('clients',clientSchema);

module.exports = clientModel;