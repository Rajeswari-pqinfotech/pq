const memberModel = require('../model/membershipModel');
const memberResponse = require('../utils/respondMessage');

const memberController = {
    addMember: async(req,res)=>{
        try{
            const mData = await new memberModel(req.body).save();
            if(!mData)
            {               
                memberResponse.Fail.message="failed to add data."
                res.send(memberResponse.Fail);
            }
            else{
                memberResponse.success.message="successfully added member data."
                memberResponse.success.data=[];
                memberResponse.success.data[0]=mData;
                res.send(memberResponse.success);
            }
        }catch(err){
            console.log(err);
        }
    }
    
}

module.exports = memberController;