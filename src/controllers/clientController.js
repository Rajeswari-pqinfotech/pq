
const clientModel = require('../model/clientmodel.js');
const clientResponse = require('../utils/respondMessage.js');
const clientController = {
    AddClientData: async (req, res) => {
        try {
            const cdata = await new clientModel(req.body).save();
            if (cdata) {
                clientResponse.success.message = "client data added successfully.";
                res.send(clientResponse.success);
            }
            else {
                clientResponse.Fail.message = "failed to add data."
                res.send(clientResponse.Fail);
            }
        }
        catch (error) {
            if (error.errorResponse.code === 11000) {
                clientResponse.Error.code = "200",
                clientResponse.Error.message = "Mobile number is already exits.";
            }
            else
                clientResponse.Error.message = error;


            res.send(clientResponse.Error);
        }
    },
    getClientdetail: async (req, res) => {
        try {
            const cdata = await clientModel.find();
            if (cdata) {
                clientResponse.success.message = "data has been given.";
                clientResponse.success.data = [];
                clientResponse.success.data[0] = cdata;
                res.send(clientResponse.success);
            }
            else {
                clientResponse.Fail.message = "no data found";
                res.send(clientResponse.Fail);
            }
        }
        catch (error) {
            clientResponse.Error.message = error;
            res.send(clientResponse.Error);
        }
    }
};

module.exports = clientController;