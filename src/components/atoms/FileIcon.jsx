import ApperIcon from '@/components/ApperIcon';

const FileIcon = ({ type, size = 'md', className = '' }) => {
  const getIconByType = (fileType) => {
    if (fileType.startsWith('image/')) return 'Image';
    if (fileType.startsWith('video/')) return 'Video';
    if (fileType.startsWith('audio/')) return 'Music';
    if (fileType.includes('pdf')) return 'FileText';
    if (fileType.includes('word') || fileType.includes('document')) return 'FileText';
    if (fileType.includes('sheet') || fileType.includes('excel')) return 'Sheet';
    if (fileType.includes('presentation') || fileType.includes('powerpoint')) return 'Presentation';
    if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('7z')) return 'Archive';
    if (fileType.includes('text/')) return 'FileText';
    return 'File';
  };

  const getColorByType = (fileType) => {
    if (fileType.startsWith('image/')) return 'text-success';
    if (fileType.startsWith('video/')) return 'text-accent';
    if (fileType.startsWith('audio/')) return 'text-secondary';
    if (fileType.includes('pdf')) return 'text-error';
    if (fileType.includes('word') || fileType.includes('document')) return 'text-info';
    if (fileType.includes('sheet') || fileType.includes('excel')) return 'text-success';
    if (fileType.includes('presentation') || fileType.includes('powerpoint')) return 'text-warning';
    if (fileType.includes('zip') || fileType.includes('rar') || fileType.includes('7z')) return 'text-secondary';
    return 'text-surface-500';
  };

  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
    '2xl': 'w-12 h-12'
  };

  const iconName = getIconByType(type);
  const colorClass = getColorByType(type);

  return (
    <ApperIcon 
      name={iconName} 
      className={`${sizes[size]} ${colorClass} ${className}`} 
    />
  );
};

export default FileIcon;