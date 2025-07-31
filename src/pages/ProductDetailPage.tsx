import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Helmet>
        <title>Product Details - Misika</title>
      </Helmet>
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Detail Page</h1>
          <p>Product ID: {id}</p>
          <LoadingSpinner />
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
