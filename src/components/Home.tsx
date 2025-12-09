import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Info } from 'lucide-react';
import { TopNav } from './TopNav';
import { NFTDropModal } from './NFTDropModal';
import { RulesModal } from './RulesModal';
import type { NFT } from '../App';

interface HomeProps {
  onNFTDrop: (nft: NFT) => void;
  clickCount: number;
  setClickCount: (count: number) => void;
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

export function Home({ onNFTDrop, clickCount, setClickCount }: HomeProps) {
  const [showDropModal, setShowDropModal] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [droppedNFT, setDroppedNFT] = useState<NFT | null>(null);
  const [particles, setParticles] = useState<Particle[]>([]);

  const generateRandomNFT = (): NFT | null => {
    const random = Math.random() * 100;
    
    if (random < 5) {
      const legendaryItems = [
        { name: '圣杯', description: '传说中盛过圣血的杯子', image: '🏆' },
        { name: '圣冠', description: '荆棘编织的神圣冠冕', image: '👑' },
        { name: '黄金十字架', description: '镶嵌宝石的十字吊坠', image: '✨' },
      ];
      const item = legendaryItems[Math.floor(Math.random() * legendaryItems.length)];
      return {
        id: `nft-${Date.now()}-${Math.random()}`,
        name: item.name,
        type: 'relic',
        rarity: 'legendary',
        image: item.image,
        description: item.description,
        price: 0.5 + Math.random() * 1.5,
      };
    }
    
    if (random < 25) {
      const rareItems = [
        { name: '银制十字架', description: '精雕细琢的银制圣物', image: '✝️', type: 'relic' as const },
        { name: '圣徒头像', description: '经典的圣徒形象', image: '👤', type: 'avatar' as const },
        { name: '完整福音章节', description: '约翰福音第三章', image: '📖', type: 'scripture' as const },
      ];
      const item = rareItems[Math.floor(Math.random() * rareItems.length)];
      return {
        id: `nft-${Date.now()}-${Math.random()}`,
        name: item.name,
        type: item.type,
        rarity: 'rare',
        image: item.image,
        description: item.description,
        price: 0.1 + Math.random() * 0.4,
      };
    }
    
    if (random < 75) {
      const commonItems = [
        { name: '木制十字架', description: '简朴的木制圣物', image: '🪵', type: 'relic' as const },
        { name: '基础头像', description: '朴素的信徒形象', image: '👥', type: 'avatar' as const },
        { name: '圣经节选', description: '诗篇摘录', image: '📄', type: 'scripture' as const },
      ];
      const item = commonItems[Math.floor(Math.random() * commonItems.length)];
      return {
        id: `nft-${Date.now()}-${Math.random()}`,
        name: item.name,
        type: item.type,
        rarity: 'common',
        image: item.image,
        description: item.description,
        price: 0.01 + Math.random() * 0.09,
      };
    }
    
    return null;
  };

  const createParticles = (x: number, y: number) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 12; i++) {
      newParticles.push({
        id: Date.now() + i,
        x: x + (Math.random() - 0.5) * 40,
        y: y + (Math.random() - 0.5) * 40,
      });
    }
    setParticles(newParticles);
    setTimeout(() => setParticles([]), 3000);
  };

  const handleClick = (e: React.MouseEvent, target: 'statue' | 'book') => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    createParticles(x, y);
    setClickCount(clickCount + 1);

    const nft = generateRandomNFT();
    if (nft) {
      setDroppedNFT(nft);
      setShowDropModal(true);
      onNFTDrop(nft);
    }
  };

  return (
    <div className="min-h-full relative">
      <TopNav onInfoClick={() => setShowRules(true)} />
      
      {/* Main Sacred Scene */}
      <div className="px-4 pt-20 pb-6">
        {/* Cathedral Sanctuary Container */}
        <div className="relative rounded-[2rem] overflow-hidden volumetric-light shadow-2xl" 
          style={{
            background: 'linear-gradient(180deg, #F8F7F5 0%, #E8E6E3 30%, #F2EDDF 100%)',
          }}>
          
          {/* Hex Pattern Overlay */}
          <div className="absolute inset-0 hex-pattern opacity-40" />
          
          {/* Soft Mist Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

          {/* Scene Title with Gold Accent */}
          <div className="relative pt-8 pb-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-6 py-2 rounded-2xl glass-gold mb-3">
                <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E2A5A] via-[#295EE7] to-[#1E2A5A]">
                  圣所祈祷殿
                </h1>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-[#EEDCB3]" />
                <p className="text-sm text-[#1E2A5A]/60">点击圣物，获得神圣NFT祝福</p>
                <Sparkles className="w-4 h-4 text-[#EEDCB3]" />
              </div>
            </motion.div>
          </div>

          {/* Sacred Statue/Cross - Premium 3D Feel */}
          <motion.div
            className="relative mx-auto w-56 h-56 flex items-center justify-center cursor-pointer group mb-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: 'spring' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => handleClick(e, 'statue')}
          >
            {/* Outer Glow Ring */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(238, 220, 179, 0.4) 0%, transparent 70%)',
                filter: 'blur(30px)',
              }}
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.7, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Inner Sacred Glow */}
            <motion.div
              className="absolute inset-8 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 60%)',
                filter: 'blur(20px)',
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Marble Pedestal Effect */}
            <div className="absolute bottom-0 w-40 h-20 rounded-[50%] marble-texture opacity-50" 
              style={{ filter: 'blur(8px)' }} 
            />

            {/* Main Cross/Statue Icon with 3D Feel */}
            <div className="relative z-10">
              <motion.div
                className="text-9xl filter drop-shadow-2xl"
                style={{
                  filter: 'drop-shadow(0 10px 40px rgba(238, 220, 179, 0.6)) drop-shadow(0 0 60px rgba(255, 215, 0, 0.4))',
                }}
                animate={{
                  y: [0, -8, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                ✝️
              </motion.div>

              {/* Floating Particles */}
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-2 h-2 rounded-full pointer-events-none"
                  style={{
                    left: particle.x,
                    top: particle.y,
                    background: 'radial-gradient(circle, #EEDCB3 0%, transparent 70%)',
                    boxShadow: '0 0 10px rgba(238, 220, 179, 0.8)',
                  }}
                  initial={{ scale: 0, opacity: 0, y: 0 }}
                  animate={{ 
                    scale: [0, 1, 0.5],
                    opacity: [0, 1, 0],
                    y: -100,
                  }}
                  transition={{ duration: 2, ease: 'easeOut' }}
                />
              ))}
            </div>

            {/* Hover Rim Light */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                boxShadow: 'inset 0 0 40px rgba(255, 215, 0, 0.4), 0 0 60px rgba(238, 220, 179, 0.6)',
              }}
            />
          </motion.div>

          {/* Holy Bible - Leather Bound 3D Book */}
          <motion.div
            className="relative mx-auto w-40 h-32 mb-10 cursor-pointer group perspective-1000"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            whileTap={{ scale: 0.98 }}
            onClick={(e) => handleClick(e, 'book')}
          >
            {/* Book Glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: 'radial-gradient(ellipse, rgba(238, 220, 179, 0.3) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
            />

            {/* 3D Book Container */}
            <div className="relative flex flex-col items-center">
              <motion.div
                animate={{
                  y: [0, -6, 0],
                  rotateX: [0, 2, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative"
              >
                {/* Book with Leather Texture */}
                <div className="relative w-32 h-20 rounded-lg leather-texture shadow-2xl"
                  style={{
                    boxShadow: '0 20px 60px rgba(30, 42, 90, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.1)',
                    border: '2px solid rgba(255, 215, 0, 0.3)',
                  }}>
                  
                  {/* Gold Cross Embossing */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl opacity-80" style={{ 
                      filter: 'drop-shadow(0 2px 4px rgba(255, 215, 0, 0.6))',
                      textShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
                    }}>
                      ✝
                    </div>
                  </div>
                  
                  {/* Book Spine Highlight */}
                  <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-black/30 to-transparent rounded-l-lg" />
                  
                  {/* Page Edge */}
                  <div className="absolute right-0 top-1 bottom-1 w-1 bg-gradient-to-l from-[#EEDCB3] to-transparent opacity-60" />
                </div>
              </motion.div>
              
              <div className="mt-3 px-4 py-1 rounded-lg glass-gold">
                <span className="text-sm text-[#1E2A5A]/80 tracking-wider">圣 经</span>
              </div>
            </div>
          </motion.div>

          {/* Stats Display - Glass Cards */}
          <div className="relative pb-8 flex justify-center gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center px-6 py-3 rounded-2xl glass-morphism sacred-glow"
            >
              <div className="text-xs text-[#1E2A5A]/60 mb-1">今日祈祷</div>
              <div className="text-xl text-[#1E2A5A]">{clickCount}</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9 }}
              className="text-center px-6 py-3 rounded-2xl glass-morphism sacred-glow"
            >
              <div className="text-xs text-[#1E2A5A]/60 mb-1">获得圣物</div>
              <div className="text-xl text-[#1E2A5A]">12</div>
            </motion.div>
          </div>
        </div>

        {/* Quick Actions - Premium Cards */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowRules(true)}
            className="p-5 rounded-2xl glass-gold sacred-glow group transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#295EE7] to-[#1E2A5A] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <Info className="w-6 h-6 text-white" />
              </div>
              <span className="text-[#1E2A5A]">掉落规则</span>
            </div>
            <p className="text-xs text-[#1E2A5A]/60 text-left">查看NFT稀有度与概率</p>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="p-5 rounded-2xl glass-gold sacred-glow group transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#EEDCB3] to-[#E4D2A6] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <Sparkles className="w-6 h-6 text-[#1E2A5A]" />
              </div>
              <span className="text-[#1E2A5A]">祈祷记录</span>
            </div>
            <p className="text-xs text-[#1E2A5A]/60 text-left">查看您的祈祷历史</p>
          </motion.button>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showDropModal && droppedNFT && (
          <NFTDropModal
            nft={droppedNFT}
            onClose={() => {
              setShowDropModal(false);
              setDroppedNFT(null);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showRules && (
          <RulesModal onClose={() => setShowRules(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
