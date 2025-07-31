import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES, ROUTES } from '../../constants';

interface CategoryCardProps {
  category: typeof CATEGORIES[number];
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link
      to={`${ROUTES.PRODUCTS}?category=${category.slug}`}
      className="group relative bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
    >
      <div className="aspect-square p-6 flex flex-col items-center justify-center text-center">
        <div className="text-4xl md:text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
          {category.icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {category.name}
        </h3>
        <div className="flex items-center text-sm text-blue-600 group-hover:text-blue-700">
          <span>Shop Now</span>
          <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
      
      {/* Hover Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </Link>
  );
};

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of products across different categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {CATEGORIES.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </section>
  );
};
