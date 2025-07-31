import React from 'react';
import { Helmet } from 'react-helmet-async';

const CheckoutPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Checkout - Misika</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          <p>Checkout functionality coming soon...</p>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
