import React, { useContext } from 'react';
import CardList from '../card_list/card_list.component'; 
import "./home_page.styles.css";
import AppContext from '../../context/app_context';

const HomePage = () => {

    const { academy } = useContext(AppContext); 

    return (
        <div className='container'>
            <div className="profile-card">
                <div className="profile-description" dangerouslySetInnerHTML={{ __html: academy.about }}></div>
            </div>
            <h5 className="fancy-underline">Course list</h5>
            <CardList />
        </div>
    );
};

export default HomePage;