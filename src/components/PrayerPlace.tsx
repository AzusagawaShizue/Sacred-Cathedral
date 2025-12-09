import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, RotateCcw, Save, X, Sparkles } from 'lucide-react';
import { TopNav } from './TopNav';
import type { NFT } from '../App';

interface PrayerPlaceProps {
  userNFTs: NFT[];
}

interface PlacedRelic {
  nft: NFT;
  position: { x: number; y: number };
  id: string;
}

export function PrayerPlace({ userNFTs }: PrayerPlaceProps) {
  const [placedRelics, setPlacedRelics] = useState<PlacedRelic[]>([]);
  const [showRelicSelector, setShowRelicSelector] = useState(false);
  const [draggedRelic, setDraggedRelic] = useState<string | null>(null);

  const relicNFTs = userNFTs.filter(nft => nft.type === 'relic');

  const handleAddRelic = (nft: NFT) => {
    const newRelic: PlacedRelic = {
      nft,
      position: { x: 50, y: 50 }, // Center position
      id: `placed-${Date.now()}-${Math.random()}`,
    };
    setPlacedRelics([...placedRelics, newRelic]);
    setShowRelicSelector(false);
  };

  const handleRemoveRelic = (id: string) => {
    setPlacedRelics(placedRelics.filter(r => r.id !== id));
  };

  const handleReset = () => {
    setPlacedRelics([]);
  };

  const handleSave = () => {
    alert('祈祷场所布局已保存！');
  };

  return (
    <div className="min-h-full pb-20">
      <TopNav />
      
      <div className="px-4 pt-20 pb-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-amber-900 mb-2">我的祈祷场所</h1>
          <p className="text-amber-700/70 text-sm">布置专属的神圣空间</p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setShowRelicSelector(true)}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-white shadow-lg hover:from-amber-500 hover:to-amber-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>添加圣物</span>
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-3 rounded-xl bg-white border border-amber-200 text-amber-900 hover:bg-amber-50 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-3 rounded-xl bg-white border border-amber-200 text-amber-900 hover:bg-amber-50 transition-colors"
          >
            <Save className="w-5 h-5" />
          </button>
        </div>

        {/* Prayer Scene Canvas */}
        <div className="relative bg-gradient-to-b from-amber-100 via-stone-200 to-amber-50 rounded-3xl overflow-hidden shadow-2xl border border-amber-200/50 aspect-[3/4]">
          {/* Background Light Rays */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-24 h-full bg-gradient-to-b from-yellow-200/30 via-transparent to-transparent blur-2xl transform -skew-x-12" />
            <div className="absolute top-0 right-1/4 w-24 h-full bg-gradient-to-b from-yellow-200/20 via-transparent to-transparent blur-2xl transform skew-x-12" />
          </div>

          {/* Default Altar */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-gradient-to-t from-stone-400/40 to-transparent rounded-t-3xl" />
          
          {/* Placed Relics */}
          <AnimatePresence>
            {placedRelics.map((placed) => (
              <motion.div
                key={placed.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                drag
                dragMomentum={false}
                dragElastic={0.1}
                onDragStart={() => setDraggedRelic(placed.id)}
                onDragEnd={() => setDraggedRelic(null)}
                className="absolute cursor-move"
                style={{
                  left: `${placed.position.x}%`,
                  top: `${placed.position.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <div className="relative group">
                  {/* Relic Glow */}
                  {placed.nft.rarity === 'legendary' && (
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                      className="absolute inset-0 bg-yellow-400/30 rounded-full blur-xl"
                    />
                  )}
                  
                  {/* Relic Icon */}
                  <div className="relative text-5xl drop-shadow-2xl">
                    {placed.nft.image}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveRelic(placed.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>

                  {/* Sparkles for Legendary */}
                  {placed.nft.rarity === 'legendary' && (
                    <motion.div
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                      <Sparkles className="w-6 h-6 text-yellow-400 opacity-70" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty State */}
          {placedRelics.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-6xl mb-3 opacity-30">⛪</div>
                <p className="text-amber-700/50">点击添加圣物装饰您的祈祷场所</p>
              </div>
            </div>
          )}

          {/* Stats Display */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg">
              <div className="text-xs text-amber-700/70 mb-0.5">已放置</div>
              <div className="text-amber-900">{placedRelics.length} / 10</div>
            </div>
            
            {placedRelics.some(p => p.nft.rarity === 'legendary') && (
              <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl px-3 py-2 shadow-lg">
                <div className="text-xs mb-0.5">传奇圣所</div>
                <div className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span className="text-sm">已激活</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Info Card */}
        <div className="mt-6 p-4 bg-blue-50 rounded-2xl border border-blue-200">
          <div className="flex items-start gap-3">
            <div className="text-2xl">����</div>
            <div>
              <h4 className="text-blue-900 mb-1">布置提示</h4>
              <p className="text-sm text-blue-800 leading-relaxed">
                拖拽圣物到场景中任意位置进行摆放。传奇圣物会带有特殊光效，让您的祈祷场所更加神圣。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Relic Selector Modal */}
      <AnimatePresence>
        {showRelicSelector && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center"
            onClick={() => setShowRelicSelector(false)}
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              className="bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <h3 className="text-amber-900 mb-1">选择圣物</h3>
                  <p className="text-xs text-amber-700/70">从您的收藏中选择</p>
                </div>
                <button
                  onClick={() => setShowRelicSelector(false)}
                  className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
                {relicNFTs.length > 0 ? (
                  <div className="grid grid-cols-3 gap-3">
                    {relicNFTs.map((nft) => {
                      const isPlaced = placedRelics.some(p => p.nft.id === nft.id);
                      return (
                        <button
                          key={nft.id}
                          onClick={() => !isPlaced && handleAddRelic(nft)}
                          disabled={isPlaced}
                          className={`aspect-square rounded-2xl bg-gradient-to-br from-amber-50 to-stone-100 flex flex-col items-center justify-center p-3 border-2 transition-all ${
                            isPlaced
                              ? 'opacity-50 cursor-not-allowed border-gray-300'
                              : 'hover:scale-105 border-transparent hover:border-amber-400'
                          }`}
                        >
                          <div className="text-3xl mb-1">{nft.image}</div>
                          <div className="text-xs text-amber-900 text-center truncate w-full">
                            {nft.name}
                          </div>
                          {isPlaced && (
                            <div className="text-xs text-gray-500 mt-1">已放置</div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🏺</div>
                    <p className="text-amber-700/70 mb-2">暂无圣物NFT</p>
                    <p className="text-sm text-amber-700/50 mb-4">去市场购买或祈祷获取吧</p>
                    <button
                      onClick={() => setShowRelicSelector(false)}
                      className="px-6 py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-white hover:from-amber-500 hover:to-amber-700 transition-colors"
                    >
                      返回
                    </button>
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
