// HomePage.js
import React from 'react';
import CardList from '../card_list/card_list.component';
import Profile from '../profile.jsx/profile';
import "./home_page.styles.css";

const HomePage = () => {
    return (
        <div className='container'>
            <Profile />
            <h5 class="fancy-underline">Course list</h5>
            <CardList />
        </div>
    );
};

export default HomePage;