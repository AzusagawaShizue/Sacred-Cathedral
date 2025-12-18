import { renderHook, act } from '@testing-library/react';
import { useWeb3Service } from '../useWeb3Service';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock wagmi and rainbowkit
vi.mock('wagmi', () => ({
  useAccount: vi.fn(),
  useDisconnect: vi.fn(),
  useSignMessage: vi.fn(),
  useSwitchChain: vi.fn(),
  useChainId: vi.fn(),
  useBalance: vi.fn(),
}));

vi.mock('@rainbow-me/rainbowkit', () => ({
  useConnectModal: vi.fn(),
}));

import { useAccount, useDisconnect, useSignMessage, useSwitchChain, useChainId, useBalance } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

describe('useWeb3Service', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // Default mocks
    (useAccount as any).mockReturnValue({ 
      address: undefined, 
      isConnected: false, 
      isConnecting: false 
    });
    (useDisconnect as any).mockReturnValue({ disconnect: vi.fn() });
    (useSignMessage as any).mockReturnValue({ signMessageAsync: vi.fn() });
    (useSwitchChain as any).mockReturnValue({ switchChainAsync: vi.fn() });
    (useChainId as any).mockReturnValue(1);
    (useBalance as any).mockReturnValue({ data: undefined });
    (useConnectModal as any).mockReturnValue({ openConnectModal: vi.fn() });
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useWeb3Service());

    expect(result.current.isConnected).toBe(false);
    expect(result.current.address).toBeUndefined();
    expect(result.current.chainId).toBe(1);
  });

  it('should call openConnectModal when connect is called', () => {
    const openConnectModalMock = vi.fn();
    (useConnectModal as any).mockReturnValue({ openConnectModal: openConnectModalMock });

    const { result } = renderHook(() => useWeb3Service());

    act(() => {
      result.current.connect();
    });

    expect(openConnectModalMock).toHaveBeenCalled();
  });

  it('should call disconnect when disconnect is called', () => {
    const disconnectMock = vi.fn();
    (useDisconnect as any).mockReturnValue({ disconnect: disconnectMock });

    const { result } = renderHook(() => useWeb3Service());

    act(() => {
      result.current.disconnect();
    });

    expect(disconnectMock).toHaveBeenCalled();
  });

  it('should return address when connected', () => {
    const testAddress = '0x1234567890123456789012345678901234567890';
    (useAccount as any).mockReturnValue({ 
      address: testAddress, 
      isConnected: true, 
      isConnecting: false 
    });

    const { result } = renderHook(() => useWeb3Service());

    expect(result.current.isConnected).toBe(true);
    expect(result.current.address).toBe(testAddress);
  });
});
