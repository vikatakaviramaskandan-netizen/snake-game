import { motion } from 'motion/react';

interface VisualizerProps {
  isPlaying: boolean;
  color: string;
}

export default function Visualizer({ isPlaying, color }: VisualizerProps) {
  return (
    <div className="flex items-end gap-1 h-8 px-2" id="visualizer">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          animate={isPlaying ? {
            height: [
              '20%', 
              `${Math.random() * 80 + 20}%`, 
              '40%', 
              `${Math.random() * 80 + 20}%`, 
              '20%'
            ]
          } : {
            height: '10%'
          }}
          transition={{
            duration: 0.5 + Math.random() * 0.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="w-1.5 rounded-full bg-gradient-to-t from-neon-cyan to-neon-pink"
          style={{ opacity: 0.8 }}
        />
      ))}
    </div>
  );
}
