import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../constants';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { Product, ProductFilters } from '../types';

// Mock product service - replace with actual service
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Sample Product',
    description: 'This is a sample product',
    price: 99.99,
    images: ['https://via.placeholder.com/300'],
    category: { id: '1', name: 'Electronics', slug: 'electronics' },
    sku: 'SAMPLE-001',
    stock: 10,
    isActive: true,
    tags: ['sample'],
    rating: 4.5,
    reviewCount: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const ProductsPage: React.FC = () => {
  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    limit: 12,
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const { data: products, isLoading, error } = useQuery({
    queryKey: QUERY_KEYS.PRODUCTS.LIST(filters),
    queryFn: async () => {
      // Mock API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { data: mockProducts, pagination: { page: 1, limit: 12, total: 1, totalPages: 1, hasNext: false, hasPrev: false } };
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Products</h1>
          <p className="text-gray-600">Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Products - Misika</title>
        <meta name="description" content="Browse our wide selection of products" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Products</h1>
            <p className="text-gray-600">Discover our amazing collection of products</p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.data.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border p-4">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">${product.price}</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {products?.data.length === 0 && (
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No products found</h2>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
