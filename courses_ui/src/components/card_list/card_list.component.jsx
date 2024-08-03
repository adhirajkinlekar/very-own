import { useContext, useEffect, useState } from 'react';
import Card from '../card/card.component';
import AppContext from '../../context/app_context';  

const CardList = ()=> {

   // const { isAuthenticated } = useContext(AppContext);

    const { tanentId } = useContext(AppContext); 

    const [academyCourses, setAcademyCourses] = useState([]); 
    
    useEffect(() => {

        const courses = [
            {
                id: 1,
                title: 'JavaScript Algorithms and Data Structures Masterclass',
                topic: 'Software Development',
                rating: 4,
                imageURL: 'https://img-c.udemycdn.com/course/750x422/1406344_1d65_3.jpg',
                academyId: "coltsteele",
            },
            {
                id: 2,
                title: 'The Git & Github Bootcamp',
                topic: 'Software Development',
                rating: 5,
                imageURL: 'https://img-b.udemycdn.com/course/750x422/3792262_6b0c_2.jpg',
                academyId: "coltsteele",
            },
            {
                id: 3,
                title: 'The Linux Command Line Bootcamp: Beginner To Power User',
                topic: 'Software Development',
                rating: 4,
                imageURL: 'https://img-c.udemycdn.com/course/750x422/3998050_2ed8.jpg',
                academyId: "coltsteele",
            },
            {
                id: 4,
                title: 'Code with Ethereum & Solidity: The Complete Developer Guide',
                topic: 'Software Development',
                rating: 5,
                imageURL: 'https://img-b.udemycdn.com/course/750x422/1466612_bead_3.jpg',
                academyId: "stepheng",
            },
        ];

        const academyCourses = courses.filter(x => x.academyId === tanentId);

        setAcademyCourses(academyCourses);
        
    },[tanentId]);
 
        return (
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                {
                    academyCourses.map(course => (
                        <div key={course.id}>
                            <Card
                                id={course.id}
                                title={course.title}
                                imageURL={course.imageURL}
                                rating={course.rating} />
                        </div>
                    ))
                }
            </div>
        ) 
}

export default CardList



