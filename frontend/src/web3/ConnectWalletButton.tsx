import React from 'react';
import { Button } from '@/components/ui/button';
import { useWeb3Service } from './useWeb3Service';
import { shortenAddress } from './utils';

interface ConnectWalletButtonProps extends React.ComponentProps<typeof Button> {
  label?: string;
  showBalance?: boolean;
  className?: string;
}

export const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({
  label = 'Connect Wallet',
  showBalance = false,
  className,
  ...props
}) => {
  const { connect, disconnect, isConnected, isConnecting, address, balance } = useWeb3Service();

  const handleClick = () => {
    if (isConnected) {
      disconnect();
    } else {
      connect();
    }
  };

  if (isConnected && address) {
    return (
      <Button variant="outline" onClick={handleClick} className={className} {...props}>
        {showBalance && balance && <span className="mr-2">{balance.formatted.slice(0, 5)} {balance.symbol}</span>}
        {shortenAddress(address)}
      </Button>
    );
  }

  return (
    <Button onClick={handleClick} disabled={isConnecting} className={className} {...props}>
      {isConnecting ? 'Connecting...' : label}
    </Button>
  );
};
