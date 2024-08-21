import { Component } from 'react';
import './card.styles.css'
import { Link } from 'react-router-dom';
 
class Card extends Component {
    
    // componentWillUnmount(){

    // }

    // shouldComponentUpdate(){

    // }

    // when the state or props change, the render method is called again.
    // However, React's lifecycle methods (like shouldComponentUpdate) can control whether the component re-renders or not. 

    render() {
        const { id, title, imageURL, rating } = this.props; 

        return (
            <Link to={`/courses/${id}`}>
                <div className="card card-custom mx-auto mt-4" style={{ width: '25rem' }}>
                    <img
                        src={imageURL} // Use curly braces without quotes for JSX expressions
                        className="card-img-top card-img-top-custom"
                        alt="Card cap"
                    />
                    <div className="card-body">
                        <h5 className="card-title">{title.length > 25 ? (title.slice(0, 25) + '...') : title}</h5>
                        <div className='rating_container'>
                            <div>{rating} / 5</div> {/* Display rating value */}
                            <div className="rating">
                                {[...Array(5)].map((_, index) => (
                                    <span key={index} className={index < rating ? 'star filled' : 'star'}>
                                        &#9733;
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }
}

export default Card;
