'use client';

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
	Search,
	Bell,
	ShoppingCart,
	User,
	ChevronLeft,
	ChevronDown,
	ChevronRight,
	Package,
	Tag,
	Plus,
	List,
	Menu,
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import ThemeToggle from './theme-toggle';

const AdminLayout = ({ children }) => {
	const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
	const [productsExpanded, setProductsExpanded] = useState(true);
	const [categoriesExpanded, setCategoriesExpanded] = useState(true);
	const location = useLocation();

	const isActive = (path) => location.pathname === path;

	return (
		<div className="flex h-screen bg-background">
			{/* Sidebar */}
			<div
				className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
					sidebarCollapsed ? 'w-16' : 'w-64'
				}`}
			>
				{/* Header */}
				<div className="flex items-center justify-between p-4 border-b border-sidebar-border">
					<div className="flex items-center gap-2">
						<button
							onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
							className="p-1 hover:bg-sidebar-accent rounded-md transition-colors"
						>
							{sidebarCollapsed ? (
								<Menu className="h-5 w-5 text-sidebar-foreground" />
							) : (
								<ChevronLeft className="h-5 w-5 text-sidebar-foreground" />
							)}
						</button>
						{!sidebarCollapsed && (
							<h1 className="font-semibold text-sidebar-foreground">
								E-Commerce
							</h1>
						)}
					</div>
				</div>

				{/* Navigation */}
				<nav className="p-4 space-y-2">
					{/* Products Section */}
					<div>
						<button
							onClick={() => {
								if (!sidebarCollapsed) {
									setProductsExpanded(!productsExpanded);
								}
							}}
							className="flex items-center justify-between w-full p-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded-md"
						>
							<div className="flex items-center gap-2">
								<Package className="h-4 w-4" />
								{!sidebarCollapsed && <span>Products</span>}
							</div>
							{!sidebarCollapsed &&
								(productsExpanded ? (
									<ChevronDown className="h-4 w-4" />
								) : (
									<ChevronRight className="h-4 w-4" />
								))}
						</button>

						{productsExpanded && !sidebarCollapsed && (
							<div className="ml-6 mt-1 space-y-1">
								<Link
									to="/products"
									className={`flex items-center gap-2 p-2 text-sm rounded-md transition-colors ${
										isActive('/products')
											? 'bg-sidebar-primary text-sidebar-primary-foreground'
											: 'text-sidebar-foreground hover:bg-sidebar-accent'
									}`}
								>
									<List className="h-4 w-4" />
									All Products
								</Link>
								<Link
									to="/products/create"
									className={`flex items-center gap-2 p-2 text-sm rounded-md transition-colors ${
										isActive('/products/create')
											? 'bg-sidebar-primary text-sidebar-primary-foreground'
											: 'text-sidebar-foreground hover:bg-sidebar-accent'
									}`}
								>
									<Plus className="h-4 w-4" />
									Create Product
								</Link>
							</div>
						)}
					</div>

					{/* Categories Section */}
					<div>
						<button
							onClick={() => {
								if (!sidebarCollapsed) {
									setCategoriesExpanded(!categoriesExpanded);
								}
							}}
							className="flex items-center justify-between w-full p-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded-md"
						>
							<div className="flex items-center gap-2">
								<Tag className="h-4 w-4" />
								{!sidebarCollapsed && <span>Categories</span>}
							</div>
							{!sidebarCollapsed &&
								(categoriesExpanded ? (
									<ChevronDown className="h-4 w-4" />
								) : (
									<ChevronRight className="h-4 w-4" />
								))}
						</button>

						{categoriesExpanded && !sidebarCollapsed && (
							<div className="ml-6 mt-1 space-y-1">
								<Link
									to="/categories"
									className={`flex items-center gap-2 p-2 text-sm rounded-md transition-colors ${
										isActive('/categories')
											? 'bg-sidebar-primary text-sidebar-primary-foreground'
											: 'text-sidebar-foreground hover:bg-sidebar-accent'
									}`}
								>
									<List className="h-4 w-4" />
									All Categories
								</Link>
								<Link
									to="/categories/create"
									className={`flex items-center gap-2 p-2 text-sm rounded-md transition-colors ${
										isActive('/categories/create')
											? 'bg-sidebar-primary text-sidebar-primary-foreground'
											: 'text-sidebar-foreground hover:bg-sidebar-accent'
									}`}
								>
									<Plus className="h-4 w-4" />
									Create Category
								</Link>
							</div>
						)}
					</div>

					{/* User Section */}
					<div className="pt-4">
						<button className="flex items-center justify-between w-full p-2 text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent rounded-md">
							<div className="flex items-center gap-2">
								<User className="h-4 w-4" />
								{!sidebarCollapsed && <span>User</span>}
							</div>
							{!sidebarCollapsed && <ChevronRight className="h-4 w-4" />}
						</button>
						{!sidebarCollapsed && (
							<div className="ml-6 mt-1 space-y-1">
								<Link
									to="/user/product"
									className={`flex items-center gap-2 p-2 text-sm rounded-md transition-colors ${
										isActive('/user-products')
											? 'bg-sidebar-primary text-sidebar-primary-foreground'
											: 'text-sidebar-foreground hover:bg-sidebar-accent'
									}`}
								>
									<List className="h-4 w-4" />
									User Products
								</Link>
							</div>
						)}
					</div>
				</nav>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col">
				{/* Top Header */}
				<header className="bg-background border-b border-border p-4">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-4 flex-1 max-w-md">
							<div className="relative flex-1">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									placeholder="Search products..."
									className="pl-10 bg-muted/50"
								/>
							</div>
						</div>

						<div className="flex items-center gap-2">
							<Button variant="ghost" size="icon">
								<Bell className="h-5 w-5" />
							</Button>
							<Button variant="ghost" size="icon">
								<ShoppingCart className="h-5 w-5" />
							</Button>
							<ThemeToggle />
							<Button variant="ghost" size="icon">
								<User className="h-5 w-5" />
							</Button>
						</div>
					</div>
				</header>

				{/* Page Content */}
				<main className="flex-1 overflow-auto p-6">{children}</main>
			</div>
		</div>
	);
};

export default AdminLayout;
