import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ErrorBoundary } from "./components/common/ErrorBoundary";
import { Header } from "./components/layout/Header";
import { CartDrawer } from "./components/cart/CartDrawer";
import { HomePage } from "./pages/HomePage";
import { SearchPage } from "./pages/SearchPage";
import { ProductPage } from "./pages/ProductPage";
import { CategoryPage } from "./pages/CategoryPage";

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <div className="App min-h-screen bg-white">
            <BrowserRouter>
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/product/:productId" element={<ProductPage />} />
                  <Route path="/category/:categorySlug" element={<CategoryPage />} />
                  <Route path="/category/:categorySlug/:subcategorySlug" element={<CategoryPage />} />
                  
                  {/* Fallback route */}
                  <Route path="*" element={
                    <div className="container mx-auto px-4 py-16 text-center">
                      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
                      <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
                      <a href="/" className="text-blue-600 hover:underline">Go back to homepage</a>
                    </div>
                  } />
                </Routes>
              </main>
              <CartDrawer />
            </BrowserRouter>
          </div>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
