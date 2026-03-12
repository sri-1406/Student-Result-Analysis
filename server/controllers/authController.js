const User = require('../models/User');
const Result = require('../models/Result');
const { scrapeVTUResult } = require('../utils/scraper');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, email, password, role, usn, branch, semester } = req.body;
        
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        const user = new User({ name, email, password, role, usn, branch, semester });
        await user.save();

        // Automatically fetch results for students
        if (role === 'student' && usn) {
            try {
                const scrapedData = await scrapeVTUResult(usn);
                const result = new Result({
                    ...scrapedData,
                    usn: user.usn
                });
                await result.save();
                console.log(`Results automatically fetched and stored for ${user.usn}`);
            } catch (scrapErr) {
                console.error(`Automatic fetch failed for ${user.usn}:`, scrapErr.message);
            }
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(201).json({ token, user: { id: user._id, name: user.name, role: user.role, usn: user.usn } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Background Refresh: Update results when student logs in
        if (user.role === 'student' && user.usn) {
            scrapeVTUResult(user.usn).then(async (scrapedData) => {
                await Result.findOneAndUpdate(
                    { usn: user.usn },
                    { ...scrapedData },
                    { upsert: true, new: true }
                );
                console.log(`[AUTH] Background result refresh completed for ${user.usn}`);
            }).catch(err => console.error(`[AUTH] Background refresh failed: ${err.message}`));
        }

        res.status(200).json({ token, user: { id: user._id, name: user.name, role: user.role, usn: user.usn } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { register, login };
