const role = require('../model/role.js');
const venuemdl = require('../model/venueModel.js');
const UtilsResponse = require('../utils/respondMessage.js');

const utilController = {
    AddRoleDetail: async (req, res) => {
        try {

            const RoleData = await new role({ rolename: req.body.rolename }).save();

            if (RoleData) {
                UtilsResponse.success.message = "successfully data added.";
                UtilsResponse.success.data = [];
                UtilsResponse.success.data[0] = RoleData;
                res.send(UtilsResponse.success)
            }
            else {
                UtilsResponse.Fail.message = "Data not found";
                res.send(UtilsResponse.Fail);
            }
        }
        catch (err) {
            UtilsResponse.Error.message = err;
            res.send(UtilsResponse.Error);
        }
    },
    GetRoleDetail: async (req, res) => {
        try {

            const RoleData = await role.find({isAvailable:true});
            // console.log(RoleData)
            if (RoleData) {
                UtilsResponse.success.message = "successfully data given.";
                UtilsResponse.success.data = [];
                for (RlData of RoleData)
                    UtilsResponse.success.data.push(RlData);

                res.send(UtilsResponse.success)
            }
            else {
                UtilsResponse.Fail.message = "Data not found";
                res.send(UtilsResponse.Fail);
            }
        }
        catch (err) {
            UtilsResponse.Error.message = err;
            res.send(UtilsResponse.Error);
        }
    },
    AddVenueDetail: async (req, res) => {
        try {

            const venData = await new venuemdl({ venueName: req.body.venueName }).save();

            if (venData) {
                UtilsResponse.success.message = "successfully data added.";
                UtilsResponse.success.data = [];
                UtilsResponse.success.data[0] = venData;
                res.send(UtilsResponse.success)
            }
            else {
                UtilsResponse.Fail.message = "Data not found";
                res.send(UtilsResponse.Fail);
            }
        }
        catch (err) {
            UtilsResponse.Error.message = err;
            res.send(UtilsResponse.Error);
        }
    },
    GetVenueDetail: async (req, res) => {
        try {

            const venueData = await venuemdl.find();
            // console.log(venueData)
            if (venueData) {
                UtilsResponse.success.message = "successfully data given.";
                UtilsResponse.success.data = [];
                for (venData of venueData)
                    UtilsResponse.success.data.push(venData);
                res.send(UtilsResponse.success);
            }
            else {
                UtilsResponse.Fail.message = "no data found."
                res.send(UtilsResponse.Fail);
            }
        }
        catch (error) {
            UtilsResponse.Error.message = error;
            res.send(UtilsResponse.Error);
        }
    }
}

module.exports = utilController;