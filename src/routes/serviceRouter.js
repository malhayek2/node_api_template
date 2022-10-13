const express = require('express');

const router = express.Router();
const countryNameService = require('../service/serviceImplmentation')
const resources = require('../resources')
const common = require('../middleware/common');
const external = require('../external/external');



router.get('/name/:item_id' , common.onJsonRequest(countryNameService.countryRequestHandler(resources), external));
router.get('/currency/:item_id');



module.exports = router;
