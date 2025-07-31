import React from 'react';
import { Helmet } from 'react-helmet-async';

const ShippingPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Shipping Policy - Misika</title>
        <meta name="description" content="Shipping policy for Misika." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Shipping Policy</h1>
        <p className="text-gray-600">Shipping policy page coming soon...</p>
      </div>
    </>
  );
};

export default ShippingPage; 