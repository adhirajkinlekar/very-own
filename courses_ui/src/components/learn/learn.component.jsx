import React, { useState } from 'react';

import './learn.styles.css';

const CoursePage = () => {

    const lectures = [{
        title: "Course Walkthrough",
        items: [{
            title: "About this course",
            type: "text",
            content: "Hello there! This is my new course"
        }]
    },
    {
        title: "Join Classroom",
        items: [{
            title: "Join our discord classroom",
            type: "text",
            content: "<div> <h1>Exercise: Meet Your Classmates & Instructor</h1><p>Before we get started, let's do a quick exercise that will take less than 3 minutes:</p><ol><li>Step 1 - Click on this link to join our Private Online Classroom: <a>CLICK HERE TO JOIN NOW</a>.</li><li>Step 2 - Once inside, go to #introductions channel and share who you are, where you are from, and why you chose to do this course.</li><li>Step 3 - Go to the #accountability-buddies and find a buddy who is starting a ZTM course today just like you (doesn't have to be the same course)! You will be keeping each other accountable throughout the course and motivating each other to finish. Who knows, maybe you will find life long friends/coworkers this way.</li><li>Step 4 - Check out #general or your course specific channel to meet others in your class. We will be announcing class hangouts and instructor meetups/livestreams in there. Some of the channels available for you to join are:<ul><li>#react - For all ReactJS questions</li><li>#alumni - Ask graduates of this course questions</li><li>#womenintech - For the female coders out there</li><li>#job-hunting - Anything related to finding a job as a developer</li><li>....and many many more!!</li></ul></li></ol><p>OPTIONAL Step - A fellow ZTM student, Aldo, has made a video walkthrough for you of the community here if you want to watch and take a deep dive as to all the things that happen in the community every month.</p><h2>Course updates and cheatsheets?</h2><p>We are constantly adding new videos and updating this course, announcing new community events, and creating course cheatsheets/resources. To stay up to date with all the latest changes to the course and new videos, keep an eye out on the #announcements channel in our Discord community. Anything important will be announced in there (you can scroll to see past announcements).</p><p>You can also follow me on Twitter where I keep you updated about industry news, upcoming courses, and random thoughts on life.</p><h2>One more thing...</h2><p>As you start the course, Udemy will have a popup that will ask you to leave a review ⭐️⭐️⭐️⭐️⭐️ of the course. Yes, it can get a little annoying (it's a Udemy system and not something we have control over) but please leave an honest review (even if you just started the course) as it really helps us out and allows more people to discover this course in this massively competitive marketplace. It would truly mean a lot 😊.</p><p>Thank you and welcome to ZTM!</p><p>- Andrei</p></div"
        }]
    },
    {
        title: "High Level Design",
        items: [{
            title: "Requirement setting",
            type: "video",
            content: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        },
        {
            title: "Requirements List",
            type: "video",
            content: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/VolkswagenGTIReview.mp4"
        },
        {
            title: "Service Registration",
            type: "video",
            content: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"
        },
        {
            title: "Architecture Diagram 1",
            type: "video",
            content: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"
        },
        {
            title: "Emailing Service: Quiz #1",
            type: "video",
            content: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
        }]
    }];

    const [selectedLecture, setSelectedLecture] = useState(lectures[0].items[0]);

    const selectLecture = (sectionId, itemId) => {
        const section = lectures[sectionId];
        const item = section.items[itemId];
        setSelectedLecture(item);
    };

    return (
        <div className="course-container col-12">
            <aside className="course-sidebar">
                <input type="text" className="search-input" placeholder="Search feature is not yet implemented" />
                {lectures.map((section, i) => (
                    <div key={i} className="course-section">
                        <div className="section-title">{section.title}</div>
                        {section.items.map((item, j) => (
                            <div key={j} className="lesson-details" onClick={() => selectLecture(i, j)}>
                                <div className="lesson-item">{j + 1}. {item.title}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </aside>
            <main className="course-content">
                <div className="content-header">{selectedLecture.title}</div>
                {selectedLecture.type === 'video' ? (
                    <div className="video-container" >
                        <video controls width={1250}>
                            <source src={selectedLecture.content} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                ) : (
                    <div className="text-container">
                        <div className='m-3' dangerouslySetInnerHTML={{ __html: selectedLecture.content }}></div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default CoursePage;
