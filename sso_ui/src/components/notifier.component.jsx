// Popup.js
import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import './notifier.css';

const Popup = ({ message, duration }) => {
  const popupRef = useRef(null);

  useEffect(() => {
    if (popupRef.current) {
      popupRef.current.style.display = 'block';

      const timer = setTimeout(() => {
        if (popupRef.current) {
          popupRef.current.style.display = 'none';
        }
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration]);

  return (
    <div className="popup" ref={popupRef}>
      <div className="popup-content">
        <span>{message}</span>
      </div>
    </div>
  );
};

const createPopup = (message, duration) => {
  const popupContainer = document.createElement('div');
  document.body.appendChild(popupContainer);
  const root = ReactDOM.createRoot(popupContainer);
  root.render(<Popup message={message} duration={duration} />);
};

export default createPopup;
