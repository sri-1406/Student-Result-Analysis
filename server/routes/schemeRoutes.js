const express = require('express');
const { getSchemes, getSchemeByYear } = require('../controllers/schemeController');
const router = express.Router();

router.get('/', getSchemes);
router.get('/:year', getSchemeByYear);

module.exports = router;
