const mongodb = require("mongoose");

const dbconnection = async ()=>{
  try{
    const dbconn = await mongodb.connect(process.env.MONGODB);
    console.log("db is connected:"+dbconn.connection.name);
  }
  catch(err){
    console.error("mongodb connection error", err);
  }
    
}

module.exports = dbconnection;