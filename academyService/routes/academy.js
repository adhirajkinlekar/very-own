const express = require('express');
const Academy = require('../models/Academy');

const router = express.Router();

// Create academy endpoint
router.post('/', async (req, res) => {
    const { academyName, description, imageUrl } = req.body;

    if (!academyName || !description) {
        return res.status(400).json({ error: 'Academy name and description are required' });
    }

    try {
        const newAcademy = new Academy({
            academyName,
            description,
            imageUrl
        });

        const savedAcademy = await newAcademy.save();

        // create a child document in admin services, admin document  
        

        res.status(201).json(savedAcademy);

    } catch (error) {
        res.status(500).json({ error: 'Failed to create academy' });
    }
});

// Get all academies
router.get('/', async (req, res) => {
    try {
        const academies = await Academy.find();
        res.json(academies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve academies' });
    }
});

module.exports = router;
