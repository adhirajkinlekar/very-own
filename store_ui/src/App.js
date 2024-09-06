

import React, { useState, useEffect } from 'react';
import './App.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src="https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Logo" className="logo" />
        <span>Luxuria</span>
      </div>
      <ul className="navbar-links">
        <li>Home</li>
        <li>Shop</li>
        <li>Collections</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
};

const DemoPopup = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000); // Popup disappears after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    visible && (
      <div className="demo-popup">
        <p>This is a demo website</p>
      </div>
    )
  );
};

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <div className="image-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      <div className="product-details">
        <h3>{product.name}</h3>
        <p>${product.price}</p>
        <button className="buy-button">Buy Now</button>
      </div>
    </div>
  );
};

const ProductList = () => {
  const products = [
    {
      name: 'Silk Royalty Handbag',
      price: 249.99,
      image: 'https://images.pexels.com/photos/3761552/pexels-photo-3761552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      name: 'Gilded Luminary Watch',
      price: 349.99,
      image: 'https://images.pexels.com/photos/12163561/pexels-photo-12163561.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      name: 'Velvet Empress Shoes',
      price: 199.99,
      image: 'https://images.pexels.com/photos/27164016/pexels-photo-27164016/free-photo-of-sherwani-and-khussa.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  return (
    <div className="product-list">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} />
      ))}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <p>© 2024 Luxuria. All Rights Reserved.</p>
    </footer>
  );
};

const App = () => {
  return (
    <>
      <DemoPopup />
      <Navbar />
      <header className="hero-section">
        <h3>Elevate Your Style with Luxuria</h3>
        <p>Discover the latest in luxury fashion and accessories</p>
        <button className="explore-button">Shop Now</button>
      </header>
      <ProductList />
      <Footer />
    </>
  );
};
 

export default App
