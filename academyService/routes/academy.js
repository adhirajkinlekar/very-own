const express = require('express');
const Academy = require('../models/Academy');
const Course = require('../models/Course');
const mongoose = require('mongoose');

const router = express.Router();

// Create academy endpoint
router.post('/', async (req, res) => {
    const { academyName, description, imageUrl } = req.body;

    if (!academyName || ! description) {
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
router.get('/:academyId', async (req, res) => {
    try {

        const { academyId } = req.params;

        const objectId = new mongoose.Types.ObjectId(academyId);

        const academy = await Academy.findById(objectId);

        if(!academy) return res.status(400).json({ error: 'Could not find academy' });

        const courses = await Course.find({ academyId: academy._id });


        res.json({academy, courses });

    } catch (error) {
        console.log({error})
        res.status(500).json({ error: 'Failed to retrieve academy' });
    }
});

router.post('/:academyId/course', async (req, res) => {
    try {
 
        const course = req.body;
        console.log({course})

        const { academyId } = req.params;

        const objectId = new mongoose.Types.ObjectId(academyId);

        const academy = await Academy.findById(objectId);

        if(!academy) return res.status(400).json({ error: 'Could not find academy' });


        const courseDetails = {
            courseName: course.title,
            headline: course.headline,
            imageUrl: "",
            description: course.description,
            sections: course.sections,
            academyId: objectId
          };

          console.log({courseDetails})

        const newCourse = new Course(courseDetails)

        const savedCourse = await newCourse.save();


        res.status(201).json(savedCourse);
    }
    catch (error) { 
        res.status(500).json({ error: 'Failed to Create the course' });
    }});

module.exports = router;
