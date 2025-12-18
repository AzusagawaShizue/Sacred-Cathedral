import { Bell, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface TopNavProps {
  onInfoClick?: () => void;
}

export function TopNav({ onInfoClick }: TopNavProps) {
  return (
    <motion.div
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-gold shadow-lg"
      style={{
        borderBottom: '1px solid rgba(238, 220, 179, 0.3)',
      }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left - Logo & Title */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#295EE7] via-[#1E2A5A] to-[#295EE7] flex items-center justify-center shadow-xl relative overflow-hidden"
          >
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <span className="text-2xl relative z-10">⛪</span>
          </motion.div>
          <div>
            <h1 className="leading-tight text-transparent bg-clip-text bg-gradient-to-r from-[#1E2A5A] to-[#295EE7]">
              圣所NFT
            </h1>
            <p className="text-xs text-[#1E2A5A]/50 tracking-wide">Sacred Sanctuary</p>
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onInfoClick}
            className="w-11 h-11 rounded-xl glass-morphism hover:glass-gold flex items-center justify-center transition-all duration-300 shadow-md"
          >
            <Info className="w-5 h-5 text-[#295EE7]" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-xl glass-morphism hover:glass-gold flex items-center justify-center transition-all duration-300 shadow-md relative"
          >
            <Bell className="w-5 h-5 text-[#295EE7]" />
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute top-2 right-2 w-2 h-2 bg-[#E84C4C] rounded-full shadow-lg"
              style={{
                boxShadow: '0 0 10px rgba(232, 76, 76, 0.6)',
              }}
            />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#295EE7] to-[#1E2A5A] flex items-center justify-center shadow-xl overflow-hidden relative"
          >
            {/* Shimmer */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
            <span className="text-xl relative z-10">👤</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
