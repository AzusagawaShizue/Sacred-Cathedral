import { useState } from 'react';
import { motion } from 'motion/react';
import { Globe, Users, TrendingUp, RefreshCw } from 'lucide-react';
import { TopNav } from './TopNav';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GlobalStatsProps {
  totalClicks: number;
}

export function GlobalStats({ totalClicks }: GlobalStatsProps) {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

  const regionData = [
    { name: '美国', clicks: 1250000, percentage: 28, rank: 1, flag: '🇺🇸', topNFT: '圣杯' },
    { name: '中国', clicks: 980000, percentage: 22, rank: 2, flag: '🇨🇳', topNFT: '黄金十字架' },
    { name: '日本', clicks: 650000, percentage: 15, rank: 3, flag: '🇯🇵', topNFT: '圣冠' },
    { name: '德国', clicks: 420000, percentage: 10, rank: 4, flag: '🇩🇪', topNFT: '银制十字架' },
    { name: '英国', clicks: 380000, percentage: 9, rank: 5, flag: '🇬🇧', topNFT: '圣徒头像' },
  ];

  const globalStats = {
    totalClicks: 4346789 + totalClicks,
    activeUsers: 89234,
    nftsDropped: 1234567,
    averageValue: 0.234,
  };

  return (
    <div className="min-h-full pb-20">
      <TopNav />
      
      <div className="px-4 pt-20 pb-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-amber-900 mb-2">全球祈祷统计</h1>
          <p className="text-amber-700/70 text-sm">实时追踪全球信徒的祈祷数据</p>
        </div>

        {/* Global Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-amber-400 to-amber-600 rounded-2xl p-4 text-white shadow-lg"
          >
            <Globe className="w-6 h-6 mb-2 opacity-80" />
            <div className="mb-1">总祈祷次数</div>
            <div className="text-2xl">{globalStats.totalClicks.toLocaleString()}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-4 text-white shadow-lg"
          >
            <Users className="w-6 h-6 mb-2 opacity-80" />
            <div className="mb-1">在线用户</div>
            <div className="text-2xl">{globalStats.activeUsers.toLocaleString()}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl p-4 text-white shadow-lg"
          >
            <TrendingUp className="w-6 h-6 mb-2 opacity-80" />
            <div className="mb-1">NFT掉落</div>
            <div className="text-2xl">{globalStats.nftsDropped.toLocaleString()}</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-400 to-green-600 rounded-2xl p-4 text-white shadow-lg"
          >
            <div className="w-6 h-6 mb-2 opacity-80 text-xl">💎</div>
            <div className="mb-1">平均价值</div>
            <div className="text-2xl">{globalStats.averageValue} ETH</div>
          </motion.div>
        </div>

        {/* World Map Visualization */}
        <div className="bg-white rounded-2xl shadow-lg border border-amber-200/30 overflow-hidden mb-6">
          <div className="p-4 bg-gradient-to-r from-amber-50 to-stone-100 border-b border-amber-200/30 flex items-center justify-between">
            <div>
              <h2 className="text-amber-900 mb-1">全球热力分布</h2>
              <p className="text-xs text-amber-700/70">点击查看区域详情</p>
            </div>
            <button className="w-10 h-10 rounded-xl bg-white hover:bg-amber-50 flex items-center justify-center transition-colors shadow-sm">
              <RefreshCw className="w-5 h-5 text-amber-600" />
            </button>
          </div>

          {/* Map Image */}
          <div className="relative aspect-video bg-gradient-to-br from-blue-100 to-blue-200">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758876202877-30b2c505ad9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b3JsZCUyMG1hcCUyMGRhdGF8ZW58MXx8fHwxNzY1MjEzMzE5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="World map"
              className="w-full h-full object-cover opacity-60"
            />
            
            {/* Heat Indicators */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full">
                {/* North America */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-red-500/50 blur-xl"
                />
                {/* Asia */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  className="absolute top-1/3 right-1/4 w-20 h-20 rounded-full bg-orange-500/50 blur-xl"
                />
                {/* Europe */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                  className="absolute top-1/4 left-1/2 w-12 h-12 rounded-full bg-yellow-500/50 blur-xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top Regions Ranking */}
        <div className="bg-white rounded-2xl shadow-lg border border-amber-200/30 overflow-hidden">
          <div className="p-4 bg-gradient-to-r from-amber-50 to-stone-100 border-b border-amber-200/30">
            <h2 className="text-amber-900 mb-1">地区排行榜</h2>
            <p className="text-xs text-amber-700/70">TOP 5 祈祷次数最多的地区</p>
          </div>

          <div className="divide-y divide-gray-100">
            {regionData.map((region, index) => (
              <motion.button
                key={region.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedRegion(selectedRegion === region.name ? null : region.name)}
                className="w-full p-4 hover:bg-amber-50 transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  {/* Rank */}
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white shadow-lg' :
                    index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500 text-white shadow-lg' :
                    index === 2 ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-white shadow-lg' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <span className="font-bold">{region.rank}</span>
                  </div>

                  {/* Flag & Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{region.flag}</span>
                      <span className="text-amber-900">{region.name}</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${region.percentage}%` }}
                          transition={{ delay: index * 0.1 + 0.3, duration: 0.8 }}
                          className="h-full bg-gradient-to-r from-amber-400 to-amber-600"
                        />
                      </div>
                      <span className="text-xs text-amber-700/70 w-10">{region.percentage}%</span>
                    </div>
                  </div>

                  {/* Clicks */}
                  <div className="text-right">
                    <div className="text-amber-900 mb-1">{region.clicks.toLocaleString()}</div>
                    <div className="text-xs text-amber-700/70">次祈祷</div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedRegion === region.name && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="mt-4 pt-4 border-t border-gray-100"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-blue-50 rounded-xl">
                        <div className="text-xs text-blue-700 mb-1">热门NFT</div>
                        <div className="text-blue-900">{region.topNFT}</div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-xl">
                        <div className="text-xs text-purple-700 mb-1">活跃用户</div>
                        <div className="text-purple-900">{(region.clicks / 156).toFixed(0)}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
