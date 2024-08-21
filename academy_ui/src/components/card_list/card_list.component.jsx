import { useContext, useEffect, useState } from 'react';
import Card from '../card/card.component';
import AppContext from '../../context/app_context';  

const CardList = ()=> {

   // const { isAuthenticated } = useContext(AppContext);

    const { courses } = useContext(AppContext);  
 
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                {
                    courses.map(course => (
                        <div key={course._id}>
                            <Card
                                id={course._id}
                                title={course.courseName}
                                imageURL={course.imageUrl}
                                rating={course.rating} />
                        </div>
                    ))
                }
            </div>
        ) 
}

export default CardList



