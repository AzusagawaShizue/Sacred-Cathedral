# Web3 Access Layer Module

This module provides a highly decoupled Web3 access layer using Wagmi and RainbowKit.

## Features

- **Wallet Connection**: Supports MetaMask, WalletConnect, and other mainstream wallets via RainbowKit.
- **State Management**: Encapsulated in `useWeb3Service` hook.
- **Decoupled API**: Generic `connect`, `disconnect`, `signMessage`, etc. methods.
- **Type Safety**: Full TypeScript support.

## Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install @rainbow-me/rainbowkit wagmi viem @tanstack/react-query
```

## Configuration

Edit `src/web3/config.ts` to update `projectId` (WalletConnect) and supported chains.

```typescript
const projectId = 'YOUR_PROJECT_ID'; // Get one from cloud.walletconnect.com
```

## Usage

### 1. Wrap your application

Ensure `Web3Provider` wraps your app (already done in `src/main.tsx`).

```tsx
import { Web3Provider } from '@/web3/Web3Provider';

<Web3Provider>
  <App />
</Web3Provider>
```

### 2. Use the Connect Button

Use the pre-built `ConnectWalletButton` component anywhere in your UI.

```tsx
import { ConnectWalletButton } from '@/web3/ConnectWalletButton';

<ConnectWalletButton />
// Or with options
<ConnectWalletButton showBalance={true} label="Connect Now" />
```

### 3. Use the Hook (Custom UI)

If you want to build your own UI or access Web3 functionality programmatically:

```tsx
import { useWeb3Service } from '@/web3/useWeb3Service';

const MyComponent = () => {
  const { connect, disconnect, isConnected, address, signMessage } = useWeb3Service();

  const handleSign = async () => {
    try {
      const signature = await signMessage("Hello Web3");
      console.log(signature);
    } catch (e) {
      console.error(e);
    }
  };

  if (isConnected) {
    return (
      <div>
        <p>Connected: {address}</p>
        <button onClick={() => disconnect()}>Disconnect</button>
        <button onClick={handleSign}>Sign Message</button>
      </div>
    );
  }

  return <button onClick={() => connect()}>Connect Wallet</button>;
};
```

## Architecture

- **`config.ts`**: Wagmi and RainbowKit configuration.
- **`Web3Provider.tsx`**: Context provider combining Wagmi, QueryClient, and RainbowKit.
- **`useWeb3Service.ts`**: Facade hook that exposes a clean API, decoupling components from direct Wagmi dependencies where possible.
- **`ConnectWalletButton.tsx`**: Reusable UI component.
