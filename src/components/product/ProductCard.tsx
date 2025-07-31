import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import { Button } from '../ui/Button';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { ROUTES } from '../../constants';
import { Product } from '../../types';
import { formatPrice } from '../../utils';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  
  const { addToCart, isLoading: isAddingToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist, isLoading: isWishlistLoading } = useWishlist();

  const handleAddToCart = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await addToCart({
        productId: product.id,
        quantity: 1,
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
    }
  };

  const handleWishlistToggle = async (e: React.MouseEvent): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (isInWishlist(product.id)) {
        await removeFromWishlist(product.id);
      } else {
        await addToWishlist(product.id);
      }
    } catch (error) {
      console.error('Failed to update wishlist:', error);
    }
  };

  const discountPercentage = product.originalPrice && product.price < product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 5;

  return (
    <div 
      className={`group relative bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={ROUTES.PRODUCT_DETAIL(product.id)} className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          
          <img
            src={product.images[0] || '/images/placeholder-product.jpg'}
            alt={product.name}
            className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            loading="lazy"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {discountPercentage > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{discountPercentage}%
              </span>
            )}
            {isOutOfStock && (
              <span className="bg-gray-500 text-white text-xs font-bold px-2 py-1 rounded">
                Out of Stock
              </span>
            )}
            {isLowStock && !isOutOfStock && (
              <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                Low Stock
              </span>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            disabled={isWishlistLoading}
            className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ${
              isInWishlist(product.id)
                ? 'bg-red-500 text-white'
                : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'
            } ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart 
              className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} 
            />
          </button>

          {/* Quick Actions */}
          <div className={`absolute bottom-2 left-2 right-2 flex gap-2 transition-all duration-200 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}>
            <Button
              size="sm"
              variant="secondary"
              className="flex-1"
              leftIcon={<Eye className="w-4 h-4" />}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                // Quick view functionality
              }}
            >
              Quick View
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-wide">
            {product.category.name}
          </p>

          {/* Product Name */}
          <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, index: number) => (
                <Star
                  key={index}
                  className={`w-3 h-3 ${
                    index < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-1">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* Add to Cart Button */}
          <Button
            size="sm"
            className="w-full"
            disabled={isOutOfStock || isAddingToCart}
            loading={isAddingToCart}
            leftIcon={<ShoppingCart className="w-4 h-4" />}
            onClick={handleAddToCart}
          >
            {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </Link>
    </div>
  );
};