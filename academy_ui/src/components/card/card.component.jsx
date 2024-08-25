import { Component } from 'react';
import './card.styles.css'; // Ensure you have your custom styles here
import { Link } from 'react-router-dom';

class Card extends Component {
  render() {
    const { id, title, imageURL, rating } = this.props;

    return (
      <Link to={`/courses/${id}`}>
        <div className="card-container">
          <img
            src={imageURL}
            className="card-image"
            alt="Course Thumbnail"
          />
          <div className="card-content">
            <h5 className="card-title">
              {title.length > 30 ? `${title.slice(0, 30)}...` : title}
            </h5>
            <div className="card-rating">
              <div className="rating-text">{rating} / 5</div>
              <div className="rating-stars">
                {[...Array(5)].map((_, index) => (
                  <span key={index} className={`star ${index < Math.round(rating) ? 'filled' : ''}`}>
                    &#9733;
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default Card;
