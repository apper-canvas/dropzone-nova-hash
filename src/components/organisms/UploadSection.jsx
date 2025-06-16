import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import DropZone from '@/components/molecules/DropZone';
import UploadCard from '@/components/molecules/UploadCard';
import ConfettiEffect from '@/components/molecules/ConfettiEffect';
import { uploadFileService, shareLinkService } from '@/services';

const UploadSection = ({ 
  files, 
  onFilesUpdate, 
  uploading = false, 
  onUploadingChange 
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState([]);

  const validateFile = (file) => {
    const maxSize = 100 * 1024 * 1024; // 100MB
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/webm', 'video/quicktime',
      'audio/mpeg', 'audio/wav', 'audio/ogg',
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain', 'text/csv',
      'application/zip', 'application/x-rar-compressed'
    ];

    if (file.size > maxSize) {
      return `File "${file.name}" is too large. Maximum size is 100MB.`;
    }

    if (!allowedTypes.includes(file.type) && file.type !== '') {
      return `File type "${file.type}" is not supported.`;
    }

    return null;
  };

  const handleFilesDrop = useCallback(async (droppedFiles) => {
    // Validate files
    const validationErrors = [];
    const validFiles = [];

    droppedFiles.forEach(file => {
      const error = validateFile(file);
      if (error) {
        validationErrors.push(error);
      } else {
        validFiles.push(file);
      }
    });

    // Show validation errors
    if (validationErrors.length > 0) {
      validationErrors.forEach(error => toast.error(error));
    }

    if (validFiles.length === 0) return;

    // Start uploading valid files
    onUploadingChange(true);
    setUploadingFiles(validFiles.map(f => f.name));

    try {
      const uploadPromises = validFiles.map(async (file) => {
        let uploadProgress = 0;
        
        const uploadedFile = await uploadFileService.simulateUpload(file, (progress) => {
          uploadProgress = progress;
          // Update the files list with progress
          onFilesUpdate(prev => {
            const updated = [...prev];
            const index = updated.findIndex(f => f.name === file.name && f.status === 'uploading');
            if (index !== -1) {
              updated[index] = { ...updated[index], uploadProgress: progress };
            }
            return updated;
          });
        });

        return uploadedFile;
      });

      const completedFiles = await Promise.all(uploadPromises);
      
      // Show success message and confetti
      toast.success(`Successfully uploaded ${completedFiles.length} file(s)!`);
      setShowConfetti(true);
      
      // Update files list
      onFilesUpdate(prev => {
        const updated = [...prev];
        completedFiles.forEach(completedFile => {
          const index = updated.findIndex(f => f.Id === completedFile.Id);
          if (index !== -1) {
            updated[index] = completedFile;
          } else {
            updated.push(completedFile);
          }
        });
        return updated;
      });

    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('Upload failed. Please try again.');
    } finally {
      onUploadingChange(false);
      setUploadingFiles([]);
      
      // Hide confetti after animation
      setTimeout(() => setShowConfetti(false), 3000);
    }
  }, [onFilesUpdate, onUploadingChange]);

  const handleCopyLink = async (file) => {
    try {
      const shareLink = await shareLinkService.generateShareLink(file.Id);
      await navigator.clipboard.writeText(shareLink.shortUrl);
      toast.success('Link copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy link:', error);
      toast.error('Failed to copy link. Please try again.');
    }
  };

  const handleDeleteFile = async (file) => {
    try {
      await uploadFileService.delete(file.Id);
      onFilesUpdate(prev => prev.filter(f => f.Id !== file.Id));
      toast.success('File deleted successfully');
    } catch (error) {
      console.error('Failed to delete file:', error);
      toast.error('Failed to delete file. Please try again.');
    }
  };

  const handleRetryUpload = async (file) => {
    // This would typically re-trigger the upload process
    toast.info('Retry functionality would be implemented here');
  };

  const activeUploads = files.filter(file => file.status === 'uploading');
  const completedFiles = files.filter(file => file.status === 'completed');

  return (
    <div className="max-w-full overflow-hidden">
      {/* Drop Zone */}
      <DropZone 
        onFilesDrop={handleFilesDrop}
        disabled={uploading}
        className="mb-8"
      />

      {/* Active Uploads */}
      <AnimatePresence>
        {activeUploads.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <h3 className="text-lg font-heading font-semibold text-surface-900 mb-4 flex items-center space-x-2">
              <span>Uploading Files</span>
              <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </h3>
            
            <div className="space-y-4">
              {activeUploads.map((file) => (
                <UploadCard
                  key={file.Id}
                  file={file}
                  onCopyLink={handleCopyLink}
                  onDelete={handleDeleteFile}
                  onRetry={handleRetryUpload}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completed Files */}
      <AnimatePresence>
        {completedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-heading font-semibold text-surface-900 flex items-center space-x-2">
              <span>Your Files</span>
              <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                {completedFiles.length}
              </span>
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              <AnimatePresence>
                {completedFiles.map((file, index) => (
                  <motion.div
                    key={file.Id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <UploadCard
                      file={file}
                      onCopyLink={handleCopyLink}
                      onDelete={handleDeleteFile}
                      onRetry={handleRetryUpload}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti Effect */}
      <ConfettiEffect trigger={showConfetti} />
    </div>
  );
};

export default UploadSection;