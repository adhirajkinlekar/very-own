const express = require('express');
const Academy = require('../models/Academy');
const Course = require('../models/Course');
const mongoose = require('mongoose');
const client = require('./../nats');

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

        client.publish('academy.created', JSON.stringify(savedAcademy), (err, guid) => {
            // if (err) {
            //   return res.status(500).send('Publish failed: ' + err);
            // }
            // res.send('Login event published with guid: ' + guid);
        });

        // create a child document in admin services, admin document  

        res.status(201).json({ academyId: savedAcademy.id });

    } catch (error) {
        res.status(500).json({ error: 'Failed to create academy' });
    }
});

router.get('/dashboard', async (req, res) => {
    try {
        console.log("called");

        // Assuming userId is hardcoded, ensure it’s a valid ObjectId
        const userId = new mongoose.Types.ObjectId('66be1b70102007e90902da0e');
        console.log("userId:", userId);

        // Fetch academies based on userId
        const academies = await Academy.find({ userId }).select('headline academyName _id imageUrl');
        console.log("academies:", academies);

        // Extract academy IDs from the academies
        const academyIds = academies.map(academy => academy._id);

        // Get the count of courses related to the academies
        const courseCount = await Course.countDocuments({ academyId: { $in: academyIds } });
        console.log("courseCount:", courseCount);

        // Return academies and the course count as JSON
        res.status(200).json({ academies, courseCount });
    } catch (err) {
        console.error("Error occurred:", err);

        // Send a more detailed error message in development, if necessary
        res.status(500).json({ error: 'Failed to retrieve dashboard details' });
    }
});


// Get all academies
router.get('/:academyId', async (req, res) => {
    try {


        const { academyId } = req.params;
        console.log({academyId})

        const objectId = new mongoose.Types.ObjectId(academyId);

        const academy = await Academy.findById(objectId);

        if (!academy) return res.status(400).json({ error: 'Could not find academy' });

        const courses = await Course.find({ academyId: academy._id });


        res.json({ academy, courses });

    } catch (error) {
        console.log({ error })
        res.status(500).json({ error: 'Failed to retrieve academy' });
    }
});

router.get('/customer/:publicId', async (req, res) => {
    try {

        const { publicId } = req.params;

        const academy = await Academy.findOne({ publicId });

        if (!academy) return res.status(400).json({ error: 'Could not find academy' });

        const courses = await Course.find({ academyId: academy._id });

        res.json({ academy, courses });

    } catch (error) {
        console.log({ error })
        res.status(500).json({ error: 'Failed to retrieve academy' });
    }
});

router.get('/:academyId/courses/:courseId', async (req, res) => {
    try {

        const { courseId, academyId } = req.params;

        const course = await Course.find({ _id: new mongoose.Types.ObjectId(courseId), academyId });

        if (!course) return res.status(400).json({ error: 'Could not find academy' });

        res.json({ course: course[0] });

    } catch (error) {
        console.log({ error })
        res.status(500).json({ error: 'Failed to retrieve academy' });
    }
});

router.post('/:academyId/course', async (req, res) => {
    try {

        const course = req.body;

        const { academyId } = req.params;

        const objectId = new mongoose.Types.ObjectId(academyId);

        const academy = await Academy.findById(objectId);

        if (!academy) return res.status(400).json({ error: 'Could not find academy' });

        const courseDetails = {
            courseName: course.title,
            headline: course.headline,
            imageUrl: "",
            description: course.description,
            sections: course.sections,
            academyId: objectId
        };

        const newCourse = new Course(courseDetails)

        const savedCourse = await newCourse.save();

        res.status(201).json(savedCourse);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to Create the course' });
    }
});


module.exports = router;
