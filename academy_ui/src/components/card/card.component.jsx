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
               <div className="max-w-sm mx-auto mt-6 bg-white rounded-lg shadow-md overflow-hidden">
  <img
    src={imageURL}
    className="w-full h-48 object-cover"
    alt="Card cap"
  />
  <div className="p-4">
    <h5 className="text-xl font-semibold text-gray-800">
      {title.length > 25 ? `${title.slice(0, 25)}...` : title}
    </h5>
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-600">{4.5} / 5</div>
      <div className="flex space-x-1">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={index < 4.5 ? 'text-yellow-500' : 'text-gray-300'}>
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
