import React, { useContext } from 'react';
import CardList from '../card_list/card_list.component'; 
import "./home_page.styles.css";
import AppContext from '../../context/app_context';

const HomePage = () => {

    const { academy } = useContext(AppContext); 

    return (
        <div className="container mx-auto px-6 py-4">
  {/* Profile Card */}
  <div className="bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
    <div className="p-6">
      <div
        className="text-gray-700"
        dangerouslySetInnerHTML={{ __html: academy.description }}
      ></div>
    </div>
  </div>
 
  <div className="mt-8">
    <h5 className="text-2xl font-semibold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
      Course List
    </h5>
  </div>
 
  <div className="mt-4">
    <CardList />
  </div>
</div>

      
    );
};

export default HomePage;