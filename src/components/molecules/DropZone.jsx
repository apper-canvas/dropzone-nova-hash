import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';

const DropZone = ({ onFilesDrop, disabled = false, className = '' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev + 1);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragCounter(prev => prev - 1);
    if (dragCounter <= 1) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setDragCounter(0);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFilesDrop(files);
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFilesDrop(files);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const openFileDialog = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        animate={{
          scale: isDragging ? 1.02 : 1,
          borderColor: isDragging ? '#6366F1' : '#CBD5E1'
        }}
        transition={{ duration: 0.2 }}
        className={`
          border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-200 cursor-pointer
          ${isDragging 
            ? 'border-primary bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg' 
            : 'border-surface-300 hover:border-primary/50 hover:bg-surface-50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={openFileDialog}
      >
        {/* Background gradient animation */}
        <AnimatePresence>
          {isDragging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 gradient-border animate-gradient-shift rounded-2xl"
              style={{ padding: '2px' }}
            >
              <div className="w-full h-full bg-white rounded-2xl" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative z-10">
          {/* Upload icon with animation */}
          <motion.div
            animate={{
              scale: isDragging ? 1.1 : 1,
              rotate: isDragging ? 5 : 0
            }}
            transition={{ duration: 0.2 }}
            className="mb-6"
          >
            <div className={`
              w-20 h-20 mx-auto rounded-full flex items-center justify-center
              ${isDragging 
                ? 'gradient-primary shadow-lg' 
                : 'bg-surface-100 group-hover:bg-primary/10'
              }
            `}>
              <ApperIcon 
                name={isDragging ? "Download" : "Upload"} 
                className={`w-8 h-8 transition-colors duration-200 ${
                  isDragging ? 'text-white' : 'text-surface-400'
                }`} 
              />
            </div>
          </motion.div>

          {/* Text content */}
          <div className="space-y-2">
            <h3 className="text-xl font-heading font-semibold text-surface-900">
              {isDragging ? 'Drop files here' : 'Drag & drop files'}
            </h3>
            <p className="text-surface-600">
              {isDragging 
                ? 'Release to upload your files' 
                : 'or click to browse from your device'
              }
            </p>
          </div>

          {/* Supported formats */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {['PDF', 'JPG', 'PNG', 'MP4', 'DOCX', 'XLSX'].map((format) => (
              <span 
                key={format}
                className="px-3 py-1 bg-surface-100 text-surface-600 text-xs rounded-full"
              >
                {format}
              </span>
            ))}
          </div>

          {/* Upload button */}
          <div className="mt-8">
            <Button
              variant="primary"
              size="lg"
              icon="Plus"
              disabled={disabled}
              onClick={(e) => {
                e.stopPropagation();
                openFileDialog();
              }}
            >
              Choose Files
            </Button>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept="*/*"
        />
      </motion.div>

      {/* Upload tips */}
      <div className="mt-6 text-center text-sm text-surface-500">
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <ApperIcon name="Shield" className="w-4 h-4 text-success" />
            <span>Secure upload</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="Zap" className="w-4 h-4 text-warning" />
            <span>Fast transfer</span>
          </div>
          <div className="flex items-center space-x-2">
            <ApperIcon name="HardDrive" className="w-4 h-4 text-info" />
            <span>Max 100MB per file</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropZone;