// import React, { useState } from 'react';
// import Header from './components/Header';
// import Hero from './components/Hero';
// import FeaturedDeals from './components/FeaturedDeals';
// import Categories from './components/Categories';
// import Testimonials from './components/Testimonials';
// import Newsletter from './components/Newsletter';
// import Footer from './components/Footer';
// import CategoryPage from './components/CategoryPage';
// import ProductDetail from './components/ProductDetail';
// import Cart from './components/Cart';
// import Checkout from './components/Checkout';
// import UserAccount from './components/UserAccount';
// import Login from './components/Login';
// import { CartProvider } from './context/CartContext';

// export type View = 'home' | 'category' | 'product' | 'cart' | 'checkout' | 'account' | 'login';

// function App() {
//   const [currentView, setCurrentView] = useState<View>('home');
//   const [selectedCategory, setSelectedCategory] = useState<string>('');
//   const [selectedProduct, setSelectedProduct] = useState<any>(null);

//   const navigateToCategory = (category: string) => {
//     setSelectedCategory(category);
//     setCurrentView('category');
//   };

//   const navigateToProduct = (product: any) => {
//     setSelectedProduct(product);
//     setCurrentView('product');
//   };

//   const renderCurrentView = () => {
//     switch (currentView) {
//       case 'category':
//         return <CategoryPage category={selectedCategory} onProductClick={navigateToProduct} />;
//       case 'product':
//         return <ProductDetail product={selectedProduct} onBack={() => setCurrentView('category')} />;
//       case 'cart':
//         return <Cart onCheckout={() => setCurrentView('checkout')} />;
//       case 'checkout':
//         return <Checkout onBack={() => setCurrentView('cart')} />;
//       case 'account':
//         return <UserAccount />;
//       case 'login':
//         return <Login onBack={() => setCurrentView('home')} />;
//       default:
//         return (
//           <>
//             <Hero />
//             <FeaturedDeals onProductClick={navigateToProduct} />
//             <Categories onCategoryClick={navigateToCategory} />
//             <Testimonials />
//             <Newsletter />
//           </>
//         );
//     }
//   };

//   return (
//     <CartProvider>
//       <div className="min-h-screen bg-gray-50">
//         <Header 
//           onNavigate={setCurrentView} 
//           onCategoryClick={navigateToCategory}
//         />
//         {renderCurrentView()}
//         <Footer />
//       </div>
//     </CartProvider>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedDeals from './components/FeaturedDeals';
import Categories from './components/Categories';
import Testimonials from './components/Testimonials';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import CategoryPage from './components/CategoryPage';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import UserAccount from './components/UserAccount';
import Login from './components/Login';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <FeaturedDeals />
                  <Categories />
                  <Testimonials />
                  <Newsletter />
                </>
              }
            />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/product/:productId" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account" element={<UserAccount />} />
            <Route path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;