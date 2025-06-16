import { motion } from 'framer-motion';
import { formatDistance } from 'date-fns';
import ApperIcon from '@/components/ApperIcon';
import Button from '@/components/atoms/Button';
import ProgressBar from '@/components/atoms/ProgressBar';
import FileIcon from '@/components/atoms/FileIcon';

const UploadCard = ({ 
  file, 
  onCopyLink, 
  onDelete, 
  onRetry,
  className = '' 
}) => {
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'uploading': return 'text-info';
      case 'error': return 'text-error';
      default: return 'text-surface-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'uploading': return 'Loader2';
      case 'error': return 'AlertCircle';
      default: return 'Clock';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`glass-card rounded-xl p-6 hover:shadow-lg transition-all duration-200 ${className}`}
    >
      <div className="flex items-start space-x-4">
        {/* File Icon/Thumbnail */}
        <div className="flex-shrink-0">
          {file.thumbnailUrl ? (
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface-100">
              <img 
                src={file.thumbnailUrl} 
                alt={file.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="w-full h-full bg-surface-100 rounded-lg flex items-center justify-center hidden">
                <FileIcon type={file.type} size="lg" />
              </div>
            </div>
          ) : (
            <div className="w-12 h-12 bg-surface-100 rounded-lg flex items-center justify-center">
              <FileIcon type={file.type} size="lg" />
            </div>
          )}
        </div>

        {/* File Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-medium text-surface-900 truncate pr-2" title={file.name}>
              {file.name}
            </h3>
            
            <motion.div
              className={`flex items-center space-x-1 ${getStatusColor(file.status)}`}
              animate={file.status === 'uploading' ? { rotate: 360 } : {}}
              transition={file.status === 'uploading' ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
            >
              <ApperIcon 
                name={getStatusIcon(file.status)} 
                className="w-4 h-4" 
              />
              <span className="text-xs font-medium capitalize">
                {file.status}
              </span>
            </motion.div>
          </div>

          <div className="flex items-center justify-between text-sm text-surface-600 mb-3">
            <span>{formatFileSize(file.size)}</span>
            {file.uploadedAt && (
              <span>{formatDistance(new Date(file.uploadedAt), new Date(), { addSuffix: true })}</span>
            )}
          </div>

          {/* Progress Bar */}
          {file.status === 'uploading' && (
            <div className="mb-4">
              <ProgressBar 
                progress={file.uploadProgress || 0}
                variant="primary"
                size="sm"
                animated={true}
                showPercentage={true}
              />
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center space-x-2">
            {file.status === 'completed' && (
              <>
                <Button
                  variant="primary"
                  size="sm"
                  icon="Copy"
                  onClick={() => onCopyLink(file)}
                >
                  Copy Link
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  icon="ExternalLink"
                  onClick={() => window.open(file.url, '_blank')}
                >
                  Open
                </Button>
              </>
            )}
            
            {file.status === 'error' && (
              <Button
                variant="accent"
                size="sm"
                icon="RefreshCw"
                onClick={() => onRetry(file)}
              >
                Retry
              </Button>
            )}

            <Button
              variant="ghost"
              size="sm"
              icon="Trash2"
              onClick={() => onDelete(file)}
              className="ml-auto text-error hover:bg-error/10"
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default UploadCard;