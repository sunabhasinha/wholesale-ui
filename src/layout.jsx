import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import { ThemeProvider } from '@/components/theme-provider';
import { AppProvider } from '@/lib/store';
import './globals.css';

export const metadata = {
	title: 'E-Commerce Admin',
	description: 'E-Commerce Admin Dashboard',
	generator: 'v0.app',
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<head>
				<style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
			</head>
			<body>
				<ThemeProvider
					attribute="class"
					defaultTheme="light"
					enableSystem
					disableTransitionOnChange
				>
					<AppProvider>{children}</AppProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
