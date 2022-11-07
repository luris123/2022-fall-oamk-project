const V1 = require('../models/V1');
const V2 = require('../models/V2');

const getAllDatasets = async(req, res) => {
    try {
        const v1data = await V1.find({});
        res.json(v1data);
    } catch (error) {
        console.error(error);
    }
}

    module.exports = {
        getAllDatasets
    };