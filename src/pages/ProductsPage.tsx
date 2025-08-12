import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {ProductCard} from '../components/product/ProductCard';
import { Product } from '../types';
import { Filter, Grid, List } from 'lucide-react';

const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');

  const categories = [
    { id: 'electronics', name: 'Electronics', count: 234 },
    { id: 'fashion', name: 'Fashion', count: 156 },
    { id: 'sports', name: 'Sports', count: 89 },
    { id: 'home-garden', name: 'Home & Garden', count: 67 },
    { id: 'books', name: 'Books', count: 123 },
    { id: 'toys', name: 'Toys', count: 45 },
  ];

  const products = [
    { 
      id: '1', 
      name: 'iPhone 15 Pro', 
      description: 'Latest iPhone with advanced features',
      category: { id: 'electronics', name: 'Electronics', slug: 'electronics' }, 
      price: 89999, 
      images: ['https://via.placeholder.com/300x300/f0f0f0/666?text=iPhone+15+Pro'], 
      rating: 4.5,
      reviewCount: 128,
      sku: 'IPH15PRO',
      stock: 25,
      isActive: true,
      isFeatured: true,
      tags: ['smartphone', 'apple'],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    { 
      id: '2', 
      name: 'Nike Air Max', 
      description: 'Comfortable running shoes',
      category: { id: 'sports', name: 'Sports', slug: 'sports' }, 
      price: 8999, 
      images: ['https://via.placeholder.com/300x300/f0f0f0/666?text=Nike+Air+Max'], 
      rating: 4.2,
      reviewCount: 89,
      sku: 'NIKE001',
      stock: 15,
      isActive: true,
      isFeatured: false,
      tags: ['shoes', 'nike'],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    { 
      id: '3', 
      name: 'Samsung TV 55"', 
      description: '4K Smart TV with HDR',
      category: { id: 'electronics', name: 'Electronics', slug: 'electronics' }, 
      price: 45999, 
      images: ['https://via.placeholder.com/300x300/f0f0f0/666?text=Samsung+TV'], 
      rating: 4.7,
      reviewCount: 156,
      sku: 'SAM55TV',
      stock: 8,
      isActive: true,
      isFeatured: true,
      tags: ['tv', 'samsung'],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    { 
      id: '4', 
      name: 'Adidas T-Shirt', 
      description: 'Cotton sports t-shirt',
      category: { id: 'fashion', name: 'Fashion', slug: 'fashion' }, 
      price: 1499, 
      images: ['https://via.placeholder.com/300x300/f0f0f0/666?text=Adidas+Shirt'], 
      rating: 4.0,
      reviewCount: 67,
      sku: 'ADI001',
      stock: 30,
      isActive: true,
      isFeatured: false,
      tags: ['clothing', 'adidas'],
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
  ];

  const filteredProducts = selectedCategory 
    ? products.filter(product => product.category.id === selectedCategory)
    : products;

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    if (categoryId) {
      setSearchParams({ category: categoryId });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange('')}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    !selectedCategory ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                  }`}
                >
                  All Products
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors flex justify-between ${
                      selectedCategory === category.id ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className="text-sm text-gray-500">({category.count})</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {selectedCategory 
                    ? categories.find(c => c.id === selectedCategory)?.name || 'Products'
                    : 'All Products'
                  }
                </h1>
                <p className="text-gray-600">{filteredProducts.length} products found</p>
              </div>
              
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="name">Sort by Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
                
                <div className="flex border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-500'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
