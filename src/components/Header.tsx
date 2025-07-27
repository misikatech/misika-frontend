// import React, { useState } from 'react';
// import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
// import { View } from '../App';

// interface HeaderProps {
//   onNavigate: (view: View) => void;
//   onCategoryClick: (category: string) => void;
// }

// const Header: React.FC<HeaderProps> = ({ onNavigate, onCategoryClick }) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const categories = ['Grocery', 'Garments', 'Bags', 'Home Textile'];

//   return (
//     <header className="bg-white shadow-md sticky top-0 z-50">
//       {/* Top Header */}
//       <div className="bg-indigo-600 text-white py-2">
//         <div className="container mx-auto px-4 text-center text-sm">
//           Free shipping on orders over $50 | 24/7 Customer Support
//         </div>
//       </div>

//       {/* Main Header */}
//       <div className="container mx-auto px-4 py-4">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center cursor-pointer" onClick={() => onNavigate('home')}>
//             <div className="text-2xl font-bold text-indigo-600">Mishika.co</div>
//             <div className="ml-16 mt-2 text-lg text-gray-600 hidden font-semibold sm:block">All Under One Roof</div>
//           </div>

//           {/* Search Bar - Desktop */}
//           <div className="hidden md:flex flex-1 max-w-2xl mx-8">
//             <div className="relative w-full">
//               <input
//                 type="text"
//                 placeholder="Search for products..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//               />

//             </div>
//           </div>

//           {/* Action Buttons */}
//           <div className="flex items-center space-x-4">
//             <button 
//               onClick={() => onNavigate('cart')}
//               className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <ShoppingCart size={24} className="text-gray-700" />
//               <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                 3
//               </span>
//             </button>
//             <button 
//               onClick={() => onNavigate('login')}
//               className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <User size={24} className="text-gray-700" />
//             </button>
//             <button 
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>

//         {/* Search Bar - Mobile */}
//         <div className="md:hidden mt-4">
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search for products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
//             />
//             <button className="absolute right-0 top-0 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-lg transition-colors">
//               <Search size={20} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className={`bg-gray-50 border-t ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row md:items-center md:space-x-8 py-2">
//             <button 
//               onClick={() => onNavigate('home')}
//               className="py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium transition-colors"
//             >
//               Home
//             </button>
//             <div className="relative group">
//               <button className="py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium transition-colors">
//                 Categories
//               </button>
//               <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
//                 {categories.map((category) => (
//                   <button
//                     key={category}
//                     onClick={() => onCategoryClick(category)}
//                     className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
//                   >
//                     {category}
//                   </button>
//                 ))}
//               </div>
//             </div>
//             <button className="py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium transition-colors">
//               Offers
//             </button>
//             <button className="py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium transition-colors">
//               Contact
//             </button>
//             <button 
//               onClick={() => onNavigate('login')}
//               className="py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium transition-colors"
//             >
//               Business Policy
//             </button>
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// };

// export default Header;

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const categories = ['Grocery', 'Garments', 'Bags', 'Home Textile'];

  const handleCategoryClick = (category) => {
    navigate(`/category/${category.toLowerCase()}`);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      {/* Top Header */}
      <div className="bg-indigo-600 text-white py-2">
        <div className="container mx-auto px-4 text-center text-sm">
          Free shipping on orders over $50 | 24/7 Customer Support
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-indigo-600">Mishika.co</div>
            <div className="ml-16 mt-2 text-lg text-gray-600 hidden font-semibold sm:block">All Under One Roof</div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/cart')}
              className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ShoppingCart size={24} className="text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </button>
            <button 
              onClick={() => navigate('/login')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <User size={24} className="text-gray-700" />
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="absolute right-0 top-0 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-lg transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className={`bg-gray-50 border-t ${isMenuOpen ? 'block' : 'hidden md:block'}`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-8 py-2">
            <Link 
              to="/"
              className="py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              Home
            </Link>
            <div className="relative group">
              <button className="py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium transition-colors">
                Categories
              </button>
              <div className="absolute top-full left-0 bg-white shadow-lg rounded-lg py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            <Link 
              to="/offers"
              className="py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              Offers
            </Link>
            <Link 
              to="/contact"
              className="py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              Contact
            </Link>
            <Link 
              to="/login"
              className="py-2 px-4 text-gray-700 hover:text-indigo-600 font-medium transition-colors"
            >
              Business Policy
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;