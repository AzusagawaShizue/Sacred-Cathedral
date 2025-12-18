import { useAccount, useDisconnect, useSignMessage, useSwitchChain, useChainId, useBalance } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useCallback } from 'react';
import { type Address } from 'viem';

export interface Web3Service {
  // Connection
  connect: () => void;
  disconnect: () => void;
  isConnected: boolean;
  isConnecting: boolean;
  
  // Account
  address: Address | undefined;
  chainId: number;
  balance: {
    formatted: string;
    symbol: string;
    value: bigint;
  } | undefined;
  
  // Actions
  signMessage: (message: string) => Promise<string>;
  switchNetwork: (chainId: number) => Promise<void>;
}

export const useWeb3Service = (): Web3Service => {
  const { openConnectModal } = useConnectModal();
  const { address, isConnected, isConnecting } = useAccount();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { switchChainAsync } = useSwitchChain();
  const chainId = useChainId();
  const { data: balance } = useBalance({ address });

  const handleConnect = useCallback(() => {
    if (openConnectModal) {
      openConnectModal();
    } else {
      console.warn('Connect modal not available');
    }
  }, [openConnectModal]);

  const handleDisconnect = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const handleSignMessage = useCallback(async (message: string) => {
    try {
      return await signMessageAsync({ message });
    } catch (error) {
      console.error('Error signing message:', error);
      throw error;
    }
  }, [signMessageAsync]);

  const handleSwitchNetwork = useCallback(async (targetChainId: number) => {
    try {
      await switchChainAsync({ chainId: targetChainId });
    } catch (error) {
      console.error('Error switching network:', error);
      throw error;
    }
  }, [switchChainAsync]);

  return {
    connect: handleConnect,
    disconnect: handleDisconnect,
    isConnected,
    isConnecting,
    address,
    chainId,
    balance: balance ? {
      formatted: balance.formatted,
      symbol: balance.symbol,
      value: balance.value,
    } : undefined,
    signMessage: handleSignMessage,
    switchNetwork: handleSwitchNetwork,
  };
};
