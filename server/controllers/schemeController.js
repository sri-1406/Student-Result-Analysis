const vtuSchemes = require('../utils/vtuSchemes');

const getSchemes = (req, res) => {
    try {
        res.status(200).json(vtuSchemes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSchemeByYear = (req, res) => {
    try {
        const { year } = req.params;
        const scheme = vtuSchemes[year];
        if (!scheme) return res.status(404).json({ message: 'Scheme not found' });
        res.status(200).json(scheme);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getSchemes, getSchemeByYear };
