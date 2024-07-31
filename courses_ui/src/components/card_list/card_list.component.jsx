import { Component } from 'react';
import Card from '../card/card.component';

class CardList extends Component {

    constructor() {
        super();

        this.state = {
            courses: []
        }
    }

    componentDidMount = () => {

        const courses = [
            { id: 1, title: 'JavaScript Algorithms and Data Structures Masterclass', topic: 'Software Development', rating: 4, imageURL: 'https://img-c.udemycdn.com/course/750x422/1406344_1d65_3.jpg' },
            { id: 2, title: 'The Git & Github Bootcamp', topic: 'Software Development', rating: 5, imageURL: 'https://img-b.udemycdn.com/course/750x422/3792262_6b0c_2.jpg' },
            { id: 3, title: 'The Linux Command Line Bootcamp: Beginner To Power User', topic: 'Software Development', rating: 4, imageURL: 'https://img-c.udemycdn.com/course/750x422/3998050_2ed8.jpg' },
        ];

        this.setState({ courses })
    }

    render() {

        const { courses } = this.state;

        return (
            <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
                {
                    courses.map(course => (
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
}

export default CardList



