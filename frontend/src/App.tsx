import { useState } from 'react';
import { Home } from './components/Home';
import { GlobalStats } from './components/GlobalStats';
import { NFTMarket } from './components/NFTMarket';
import { Profile } from './components/Profile';
import { PrayerPlace } from './components/PrayerPlace';
import { BottomNav } from './components/BottomNav';

export type NFTType = 'relic' | 'avatar' | 'scripture';
export type NFTRarity = 'legendary' | 'rare' | 'common';

export interface NFT {
  id: string;
  name: string;
  type: NFTType;
  rarity: NFTRarity;
  image: string;
  description: string;
  price?: number;
  owner?: string;
  listed?: boolean;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'stats' | 'market' | 'prayer' | 'profile'>('home');
  const [userNFTs, setUserNFTs] = useState<NFT[]>([]);
  const [clickCount, setClickCount] = useState(0);

  const addNFT = (nft: NFT) => {
    setUserNFTs(prev => [...prev, nft]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNFTDrop={addNFT} clickCount={clickCount} setClickCount={setClickCount} />;
      case 'stats':
        return <GlobalStats totalClicks={clickCount} />;
      case 'market':
        return <NFTMarket userNFTs={userNFTs} setUserNFTs={setUserNFTs} />;
      case 'prayer':
        return <PrayerPlace userNFTs={userNFTs} />;
      case 'profile':
        return <Profile userNFTs={userNFTs} />;
      default:
        return <Home onNFTDrop={addNFT} clickCount={clickCount} setClickCount={setClickCount} />;
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ background: 'linear-gradient(180deg, #FAF7F0 0%, #F2EDDF 50%, #EEDCB3 100%)' }}>
      <div className="flex-1 overflow-auto">
        {renderPage()}
      </div>
      <BottomNav currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}