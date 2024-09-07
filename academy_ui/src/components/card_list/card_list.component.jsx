import { useContext } from 'react';
import Card from '../card/card.component';
import AppContext from '../../context/app_context';

const CardList = () => {
    const { courses } = useContext(AppContext);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', padding: '20px' }}>
            {courses.length  ? (
                courses.map(course => (
                    <div key={course._id}>
                        <Card
                            id={course._id}
                            title={course.courseName}
                            imageURL={course.imageUrl} 
                        />
                    </div>
                ))
            ) : (
                <div style={{
                    textAlign: 'center',
                    backgroundColor: '#f8f9fa',
                    padding: '40px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                    color: '#6c757d',
                    maxWidth: '400px',
                    margin: '20px auto',
                    fontSize: '18px'
                }}>
                    <h3 style={{ marginBottom: '10px', fontWeight: 'bold' }}>No Courses Available</h3>
                    <p>The instructor has not published any courses yet.</p>
                </div>
            )}
        </div>
    );
}

export default CardList;
