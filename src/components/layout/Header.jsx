import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '../ui/dropdown-menu';
import { 
  Search, 
  ShoppingBag, 
  User, 
  Menu,
  LogOut,
  Heart
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { AuthModal } from '../auth/AuthModal';
import { categories } from '../../data/mockData';

export const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { getTotalItems, openCart } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header className="border-b bg-white sticky top-0 z-40">
        {/* Sale Banner */}
        <div className="bg-black text-white text-center py-2 px-4">
          <p className="text-sm">
            Sale 50% OFF{' '}
            <Link to="/search" className="underline hover:no-underline">
              Shop Now
            </Link>
          </p>
        </div>

        {/* Main Header */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-gray-900">
              Enterprise Commerce
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {categories.map((category) => (
                <DropdownMenu key={category.id}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-gray-700 hover:text-gray-900">
                      {category.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link 
                        to={`/category/${category.slug}`}
                        className="w-full cursor-pointer"
                      >
                        All {category.name}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {category.subcategories?.map((sub) => (
                      <DropdownMenuItem key={sub.id} asChild>
                        <Link 
                          to={`/category/${category.slug}/${sub.slug}`}
                          className="w-full cursor-pointer"
                        >
                          {sub.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ))}
            </nav>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              </div>
            </form>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Mobile Search */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => navigate('/search')}
                data-testid="mobile-search-btn"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Cart */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={openCart}
                data-testid="cart-btn"
              >
                <ShoppingBag className="h-5 w-5" />
                {getTotalItems() > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>

              {/* User Menu */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" data-testid="user-menu-btn">
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="h-8 w-8 rounded-full"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-3 py-2 border-b">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <DropdownMenuItem>
                      <Heart className="mr-2 h-4 w-4" />
                      Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button 
                  variant="outline"
                  onClick={() => setShowAuthModal(true)}
                  className="hidden md:flex"
                  data-testid="login-btn"
                >
                  <User className="mr-2 h-4 w-4" />
                  Login
                </Button>
              )}

              {/* Mobile Menu */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="mobile-menu-btn"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 border-t">
              <div className="space-y-4 pt-4">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="md:hidden">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  </div>
                </form>

                {/* Mobile Auth */}
                {!isAuthenticated && (
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setShowAuthModal(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Login
                  </Button>
                )}

                {/* Mobile Navigation */}
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category.id}>
                      <Link
                        to={`/category/${category.slug}`}
                        className="block py-2 text-sm font-medium text-gray-900 hover:text-gray-600"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                      {category.subcategories && (
                        <div className="ml-4 space-y-1">
                          {category.subcategories.map((sub) => (
                            <Link
                              key={sub.id}
                              to={`/category/${category.slug}/${sub.slug}`}
                              className="block py-1 text-sm text-gray-600 hover:text-gray-900"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
      />
    </>
  );
};