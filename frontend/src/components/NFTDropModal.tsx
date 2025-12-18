import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles } from 'lucide-react';
import type { NFT } from '../App';

interface NFTDropModalProps {
  nft: NFT;
  onClose: () => void;
}

interface FallingParticle {
  id: number;
  x: number;
  delay: number;
}

export function NFTDropModal({ nft, onClose }: NFTDropModalProps) {
  const [fallingParticles, setFallingParticles] = useState<FallingParticle[]>([]);

  useEffect(() => {
    const particles: FallingParticle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
    }));
    setFallingParticles(particles);
  }, []);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return {
          gradient: 'from-[#E84C4C] to-[#FF6B6B]',
          glow: 'gem-glow-legendary',
          text: 'text-legendary',
        };
      case 'rare':
        return {
          gradient: 'from-[#6A5BFF] to-[#8B7FFF]',
          glow: 'gem-glow-rare',
          text: 'text-rare',
        };
      default:
        return {
          gradient: 'from-[#E0DFDA] to-[#C0BFBA]',
          glow: 'gem-glow-common',
          text: 'text-muted-foreground',
        };
    }
  };

  const getRarityLabel = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return '传奇';
      case 'rare':
        return '稀有';
      default:
        return '普通';
    }
  };

  const getRarityStars = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return '⭐⭐⭐';
      case 'rare':
        return '⭐⭐';
      default:
        return '⭐';
    }
  };

  const rarityStyle = getRarityColor(nft.rarity);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Falling Golden Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {fallingParticles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: '-5%',
              background: 'radial-gradient(circle, #EEDCB3 0%, transparent 70%)',
              boxShadow: '0 0 8px rgba(238, 220, 179, 0.8)',
            }}
            initial={{ y: 0, opacity: 0 }}
            animate={{ 
              y: '110vh', 
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: particle.delay,
              ease: 'linear',
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.5, opacity: 0, y: 100 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ 
          type: 'spring', 
          damping: 20,
          delay: 0.2,
        }}
        className="relative max-w-sm w-full overflow-hidden rounded-[2rem] glass-morphism"
        style={{
          boxShadow: '0 20px 80px rgba(30, 42, 90, 0.4), inset 0 0 40px rgba(255, 255, 255, 0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Rarity Gradient */}
        <div className={`relative bg-gradient-to-br ${rarityStyle.gradient} p-8 overflow-hidden`}>
          {/* Animated Background Pattern */}
          <motion.div
            className="absolute inset-0 hex-pattern opacity-20"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear',
            }}
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass-morphism hover:bg-white/30 flex items-center justify-center transition-all z-10"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <div className="text-center relative z-10">
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.2, 1.2, 1],
              }}
              transition={{
                duration: 0.8,
                times: [0, 0.3, 0.6, 1],
              }}
              className="mb-4"
            >
              <Sparkles className="w-16 h-16 mx-auto text-white drop-shadow-lg" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-2 text-white"
            >
              恭喜获得圣物！
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-white/90 text-sm"
            >
              NFT已添加到您的背包
            </motion.p>
          </div>
        </div>

        {/* NFT Preview Card */}
        <div className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className={`relative rounded-2xl p-8 mb-5 hex-pattern ${rarityStyle.glow}`}
            style={{
              background: 'linear-gradient(135deg, #FAF7F0 0%, #F2EDDF 100%)',
            }}
          >
            {/* Rarity Badge */}
            <div className="absolute top-3 right-3">
              <div className={`px-4 py-1.5 rounded-xl bg-gradient-to-r ${rarityStyle.gradient} text-white text-xs shadow-xl`}>
                {getRarityLabel(nft.rarity)}
              </div>
            </div>

            {/* NFT Icon with Glow */}
            <div className="text-center mb-4 relative">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                <div className="text-8xl mb-3 filter drop-shadow-2xl">
                  {nft.image}
                </div>
              </motion.div>
              
              <div className={`text-sm ${rarityStyle.text}`}>
                {getRarityStars(nft.rarity)}
              </div>

              {/* Legendary Sparkle Effect */}
              {nft.rarity === 'legendary' && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <Sparkles className="w-12 h-12 text-[#FFD700] opacity-60" />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* NFT Details */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="space-y-3"
          >
            <div>
              <h3 className="text-cathedral mb-1">{nft.name}</h3>
              <p className="text-sm text-cathedral/70 leading-relaxed">{nft.description}</p>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl glass-gold">
              <span className="text-sm text-cathedral/70">预估价值</span>
              <span className="text-cathedral font-mono">{nft.price?.toFixed(3)} ETH</span>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl glass-morphism">
              <span className="text-sm text-sapphire/70">类型</span>
              <span className="text-sapphire">
                {nft.type === 'relic' && '圣物'}
                {nft.type === 'avatar' && '头像'}
                {nft.type === 'scripture' && '经文'}
              </span>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-6 grid grid-cols-2 gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="py-3 rounded-xl glass-morphism hover:glass-gold text-cathedral transition-all duration-300 shadow-md"
            >
              继续祈祷
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-3 rounded-xl bg-gradient-to-r from-sapphire to-cathedral text-white shadow-xl relative overflow-hidden"
            >
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
              <span className="relative z-10">查看详情</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
