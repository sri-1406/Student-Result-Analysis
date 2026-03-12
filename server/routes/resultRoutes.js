const express = require('express');
const { getResultByUSN, getAllResults, getAnalysis } = require('../controllers/resultController');
const router = express.Router();

router.get('/analysis', getAnalysis);
router.get('/:usn', getResultByUSN);
router.get('/', getAllResults);

module.exports = router;
