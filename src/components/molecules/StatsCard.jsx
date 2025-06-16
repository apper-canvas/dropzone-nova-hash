import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  trend, 
  trendValue, 
  color = 'primary',
  className = '' 
}) => {
  const colors = {
    primary: 'gradient-primary',
    secondary: 'gradient-secondary',
    accent: 'gradient-accent',
    success: 'gradient-success'
  };

  const iconColors = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    accent: 'text-accent',
    success: 'text-success'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={`glass-card rounded-xl p-6 hover:shadow-lg transition-all duration-200 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-surface-600 text-sm font-medium mb-1">{title}</p>
          <div className="flex items-baseline space-x-2">
            <span className="text-2xl font-bold text-surface-900">{value}</span>
            {trend && (
              <div className={`flex items-center space-x-1 text-sm ${
                trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-surface-500'
              }`}>
                <ApperIcon 
                  name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} 
                  className="w-4 h-4" 
                />
                <span>{trendValue}</span>
              </div>
            )}
          </div>
        </div>
        
        <div className={`w-12 h-12 rounded-lg ${colors[color]} flex items-center justify-center`}>
          <ApperIcon name={icon} className="w-6 h-6 text-white" />
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;