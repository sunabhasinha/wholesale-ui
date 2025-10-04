import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Button } from '../ui/button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="text-center space-y-4 p-8">
            <div className="flex justify-center">
              <div className="rounded-full bg-red-100 p-3">
                <AlertTriangle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">
                Something went wrong
              </h3>
              <p className="text-gray-500 max-w-sm">
                We encountered an error while loading this content. Please try refreshing the page.
              </p>
            </div>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4"
            >
              Refresh Page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };