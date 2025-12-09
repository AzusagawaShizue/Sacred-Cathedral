import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Settings, Wallet, Trophy, ChevronRight, Edit2, X } from 'lucide-react';
import { TopNav } from './TopNav';
import type { NFT } from '../App';

interface ProfileProps {
  userNFTs: NFT[];
}

export function Profile({ userNFTs }: ProfileProps) {
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [showSignatureModal, setShowSignatureModal] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState('👤');
  const [signature, setSignature] = useState('因为神爱世人，甚至将他的独生子赐给他们');

  const avatarNFTs = userNFTs.filter(nft => nft.type === 'avatar');
  const scriptureNFTs = userNFTs.filter(nft => nft.type === 'scripture');

  const stats = [
    { label: '总祈祷', value: '1,234', icon: '🙏' },
    { label: '获得NFT', value: userNFTs.length.toString(), icon: '💎' },
    { label: '总价值', value: userNFTs.reduce((sum, nft) => sum + (nft.price || 0), 0).toFixed(2) + ' ETH', icon: '💰' },
    { label: '稀有NFT', value: userNFTs.filter(nft => nft.rarity === 'legendary').length.toString(), icon: '⭐' },
  ];

  const menuItems = [
    { label: '更换头像', icon: User, action: () => setShowAvatarModal(true) },
    { label: '个性签名', icon: Edit2, action: () => setShowSignatureModal(true) },
    { label: '钱包地址', icon: Wallet, badge: '0x7a8f...3b2c' },
    { label: '成就徽章', icon: Trophy, badge: '12' },
    { label: '设置', icon: Settings },
  ];

  return (
    <div className="min-h-full pb-20">
      <TopNav />
      
      <div className="px-4 pt-20 pb-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-3xl p-6 shadow-2xl mb-6 text-white">
          <div className="flex items-center gap-4 mb-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAvatarModal(true)}
              className="relative"
            >
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-4xl border-2 border-white/30 shadow-lg">
                {selectedAvatar}
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-lg flex items-center justify-center shadow-lg">
                <Edit2 className="w-3 h-3 text-amber-600" />
              </div>
            </motion.button>

            <div className="flex-1">
              <h2 className="mb-1">虔诚的信徒</h2>
              <p className="text-white/80 text-sm">Lv. 12 圣徒</p>
              <div className="mt-2 h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: '68%' }}
                  transition={{ delay: 0.3, duration: 1 }}
                  className="h-full bg-white rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Signature */}
          <button
            onClick={() => setShowSignatureModal(true)}
            className="w-full p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 text-left hover:bg-white/20 transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="text-white/70 text-xs mb-1">个性签名</div>
                <p className="text-sm leading-relaxed">{signature}</p>
              </div>
              <Edit2 className="w-4 h-4 text-white/70 flex-shrink-0 mt-1" />
            </div>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-3 shadow-lg border border-amber-200/30 text-center"
            >
              <div className="text-2xl mb-1">{stat.icon}</div>
              <div className="text-amber-900 mb-1">{stat.value}</div>
              <div className="text-xs text-amber-700/70">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-2xl shadow-lg border border-amber-200/30 divide-y divide-gray-100 overflow-hidden mb-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={item.action}
                className="w-full p-4 hover:bg-amber-50 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-amber-700" />
                  </div>
                  <span className="text-amber-900">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="text-sm text-amber-700/70">{item.badge}</span>
                  )}
                  <ChevronRight className="w-5 h-5 text-amber-600" />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button className="p-4 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg hover:from-blue-600 hover:to-blue-700 transition-colors">
            <div className="text-2xl mb-2">📊</div>
            <div className="text-sm">我的统计</div>
          </button>
          <button className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg hover:from-purple-600 hover:to-purple-700 transition-colors">
            <div className="text-2xl mb-2">🎯</div>
            <div className="text-sm">每日任务</div>
          </button>
        </div>
      </div>

      {/* Avatar Selection Modal */}
      <AnimatePresence>
        {showAvatarModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowAvatarModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-amber-900">选择头像</h3>
                <button
                  onClick={() => setShowAvatarModal(false)}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
                {avatarNFTs.length > 0 ? (
                  <div className="grid grid-cols-3 gap-3">
                    {avatarNFTs.map((nft) => (
                      <button
                        key={nft.id}
                        onClick={() => {
                          setSelectedAvatar(nft.image);
                          setShowAvatarModal(false);
                        }}
                        className={`aspect-square rounded-2xl bg-gradient-to-br from-amber-50 to-stone-100 flex items-center justify-center text-4xl hover:scale-105 transition-transform border-2 ${
                          selectedAvatar === nft.image ? 'border-amber-500' : 'border-transparent'
                        }`}
                      >
                        {nft.image}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-3">👤</div>
                    <p className="text-amber-700/70 mb-2">暂无头像NFT</p>
                    <p className="text-sm text-amber-700/50">去市场购买或祈祷获取吧</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Signature Modal */}
      <AnimatePresence>
        {showSignatureModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowSignatureModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-amber-900">选择签名</h3>
                <button
                  onClick={() => setShowSignatureModal(false)}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
                {scriptureNFTs.length > 0 ? (
                  <div className="space-y-3">
                    {scriptureNFTs.map((nft) => (
                      <button
                        key={nft.id}
                        onClick={() => {
                          setSignature(nft.description);
                          setShowSignatureModal(false);
                        }}
                        className={`w-full p-4 rounded-xl text-left hover:bg-amber-50 transition-colors border-2 ${
                          signature === nft.description ? 'border-amber-500 bg-amber-50' : 'border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-2xl">{nft.image}</span>
                          <span className="text-amber-900">{nft.name}</span>
                        </div>
                        <p className="text-sm text-amber-700/80 leading-relaxed">{nft.description}</p>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-5xl mb-3">📖</div>
                    <p className="text-amber-700/70 mb-2">暂无经文NFT</p>
                    <p className="text-sm text-amber-700/50">去市场购买或祈祷获取吧</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
