const Result = require('../models/Result');
const { scrapeVTUResult } = require('../utils/scraper');

const getResultByUSN = async (req, res) => {
    try {
        const { usn } = req.params;
        
        // First check in DB
        let result = await Result.findOne({ usn }).sort({ createdAt: -1 });
        
        if (!result) {
            // If not found, scrape
            console.log(`Result not found in DB for ${usn}, fetching from portal...`);
            result = await scrapeVTUResult(usn);
            const newResult = new Result(result);
            await newResult.save();
        }

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllResults = async (req, res) => {
    try {
        const results = await Result.find();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAnalysis = async (req, res) => {
    try {
        // Simple analysis: Pass percentage per semester
        const stats = await Result.aggregate([
            {
                $group: {
                    _id: "$semester",
                    totalStudents: { $sum: 1 },
                    passedStudents: {
                        $sum: { $cond: [{ $eq: ["$status", "PASS"] }, 1, 0] }
                    },
                    avgSGPA: { $avg: "$sgpa" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getResultByUSN, getAllResults, getAnalysis };
