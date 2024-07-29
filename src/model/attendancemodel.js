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
    logedout:{
        type:Date
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