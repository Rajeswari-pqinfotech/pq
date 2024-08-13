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
    age:{
        type:Number,
        required:[true,"age is missing."]
    },
    maritalStatus:{
        type:String,
        required:[true,"marital Status is missing."]
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
    latitudeClient:{
        type:Number
    },
    longitudeClient:{
        type:Number
    },
    empRefId:{
        type:mongodb.Schema.ObjectId,
        ref:'employees',
        autopopulate:true
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
});
clientSchema.plugin(mongoautopopulate);



const clientModel = mongodb.model('clients',clientSchema);

module.exports = clientModel;


// coordinates: {
//     type: { type: String }, // 'Point' for GeoJSON
//     coordinates: [Number]   // [longitude, latitude]
//   },

// Create a 2dsphere index to enable geospatial queries
// clientSchema.index({ coordinates: '2dsphere' });

// .find({
//     coordinates: {
//       $near: {
//         $geometry: {
//           type: 'Point',
//           coordinates: [longitude, latitude]
//         },
//         $maxDistance: 10000 // distance in meters
//       }
//     }
//   }


// const newLocation = new Location({
//     name: 'Some Place',
//     coordinates: {
//       type: 'Point',
//       coordinates: [longitude, latitude] // e.g., [-73.97, 40.77]
//     }
//   });
// newLocation.save((err) => {
//     if (err) console.error(err);
//     else console.log('Location saved successfully!');
//   });