import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ConfettiEffect = ({ trigger, duration = 2000 }) => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (trigger) {
      const newParticles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        color: ['#6366F1', '#8B5CF6', '#EC4899', '#10B981', '#F59E0B'][Math.floor(Math.random() * 5)],
        size: Math.random() * 8 + 4,
        delay: Math.random() * 0.5
      }));
      
      setParticles(newParticles);
      
      const timer = setTimeout(() => {
        setParticles([]);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [trigger, duration]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 0,
              rotate: 0,
              opacity: 1
            }}
            animate={{
              y: particle.y + 200,
              scale: 1,
              rotate: 360,
              opacity: 0
            }}
            exit={{
              opacity: 0
            }}
            transition={{
              duration: 2,
              delay: particle.delay,
              ease: 'easeOut'
            }}
            className="absolute rounded-full"
            style={{
              backgroundColor: particle.color,
              width: particle.size,
              height: particle.size
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ConfettiEffect;