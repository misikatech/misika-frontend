import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { ProductFilters } from '../types';
import { useProducts } from '../hooks/useProducts';

const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState<ProductFilters>({
    page: 1,
    limit: 12,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  // Update filters based on URL parameters
  useEffect(() => {
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const page = searchParams.get('page');
    const sortBy = searchParams.get('sortBy');
    const sortOrder = searchParams.get('sortOrder');

    setFilters(prev => ({
      ...prev,
      category: category || undefined,
      search: search || undefined,
      page: page ? parseInt(page) : 1,
      sortBy: (sortBy as any) || 'createdAt',
      sortOrder: (sortOrder as any) || 'desc',
    }));
  }, [searchParams]);

  const { data: products, isLoading, error } = useProducts(filters);

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

  const currentCategory = searchParams.get('category');
  const categoryName = currentCategory ? currentCategory.charAt(0).toUpperCase() + currentCategory.slice(1).replace('-', ' ') : '';

  return (
    <>
      <Helmet>
        <title>{categoryName ? `${categoryName} - ` : ''}Products - Misika</title>
        <meta name="description" content={`Browse our wide selection of ${categoryName ? categoryName.toLowerCase() + ' ' : ''}products at Misika. Find the best deals on groceries, electronics, garments, and more.`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {categoryName ? `${categoryName} Products` : 'All Products'}
            </h1>
            <p className="text-gray-600">
              {categoryName
                ? `Discover our amazing collection of ${categoryName.toLowerCase()} products`
                : 'Discover our amazing collection of products'
              }
            </p>
            {products?.pagination && (
              <p className="mt-1 text-sm text-gray-500">
                Showing {products.data.length} of {products.pagination.totalItems} products
              </p>
            )}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.data.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <div className="mb-2">
                  <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                    {product.category.name}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-orange-600">${product.price}</span>
                    {product.salePrice && (
                      <span className="text-sm text-gray-500 line-through">${product.salePrice}</span>
                    )}
                  </div>
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {products?.data.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600">
                {categoryName
                  ? `No ${categoryName.toLowerCase()} products available at the moment.`
                  : 'Try adjusting your search or filter criteria.'
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
