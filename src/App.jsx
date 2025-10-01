import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
    useLocation,
} from 'react-router-dom';
import React, { useState, useEffect } from "react";

import { ThemeProvider } from './components/theme-provider';
import AdminLayout from './components/admin-layout';
import CategoriesPage from './components/categories-page';
import CreateCategoryPage from './components/create-category-page';
import ProductsPage from './components/products-page';
import CreateProductPage from './components/create-product-page';
import UserProductsPage from './components/user-products';
import Login, { STATIC_USER, STATIC_PASS }  from './components/auth/login';
import ProductDetailPage from './pages/product/product';

function ProtectedRoute({ isLoggedIn, children }) {
    const location = useLocation();
    if (!isLoggedIn) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(
        () => localStorage.getItem('isLoggedIn') === 'true'
    );

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (localStorage.getItem('isLoggedIn') === 'true' && token) {
            const [username, password] = atob(token).split(':');
            if (username === STATIC_USER && password === STATIC_PASS) {
                setIsLoggedIn(true);
            }
        }
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
        >
            <Router>
                <Routes>
                    <Route
                        path="/login"
                        element={
                            isLoggedIn ? (
                                <Navigate to="/user/product" replace />
                            ) : (
                                <Login onLogin={handleLogin} />
                            )
                        }
                    />
                    <Route
                        path="/*"
                        element={
                            <ProtectedRoute isLoggedIn={isLoggedIn}>
                                <AdminLayout>
                                    <Routes>
                                        <Route path="/" element={<Navigate to="/user/product" replace />} />
                                        <Route path="/categories" element={<CategoriesPage />} />
                                        <Route path="/categories/create" element={<CreateCategoryPage />} />
                                        <Route path="/products" element={<ProductsPage />} />
                                        <Route path="/products/create" element={<CreateProductPage />} />
                                        <Route path="/user/product" element={<UserProductsPage />} />
                                        <Route path="/product/:productId" element={<ProductDetailPage />} />
                                    </Routes>
                                </AdminLayout>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;