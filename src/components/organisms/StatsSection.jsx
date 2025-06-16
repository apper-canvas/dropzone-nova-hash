import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatsCard from '@/components/molecules/StatsCard';

const StatsSection = ({ files = [] }) => {
  const [stats, setStats] = useState({
    totalFiles: 0,
    totalSize: 0,
    uploadsToday: 0,
    successRate: 100
  });

  useEffect(() => {
    const calculateStats = () => {
      const totalFiles = files.length;
      const totalSize = files.reduce((sum, file) => sum + file.size, 0);
      const today = new Date().toDateString();
      const uploadsToday = files.filter(file => 
        new Date(file.uploadedAt).toDateString() === today
      ).length;
      
      const completedFiles = files.filter(file => file.status === 'completed').length;
      const successRate = totalFiles > 0 ? Math.round((completedFiles / totalFiles) * 100) : 100;

      setStats({
        totalFiles,
        totalSize,
        uploadsToday,
        successRate
      });
    };

    calculateStats();
  }, [files]);

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const statsData = [
    {
      title: 'Total Files',
      value: stats.totalFiles.toLocaleString(),
      icon: 'Files',
      color: 'primary',
      trend: stats.totalFiles > 0 ? 'up' : null,
      trendValue: '+' + stats.uploadsToday
    },
    {
      title: 'Storage Used',
      value: formatBytes(stats.totalSize),
      icon: 'HardDrive',
      color: 'secondary',
      trend: stats.totalSize > 0 ? 'up' : null,
      trendValue: formatBytes(stats.totalSize)
    },
    {
      title: 'Uploads Today',
      value: stats.uploadsToday.toLocaleString(),
      icon: 'Upload',
      color: 'accent',
      trend: stats.uploadsToday > 0 ? 'up' : null,
      trendValue: stats.uploadsToday > 0 ? `+${stats.uploadsToday}` : '0'
    },
    {
      title: 'Success Rate',
      value: `${stats.successRate}%`,
      icon: 'CheckCircle',
      color: 'success',
      trend: stats.successRate >= 95 ? 'up' : stats.successRate >= 80 ? null : 'down',
      trendValue: `${stats.successRate}%`
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <StatsCard {...stat} />
        </motion.div>
      ))}
    </div>
  );
};

export default StatsSection;