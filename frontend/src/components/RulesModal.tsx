import { motion } from 'motion/react';
import { X, TrendingUp, Star, Sparkles } from 'lucide-react';

interface RulesModalProps {
  onClose: () => void;
}

export function RulesModal({ onClose }: RulesModalProps) {
  const rarityData = [
    {
      rarity: '传奇',
      probability: '1-5%',
      gradient: 'from-[#E84C4C] to-[#FF6B6B]',
      glowClass: 'gem-glow-legendary',
      items: ['圣杯', '圣冠', '黄金十字架'],
      value: '0.5-2.0 ETH',
      icon: '💎',
    },
    {
      rarity: '稀有',
      probability: '5-25%',
      gradient: 'from-[#6A5BFF] to-[#8B7FFF]',
      glowClass: 'gem-glow-rare',
      items: ['银制十字架', '圣徒头像', '完整福音章节'],
      value: '0.1-0.5 ETH',
      icon: '💠',
    },
    {
      rarity: '普通',
      probability: '25-75%',
      gradient: 'from-[#E0DFDA] to-[#C0BFBA]',
      glowClass: 'gem-glow-common',
      items: ['木制十字架', '基础头像', '圣经节选'],
      value: '0.01-0.1 ETH',
      icon: '⚪',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 25 }}
        className="glass-morphism rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl max-w-lg w-full max-h-[85vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-[#295EE7] to-[#1E2A5A] p-6 overflow-hidden">
          <div className="absolute inset-0 hex-pattern opacity-20" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full glass-morphism hover:bg-white/30 flex items-center justify-center transition-all z-10"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10"
          >
            <div className="flex items-center gap-3 mb-2">
              <Sparkles className="w-8 h-8 text-white" />
              <h2 className="text-white">NFT掉落规则</h2>
            </div>
            <p className="text-white/80 text-sm">了解圣物的稀有度与价值</p>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)]" style={{ background: 'linear-gradient(180deg, #FAF7F0 0%, #F2EDDF 100%)' }}>
          {/* Introduction Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-5 rounded-2xl glass-gold sacred-glow"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold-soft to-gold flex items-center justify-center flex-shrink-0 shadow-lg">
                <Star className="w-6 h-6 text-cathedral" />
              </div>
              <div>
                <h4 className="text-cathedral mb-2">祈祷机制</h4>
                <p className="text-sm text-cathedral/70 leading-relaxed">
                  每次点击圣经或耶稣神像都有机会获得NFT奖励。奖励的稀有度和价值根据掉落几率随机决定。越稀有的圣物，光芒越耀眼。
                </p>
              </div>
            </div>
          </motion.div>

          {/* Rarity Tiers */}
          <div className="space-y-4">
            {rarityData.map((tier, index) => (
              <motion.div
                key={tier.rarity}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                className="rounded-2xl overflow-hidden shadow-xl"
              >
                {/* Tier Header */}
                <div className={`bg-gradient-to-br ${tier.gradient} p-5 relative overflow-hidden`}>
                  <div className="absolute inset-0 hex-pattern opacity-20" />
                  
                  <div className="relative z-10 flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{tier.icon}</span>
                      <div>
                        <h3 className="text-white mb-1">{tier.rarity}</h3>
                        <div className="text-white/80 text-sm">
                          {tier.rarity === '传奇' && '⭐⭐⭐'}
                          {tier.rarity === '稀有' && '⭐⭐'}
                          {tier.rarity === '普通' && '⭐'}
                        </div>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 rounded-xl glass-morphism"
                    >
                      <span className="text-sm text-white">{tier.probability}</span>
                    </motion.div>
                  </div>
                </div>

                {/* Tier Details */}
                <div className="p-5 glass-morphism">
                  <div className="mb-4">
                    <div className="text-xs text-cathedral/60 mb-2 tracking-wide">包含物品</div>
                    <div className="flex flex-wrap gap-2">
                      {tier.items.map((item) => (
                        <motion.span
                          key={item}
                          whileHover={{ scale: 1.05 }}
                          className="px-3 py-2 glass-gold text-cathedral text-sm rounded-xl shadow-md"
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-cathedral/10">
                    <span className="text-sm text-cathedral/70">预估价值范围</span>
                    <span className="text-cathedral font-mono">{tier.value}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-5 rounded-2xl glass-gold sacred-glow"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sapphire to-cathedral flex items-center justify-center flex-shrink-0 shadow-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <h4 className="text-cathedral mb-2">价值提示</h4>
                <p className="text-sm text-cathedral/70 leading-relaxed">
                  获得的NFT可以在市场中交易，或用于装饰您的个人祈祷场所。稀有度越高的NFT，其收藏价值和交易价格通常越高。传奇NFT会发出璀璨的宝石光芒。
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 p-4 glass-gold border-t border-gold-soft/30">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClose}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-sapphire to-cathedral text-white shadow-xl relative overflow-hidden"
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
            <span className="relative z-10">开始祈祷</span>
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
