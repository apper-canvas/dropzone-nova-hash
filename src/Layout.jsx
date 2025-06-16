import { Outlet } from 'react-router-dom';
import ApperIcon from '@/components/ApperIcon';

const Layout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-surface-50 via-white to-surface-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-surface-200 sticky top-0 z-30">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
                <ApperIcon name="Upload" className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-heading font-bold text-surface-900">DropZone</h1>
                <p className="text-xs text-surface-500">File Upload Made Simple</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6 text-sm text-surface-600">
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Shield" className="w-4 h-4 text-success" />
                  <span>Secure Upload</span>
                </div>
                <div className="flex items-center space-x-2">
                  <ApperIcon name="Zap" className="w-4 h-4 text-warning" />
                  <span>Fast Transfer</span>
                </div>
              </div>
              
              <button className="flex items-center space-x-2 px-4 py-2 gradient-primary text-white rounded-lg hover:scale-105 transition-transform duration-200 hover-glow">
                <ApperIcon name="Crown" className="w-4 h-4" />
                <span className="hidden sm:inline">Premium</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-surface-900 text-surface-300 py-8 mt-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <ApperIcon name="Upload" className="w-4 h-4 text-white" />
              </div>
              <span className="font-heading font-semibold">DropZone</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <span className="flex items-center space-x-2">
                <ApperIcon name="Lock" className="w-4 h-4" />
                <span>256-bit SSL Encryption</span>
              </span>
              <span className="flex items-center space-x-2">
                <ApperIcon name="Clock" className="w-4 h-4" />
                <span>99.9% Uptime</span>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;