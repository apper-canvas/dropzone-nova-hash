import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import UploadSection from '@/components/organisms/UploadSection';
import StatsSection from '@/components/organisms/StatsSection';
import { uploadFileService } from '@/services';

const Home = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFiles = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await uploadFileService.getAll();
        setFiles(result);
      } catch (err) {
        setError(err.message || 'Failed to load files');
        toast.error('Failed to load files');
      } finally {
        setLoading(false);
      }
    };

    loadFiles();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-10 bg-surface-200 rounded-lg w-80 mx-auto mb-4"></div>
              <div className="h-6 bg-surface-200 rounded-lg w-96 mx-auto"></div>
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card rounded-xl p-6"
              >
                <div className="animate-pulse">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="h-4 bg-surface-200 rounded w-24 mb-2"></div>
                      <div className="h-8 bg-surface-200 rounded w-16"></div>
                    </div>
                    <div className="w-12 h-12 bg-surface-200 rounded-lg"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Drop Zone Skeleton */}
          <div className="border-2 border-dashed border-surface-300 rounded-2xl p-12 text-center">
            <div className="animate-pulse">
              <div className="w-20 h-20 bg-surface-200 rounded-full mx-auto mb-6"></div>
              <div className="h-6 bg-surface-200 rounded w-64 mx-auto mb-2"></div>
              <div className="h-4 bg-surface-200 rounded w-48 mx-auto mb-6"></div>
              <div className="h-12 bg-surface-200 rounded-lg w-32 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
              >
                <ApperIcon name="AlertTriangle" className="w-8 h-8 text-white" />
              </motion.div>
            </div>
            <h3 className="text-xl font-heading font-semibold text-surface-900 mb-2">
              Unable to Load Files
            </h3>
            <p className="text-surface-600 mb-6">{error}</p>
            <Button
              variant="primary"
              icon="RefreshCw"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 max-w-full overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="relative">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-surface-900 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Drop, Upload,{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Share
              </span>
            </motion.h1>
            
            <motion.p
              className="text-xl text-surface-600 max-w-2xl mx-auto mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Upload your files with drag-and-drop simplicity. 
              Get shareable links instantly and manage your uploads effortlessly.
            </motion.p>

            {/* Floating gradient orbs */}
            <div className="absolute inset-0 -z-10">
              <motion.div
                className="absolute top-0 left-1/4 w-32 h-32 gradient-primary rounded-full opacity-10 blur-xl"
                animate={{
                  y: [0, -20, 0],
                  x: [0, 10, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute top-10 right-1/4 w-24 h-24 gradient-secondary rounded-full opacity-10 blur-xl"
                animate={{
                  y: [0, 15, 0],
                  x: [0, -15, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
              />
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <StatsSection files={files} />
        </motion.div>

        {/* Upload Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <UploadSection
            files={files}
            onFilesUpdate={setFiles}
            uploading={uploading}
            onUploadingChange={setUploading}
          />
        </motion.div>

        {/* Features Section */}
        {files.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: 'Zap',
                title: 'Lightning Fast',
                description: 'Upload multiple files simultaneously with our optimized transfer technology.',
                gradient: 'gradient-primary'
              },
              {
                icon: 'Shield',
                title: 'Secure & Private',
                description: 'Your files are encrypted during transfer and stored with bank-level security.',
                gradient: 'gradient-secondary'
              },
              {
                icon: 'Share',
                title: 'Easy Sharing',
                description: 'Generate shareable links instantly and control access to your uploaded files.',
                gradient: 'gradient-accent'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2 }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-xl p-6 text-center hover:shadow-lg transition-all duration-200"
              >
                <div className={`w-16 h-16 ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <ApperIcon name={feature.icon} className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-surface-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-surface-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;