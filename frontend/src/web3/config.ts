import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  mainnet,
  sepolia,
  polygon,
  optimism,
  arbitrum,
  base,
  hardhat,
} from 'wagmi/chains';

// Replace with your actual Project ID from WalletConnect
const projectId = 'YOUR_PROJECT_ID';

export const config = getDefaultConfig({
  appName: 'Pray1209',
  projectId,
  chains: [hardhat, mainnet, sepolia, polygon, optimism, arbitrum, base],
  ssr: false, // If your dApp uses server side rendering (SSR)
});
