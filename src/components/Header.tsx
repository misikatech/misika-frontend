import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search, Heart, LogOut, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ROUTES, CATEGORIES } from '../constants';
import { Button } from './ui/Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate(ROUTES.HOME);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const cartItemsCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to={ROUTES.HOME} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Misika</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to={ROUTES.HOME} className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Home
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors font-medium"
                onMouseEnter={() => setIsCategoryOpen(true)}
                onMouseLeave={() => setIsCategoryOpen(false)}
              >
                <span>Categories</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {/* Category Dropdown Menu */}
              {isCategoryOpen && (
                <div
                  className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                  onMouseEnter={() => setIsCategoryOpen(true)}
                  onMouseLeave={() => setIsCategoryOpen(false)}
                >
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Shop by Category</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {CATEGORIES.map((category) => (
                        <Link
                          key={category.id}
                          to={`${ROUTES.PRODUCTS}?category=${category.slug}`}
                          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-2xl">{category.icon}</span>
                          <div>
                            <div className="font-medium text-gray-900">{category.name}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            {isAuthenticated && (
              <Link to={ROUTES.WISHLIST} className="p-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Heart className="w-5 h-5" />
              </Link>
            )}

            {/* Cart */}
            <Link to={ROUTES.CART} className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>

            {/* Auth Buttons */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <div className="relative group">
                  <button className="flex items-center space-x-2 p-2 text-gray-700 hover:text-blue-600 transition-colors">
                    <User className="w-5 h-5" />
                    <span className="text-sm font-medium">{user?.username}</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      <Link
                        to={ROUTES.PROFILE}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link
                        to={ROUTES.ORDERS}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <LogOut className="w-4 h-4 inline mr-2" />
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to={ROUTES.LOGIN}>
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-600 hover:text-blue-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                to={ROUTES.HOME}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              
              {/* Mobile Categories */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Categories</h3>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES.map((category) => (
                    <Link
                      key={category.id}
                      to={`${ROUTES.PRODUCTS}?category=${category.slug}`}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="text-xl">{category.icon}</span>
                      <span className="text-sm">{category.name}</span>
                    </Link>
                  ))}
                </div>
              </div>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to={ROUTES.PROFILE}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    to={ROUTES.ORDERS}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Orders
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                  <Link
                    to={ROUTES.LOGIN}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="ghost" className="w-full justify-start">
                      Sign In
                    </Button>
                  </Link>
                  <Link
                    to={ROUTES.REGISTER}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
