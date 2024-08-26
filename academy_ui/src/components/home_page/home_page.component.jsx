import React, { useContext } from 'react';
import CardList from '../card_list/card_list.component'; 
import "./home_page.styles.css";
import AppContext from '../../context/app_context';

const HomePage = () => {
    const { academy } = useContext(AppContext); 

    return (
        <div className="home-page-container mx-auto px-4 py-8 max-w-7xl">
            {/* Profile Card */}
            <div className="profile-card bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h2 className="text-3xl font-semibold text-gray-800 mb-4">{academy.academyName}</h2>
                    <p className="text-lg text-gray-600"  dangerouslySetInnerHTML={{ __html: academy.description }}>
                     </p>
                </div>
            </div>

            {/* Course List */}
            <div className="course-list mt-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-200 pb-2">
                    Course List
                </h3>
                <CardList />
            </div>
        </div>
    );
};

export default HomePage;
