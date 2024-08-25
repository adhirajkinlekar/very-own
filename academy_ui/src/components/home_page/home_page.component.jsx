import React, { useContext } from 'react';
import CardList from '../card_list/card_list.component'; 
import "./home_page.styles.css";
import AppContext from '../../context/app_context';

const HomePage = () => {

    const { academy } = useContext(AppContext); 

    return (
      <div className="container mx-auto px-6 py-6">
      {/* Profile Card */}
      <div className="profile-card bg-white border border-custom-light-gray shadow-custom rounded-lg overflow-hidden">
        <div className="p-6">
          <div
            className="profile-description text-custom-dark-gray"
            dangerouslySetInnerHTML={{ __html: academy.description }}
          ></div>
        </div>
      </div>
    
      <div className="mt-8">
        <h5 className="course-list-heading text-custom-dark-gray mb-4 border-b-2 border-custom-light-gray pb-2">
          Course List
        </h5>
      </div>
    
      <div className="mt-6">
        <CardList />
      </div>
    </div>
    
      
    );
};

export default HomePage;