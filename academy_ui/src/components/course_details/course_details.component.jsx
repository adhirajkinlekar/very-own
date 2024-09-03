import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './course_detail.styles.css';
import AppContext from '../../context/app_context';
import axiosInstance from '../../util/axiosInterceptor';

const CourseDetails = () => {
    const navigate = useNavigate();
    const { isAuthenticated, publicId, academyId } = useContext(AppContext);
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true); // Added loading state

    const handleButtonClick = () => {
        if (isAuthenticated) {
            navigate(`./learn`);
        } else {
            window.location.href = `http://sso.veryown.com/secure/${publicId}_academy/signin`;
        }
    };

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axiosInstance.get(`http://api-academy.veryown.com/api/academy/${academyId}/courses/${id}`);
                setCourse(response.data.course);
            } catch (error) {
                console.error('Fetch error:', error); // Added error logging
            } finally {
                setLoading(false); // Set loading to false when the request completes
            }
        };

        fetchCourseData();
    }, [id, academyId]);

    if (loading) {
        // Display a loading spinner or message while data is being fetched
        return (
            <div className="text-center mt-10">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="mx-auto px-4 py-8">
            {course ? (
                <div className="course-page max-w-7xl mx-auto p-6 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 rounded-lg shadow-lg">
                    <div className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
                        {/* Course Content */}
                        <div className="course-content flex-1">
                            <header className="mb-6">
                                <h1 className="text-4xl font-bold text-gray-900">{course.courseName}</h1>
                                <p className="mt-2 text-lg text-gray-700">{course.headline}</p>
                            </header>
                            <section
                                className="course-description text-gray-800 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: course.description }}
                            ></section>
                        </div>
                        
                        {/* Course Preview */}
                        <div className="preview-section flex flex-col items-center space-y-4 lg:w-1/3">
                            <img
                                src={course.imageUrl}
                                alt={course.title}
                                className="w-full h-64 object-cover rounded-lg shadow-lg"
                            />
                            <button
                                onClick={handleButtonClick}
                                className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                            >
                                {isAuthenticated ? 'Go to course' : 'Login to view'}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center text-gray-700 mt-20">Course is not available or has been archived</div>
            )}
        </div>
    );
};

export default CourseDetails;
