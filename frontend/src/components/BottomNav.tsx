import { Home, BarChart3, ShoppingBag, Church, User } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  currentPage: 'home' | 'stats' | 'market' | 'prayer' | 'profile';
  onPageChange: (page: 'home' | 'stats' | 'market' | 'prayer' | 'profile') => void;
}

export function BottomNav({ currentPage, onPageChange }: BottomNavProps) {
  const navItems = [
    { id: 'home' as const, icon: Home, label: '首页' },
    { id: 'stats' as const, icon: BarChart3, label: '统计' },
    { id: 'market' as const, icon: ShoppingBag, label: '市场' },
    { id: 'prayer' as const, icon: Church, label: '圣所' },
    { id: 'profile' as const, icon: User, label: '我的' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass-gold shadow-2xl"
      style={{
        borderTop: '1px solid rgba(238, 220, 179, 0.3)',
      }}>
      <div className="flex items-center justify-around px-2 py-2 relative">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(item.id)}
              className={`relative flex flex-col items-center gap-1 px-4 py-2 rounded-2xl transition-all duration-300 ${
                isActive ? '' : 'hover:bg-white/30'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#295EE7] to-[#1E2A5A] shadow-xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  style={{
                    boxShadow: '0 4px 20px rgba(41, 94, 231, 0.4), inset 0 0 20px rgba(255, 255, 255, 0.1)',
                  }}
                />
              )}
              
              <motion.div
                animate={isActive ? {
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <Icon 
                  className={`w-5 h-5 ${isActive ? 'text-white' : 'text-[#1E2A5A]'}`}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </motion.div>
              
              <span className={`text-xs relative z-10 ${isActive ? 'text-white' : 'text-[#1E2A5A]/70'}`}>
                {item.label}
              </span>
              
              {/* Active Glow */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    boxShadow: '0 0 20px rgba(41, 94, 231, 0.3)',
                  }}
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
