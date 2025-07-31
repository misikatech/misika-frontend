import React from 'react';
import { Helmet } from 'react-helmet-async';

const WishlistPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Wishlist - Misika</title>
        <meta name="description" content="Your wishlist at Misika." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Wishlist</h1>
        <p className="text-gray-600">Wishlist page coming soon...</p>
      </div>
    </>
  );
};

export default WishlistPage; 