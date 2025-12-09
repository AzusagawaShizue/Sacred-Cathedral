import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, ShoppingCart, Tag, TrendingUp } from 'lucide-react';
import { TopNav } from './TopNav';
import { NFTCard } from './NFTCard';
import type { NFT } from '../App';

interface NFTMarketProps {
  userNFTs: NFT[];
  setUserNFTs: (nfts: NFT[]) => void;
}

export function NFTMarket({ userNFTs, setUserNFTs }: NFTMarketProps) {
  const [activeTab, setActiveTab] = useState<'market' | 'my'>('market');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'relic' | 'avatar' | 'scripture'>('all');
  const [selectedRarity, setSelectedRarity] = useState<'all' | 'legendary' | 'rare' | 'common'>('all');

  // Mock market NFTs
  const marketNFTs: NFT[] = [
    {
      id: 'm1',
      name: '圣杯',
      type: 'relic',
      rarity: 'legendary',
      image: '🏆',
      description: '传说中盛过圣血的杯子',
      price: 1.25,
      owner: '0x7a8f',
      listed: true,
    },
    {
      id: 'm2',
      name: '圣冠',
      type: 'relic',
      rarity: 'legendary',
      image: '👑',
      description: '荆棘编织的神圣冠冕',
      price: 0.89,
      owner: '0x3b2c',
      listed: true,
    },
    {
      id: 'm3',
      name: '银制十字架',
      type: 'relic',
      rarity: 'rare',
      image: '✝️',
      description: '精雕细琢的银制圣物',
      price: 0.34,
      owner: '0x9f1e',
      listed: true,
    },
    {
      id: 'm4',
      name: '圣徒头像',
      type: 'avatar',
      rarity: 'rare',
      image: '👤',
      description: '经典的圣徒形象',
      price: 0.28,
      owner: '0x5d4a',
      listed: true,
    },
    {
      id: 'm5',
      name: '完整福音章节',
      type: 'scripture',
      rarity: 'rare',
      image: '📖',
      description: '约翰福音第三章',
      price: 0.19,
      owner: '0x8c7b',
      listed: true,
    },
    {
      id: 'm6',
      name: '木制十字架',
      type: 'relic',
      rarity: 'common',
      image: '🪵',
      description: '简朴的木制圣物',
      price: 0.05,
      owner: '0x2a1f',
      listed: true,
    },
  ];

  const filterNFTs = (nfts: NFT[]) => {
    return nfts.filter(nft => {
      const matchesSearch = nft.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || nft.type === selectedType;
      const matchesRarity = selectedRarity === 'all' || nft.rarity === selectedRarity;
      return matchesSearch && matchesType && matchesRarity;
    });
  };

  const handleBuy = (nftId: string) => {
    const nft = marketNFTs.find(n => n.id === nftId);
    if (nft) {
      alert(`购买成功！已支付 ${nft.price} ETH`);
    }
  };

  const handleList = (nftId: string, price: number) => {
    setUserNFTs(
      userNFTs.map(nft =>
        nft.id === nftId ? { ...nft, listed: true, price } : nft
      )
    );
  };

  const handleUse = (nftId: string) => {
    const nft = userNFTs.find(n => n.id === nftId);
    if (nft) {
      alert(`已使用 ${nft.name}`);
    }
  };

  const displayNFTs = activeTab === 'market' ? filterNFTs(marketNFTs) : filterNFTs(userNFTs);

  return (
    <div className="min-h-full pb-20">
      <TopNav />
      
      <div className="px-4 pt-20 pb-6">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E2A5A] to-[#295EE7] mb-2">
            NFT市场
          </h1>
          <p className="text-[#1E2A5A]/60 text-sm">探索、交易和收藏神圣的NFT</p>
        </motion.div>

        {/* Market Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-2xl glass-gold sacred-glow"
          >
            <ShoppingCart className="w-5 h-5 text-[#295EE7] mb-2" />
            <div className="text-xs text-[#1E2A5A]/60 mb-1">总交易</div>
            <div className="text-[#1E2A5A]">24.5K</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="p-4 rounded-2xl glass-gold sacred-glow"
          >
            <TrendingUp className="w-5 h-5 text-[#6A5BFF] mb-2" />
            <div className="text-xs text-[#1E2A5A]/60 mb-1">总价值</div>
            <div className="text-[#1E2A5A]">128 ETH</div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="p-4 rounded-2xl glass-gold sacred-glow"
          >
            <Tag className="w-5 h-5 text-[#EEDCB3] mb-2" />
            <div className="text-xs text-[#1E2A5A]/60 mb-1">在售</div>
            <div className="text-[#1E2A5A]">1,234</div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('market')}
            className={`flex-1 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden ${
              activeTab === 'market'
                ? 'bg-gradient-to-r from-[#295EE7] to-[#1E2A5A] text-white shadow-xl'
                : 'glass-gold text-[#1E2A5A]'
            }`}
          >
            {activeTab === 'market' && (
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
            )}
            <span className="relative z-10">市场列表</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('my')}
            className={`flex-1 py-4 rounded-2xl transition-all duration-300 relative overflow-hidden ${
              activeTab === 'my'
                ? 'bg-gradient-to-r from-[#295EE7] to-[#1E2A5A] text-white shadow-xl'
                : 'glass-gold text-[#1E2A5A]'
            }`}
          >
            {activeTab === 'my' && (
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
            )}
            <span className="relative z-10">我的NFT ({userNFTs.length})</span>
          </motion.button>
        </div>

        {/* Search & Filter */}
        <div className="space-y-3 mb-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#1E2A5A]/40" />
            <input
              type="text"
              placeholder="搜索NFT名称..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl glass-morphism focus:outline-none focus:ring-2 focus:ring-[#295EE7] transition-all text-[#1E2A5A] placeholder:text-[#1E2A5A]/40"
            />
          </div>

          {/* Filter Options */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2.5 rounded-xl glass-gold text-[#1E2A5A] text-sm whitespace-nowrap shadow-md flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              筛选
            </motion.button>
            
            {/* Type Filters */}
            {(['all', 'relic', 'avatar', 'scripture'] as const).map((type) => (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-all ${
                  selectedType === type
                    ? 'bg-gradient-to-r from-[#6A5BFF] to-[#8B7FFF] text-white shadow-lg'
                    : 'glass-gold text-[#1E2A5A]'
                }`}
              >
                {type === 'all' && '全部'}
                {type === 'relic' && '圣物'}
                {type === 'avatar' && '头像'}
                {type === 'scripture' && '经文'}
              </motion.button>
            ))}
            
            {/* Rarity Filters */}
            {(['all', 'legendary', 'rare', 'common'] as const).map((rarity) => (
              <motion.button
                key={rarity}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedRarity(rarity)}
                className={`px-4 py-2.5 rounded-xl text-sm whitespace-nowrap transition-all ${
                  selectedRarity === rarity
                    ? 'bg-gradient-to-r from-[#E84C4C] to-[#FF6B6B] text-white shadow-lg'
                    : 'glass-gold text-[#1E2A5A]'
                }`}
              >
                {rarity === 'all' && '全部稀有度'}
                {rarity === 'legendary' && '传奇'}
                {rarity === 'rare' && '稀有'}
                {rarity === 'common' && '普通'}
              </motion.button>
            ))}
          </div>
        </div>

        {/* NFT Grid */}
        {displayNFTs.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {displayNFTs.map((nft, index) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <NFTCard
                  nft={nft}
                  mode={activeTab === 'market' ? 'buy' : 'manage'}
                  onBuy={handleBuy}
                  onList={handleList}
                  onUse={handleUse}
                />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-7xl mb-4 opacity-30">📦</div>
              <p className="text-[#1E2A5A]/60 mb-2">暂无NFT</p>
              <p className="text-sm text-[#1E2A5A]/40">
                {activeTab === 'market' ? '没有找到符合条件的NFT' : '去首页祈祷获取NFT吧'}
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}