import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Tag, Sparkles, X } from 'lucide-react';
import type { NFT } from '../App';

interface NFTCardProps {
  nft: NFT;
  mode: 'buy' | 'manage';
  onBuy?: (nftId: string) => void;
  onList?: (nftId: string, price: number) => void;
  onUse?: (nftId: string) => void;
}

export function NFTCard({ nft, mode, onBuy, onList, onUse }: NFTCardProps) {
  const [showListModal, setShowListModal] = useState(false);
  const [listPrice, setListPrice] = useState('');

  const getRarityStyles = (rarity: string) => {
    switch (rarity) {
      case 'legendary':
        return {
          gradient: 'from-[#E84C4C] to-[#FF6B6B]',
          borderGlow: 'gem-glow-legendary',
          label: '传奇',
          stars: '⭐⭐⭐',
        };
      case 'rare':
        return {
          gradient: 'from-[#6A5BFF] to-[#8B7FFF]',
          borderGlow: 'gem-glow-rare',
          label: '稀有',
          stars: '⭐⭐',
        };
      default:
        return {
          gradient: 'from-[#E0DFDA] to-[#C0BFBA]',
          borderGlow: 'gem-glow-common',
          label: '普通',
          stars: '⭐',
        };
    }
  };

  const rarityStyle = getRarityStyles(nft.rarity);

  const handleListSubmit = () => {
    const price = parseFloat(listPrice);
    if (price > 0 && onList) {
      onList(nft.id, price);
      setShowListModal(false);
      setListPrice('');
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="group"
      >
        <div className={`glass-morphism rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 ${rarityStyle.borderGlow}`}
          style={{
            border: '2px solid rgba(238, 220, 179, 0.3)',
          }}>
          {/* NFT Image Container */}
          <div className="relative aspect-square p-6 flex items-center justify-center hex-pattern"
            style={{
              background: 'linear-gradient(135deg, #FAF7F0 0%, #F2EDDF 100%)',
            }}>
            
            {/* Rarity Badge */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="absolute top-3 right-3 z-10"
            >
              <div className={`px-3 py-1 rounded-lg bg-gradient-to-r ${rarityStyle.gradient} text-white text-xs shadow-lg`}>
                {rarityStyle.label}
              </div>
            </motion.div>

            {/* NFT Icon with Animation */}
            <motion.div
              animate={{
                scale: [1, 1.02, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="relative z-10"
            >
              <div className="text-7xl filter drop-shadow-2xl">
                {nft.image}
              </div>
            </motion.div>

            {/* Legendary Sparkle Effect */}
            {nft.rarity === 'legendary' && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <Sparkles className="w-10 h-10 text-[#FFD700] opacity-40" />
              </motion.div>
            )}

            {/* Stars Indicator */}
            <div className="absolute bottom-3 left-0 right-0 text-center text-sm opacity-70">
              {rarityStyle.stars}
            </div>
          </div>

          {/* NFT Info */}
          <div className="p-4 glass-gold">
            <h3 className="text-cathedral mb-1 truncate">{nft.name}</h3>
            <p className="text-xs text-cathedral/60 mb-3 line-clamp-2 leading-relaxed">
              {nft.description}
            </p>

            {/* Price Display */}
            {nft.price !== undefined && (
              <div className="flex items-center justify-between mb-3 p-3 rounded-xl glass-morphism shadow-inner">
                <span className="text-xs text-cathedral/70">价格</span>
                <span className="text-cathedral font-mono text-sm">{nft.price.toFixed(3)} ETH</span>
              </div>
            )}

            {/* Owner Info (Market Mode) */}
            {mode === 'buy' && nft.owner && (
              <div className="flex items-center justify-between mb-3 p-2 rounded-lg bg-cathedral/5">
                <span className="text-xs text-cathedral/60">持有者</span>
                <span className="text-xs text-cathedral font-mono">{nft.owner}</span>
              </div>
            )}

            {/* Action Buttons */}
            {mode === 'buy' ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onBuy?.(nft.id)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sapphire to-cathedral text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group"
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
                <ShoppingCart className="w-4 h-4 relative z-10" />
                <span className="relative z-10">购买</span>
              </motion.button>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onUse?.(nft.id)}
                  className="py-3 rounded-xl bg-gradient-to-r from-[#6A5BFF] to-[#8B7FFF] text-white shadow-lg text-sm"
                >
                  使用
                </motion.button>
                {nft.listed ? (
                  <button className="py-3 rounded-xl glass-gold text-cathedral/70 border border-gold-soft text-sm">
                    已上架
                  </button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowListModal(true)}
                    className="py-3 rounded-xl bg-gradient-to-r from-gold-soft to-gold text-cathedral shadow-lg flex items-center justify-center gap-1 text-sm"
                  >
                    <Tag className="w-4 h-4" />
                    <span>上架</span>
                  </motion.button>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* List Modal */}
      <AnimatePresence>
        {showListModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
            onClick={() => setShowListModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-morphism rounded-2xl shadow-2xl max-w-sm w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-cathedral">上架NFT</h3>
                <button
                  onClick={() => setShowListModal(false)}
                  className="w-9 h-9 rounded-lg glass-gold hover:bg-gold-soft/50 flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5 text-cathedral" />
                </button>
              </div>

              <div className="mb-5">
                <div className="text-center py-5 rounded-2xl glass-gold mb-5">
                  <div className="text-5xl mb-2">{nft.image}</div>
                  <p className="text-cathedral">{nft.name}</p>
                </div>

                <label className="block text-sm text-cathedral/70 mb-2">设置价格 (ETH)</label>
                <input
                  type="number"
                  step="0.001"
                  min="0"
                  value={listPrice}
                  onChange={(e) => setListPrice(e.target.value)}
                  placeholder="0.000"
                  className="w-full px-4 py-3 rounded-xl glass-morphism focus:outline-none focus:ring-2 focus:ring-sapphire transition-all text-cathedral"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowListModal(false)}
                  className="py-3 rounded-xl glass-gold hover:bg-gold-soft/50 text-cathedral transition-colors"
                >
                  取消
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleListSubmit}
                  className="py-3 rounded-xl bg-gradient-to-r from-sapphire to-cathedral text-white shadow-lg relative overflow-hidden"
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
                  <span className="relative z-10">确认上架</span>
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
