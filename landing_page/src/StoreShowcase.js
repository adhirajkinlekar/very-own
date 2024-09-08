import React from 'react';

function StoreShowcase() {
  return (
    <div className="bg-gray-50 flex flex-col items-center pt-8 pb-16">
      <h2 className="text-4xl font-semibold text-center mb-8 text-indigo-800 pt-8">Famous Stores</h2>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-md w-full">
        <div className="relative h-48">
          <img
            src="https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt="Store"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <div className="p-6 flex flex-col items-center">
          <h3 className="text-2xl font-bold mb-4">Luxuria</h3>
          <p className="text-gray-700 mb-4 text-center">A premier destination for discerning clients, this store offers an unparalleled shopping experience that embodies elegance and opulence.</p>
          <a
            href="https://demo-store.veryown.in"
            className="text-indigo-600 hover:text-indigo-400 font-semibold mt-4"
          >
            View store
          </a>
        </div>
      </div>
    </div>
  );
}

export default StoreShowcase;

