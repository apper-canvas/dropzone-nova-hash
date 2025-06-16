import { motion } from 'framer-motion';

const ProgressBar = ({ 
  progress = 0, 
  variant = 'primary',
  size = 'md',
  animated = false,
  showPercentage = false,
  className = '' 
}) => {
  const variants = {
    primary: 'gradient-primary',
    secondary: 'gradient-secondary',
    accent: 'gradient-accent',
    success: 'gradient-success'
  };
  
  const sizes = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4'
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className={`w-full bg-surface-200 rounded-full overflow-hidden ${sizes[size]}`}>
        <motion.div
          className={`${variants[variant]} ${sizes[size]} rounded-full relative overflow-hidden ${
            animated ? 'progress-stripes animate-stripe' : ''
          }`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
      
      {showPercentage && (
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 text-xs font-medium text-surface-600 ml-2">
          {Math.round(progress)}%
        </div>
      )}
    </div>
  );
};

export default ProgressBar;