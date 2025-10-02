import { cn } from '@/utils/helpers';
import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className,
  hover = false,
  padding = 'default',
  ...props 
}) => {
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8',
  };

  const baseStyles = 'bg-white rounded-lg shadow-md';
  const hoverStyles = hover ? 'hover:shadow-lg transition-shadow duration-200 cursor-pointer' : '';

  const Component = hover ? motion.div : 'div';
  const motionProps = hover ? { whileHover: { y: -2 } } : {};

  return (
    <Component
      className={cn(baseStyles, hoverStyles, paddingStyles[padding], className)}
      {...motionProps}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
