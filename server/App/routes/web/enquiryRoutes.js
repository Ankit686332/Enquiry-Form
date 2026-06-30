const express = require('express');
const { enquiryInsert } = require('../../controllers/web/enquiryController');
const enquiryrouter = express.Router();

enquiryrouter.post('/', enquiryInsert);

module.exports = enquiryrouter;