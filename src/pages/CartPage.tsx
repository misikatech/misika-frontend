import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useCart } from '../context/CartContext';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

const CartPage: React.FC = () => {
  const { items, total, isLoading } = useCart();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>Shopping Cart - Misika</title>
      </Helmet>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          {items.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-gray-600">Add some products to get started!</p>
            </div>
          ) : (
            <div>
              <p>Cart items: {items.length}</p>
              <p>Total: ${total.toFixed(2)}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
