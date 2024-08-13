const mongodb = require('mongoose');
const Schema = mongodb.Schema;
const mongoautopopulate = require('mongoose-autopopulate');

const attmdl = Schema({
    emprefid:{
        type:mongodb.Schema.ObjectId,
        ref:'employees',
        autopopulate:true
    },
    logedin:{
        type:Date
    },
    lginAddress:{
        type:String
    },
    lginLatitude:{
        type:Number
    },
    lginLongitude:{
        type:Number
    },
    logedout:{
        type:Date
    },
    lgoAddress:{
        type:String
    },
    lgoLatitude:{
        type:Number
    },
    lgoLongitude:{
        type:Number
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
    // logedin:{
    //     type:Array,
    //     default:[]
    // },
    // logedout:{
    //     type:Array,
    //     default:[]
    // }
});

attmdl.plugin(mongoautopopulate);
const attendanceModel = mongodb.model('attendanceHistry',attmdl);
module.exports = attendanceModel;