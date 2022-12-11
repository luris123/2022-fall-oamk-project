const V1 = require('../models/V1');
const V2 = require('../models/V2');
const V3 = require('../models/V3');
const V4 = require('../models/V4');
const V5 = require('../models/V5');
const V6 = require('../models/V6');
const V7 = require('../models/V7');
const V8 = require('../models/V8');
const V9 = require('../models/V9');
const V10 = require('../models/V10');

// Gets all datasets from MongoDB
const getAllDatasets = async(req, res) => {
    try {
        const v1data = await V1.find({});
        const v2data = await V2.find({});
        const v3data = await V3.find({});
        const v4data = await V4.find({});
        const v5data = await V5.find({});
        const v6data = await V6.find({});
        const v7data = await V7.find({});
        const v8data = await V8.find({});
        const v9data = await V9.find({});
        const v10data = await V10.find({});
        res.status(200).json({ v1data, v2data, v3data, v4data, v5data, v6data, v7data, v8data, v9data, v10data });
    } catch (error) {
        res.status(404).json({ error: 'Data not found' });
    }
}
    module.exports = {
        getAllDatasets
    };