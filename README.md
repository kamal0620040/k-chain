# K-Chain

K-Chain is a wallet generator built with React and TypeScript. It enables users to generate and manage multi-chain wallets for both Solana and Ethereum using BIP39/BIP44 standards.

## Features

### Wallet Generation

- **Multi-Blockchain Support**: Generate wallets for Solana (BIP44 path: `m/44'/501'/0'/accountIndex'`) and Ethereum (BIP44 path: `m/44'/60'/0'/accountIndex'`)
- **BIP39 Mnemonic**: Create new 12-word recovery phrases or import existing ones
- **Multiple Wallets**: Generate multiple wallets from the same mnemonic with incrementing account indices
- **Hierarchical Deterministic**: Uses BIP32/BIP44 standards for secure key derivation

### Security Features

- **Private Key Protection**: Private keys are hidden by default and displayed as dots
- **Toggle Visibility**: Show/hide individual private keys with eye icon
- **Secure Generation**: Uses industry-standard cryptographic libraries (ed25519-hd-key, tweetnacl)
- **Client-Side Only**: All wallet generation happens in your browser - no server communication

### User Experience

- **Copy to Clipboard**: One-click copy for mnemonic phrases, public keys, and private keys
- **Toast Notifications**: Real-time feedback for all actions
- **Dark/Light Theme**: Toggle between themes with persistent preferences
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Local Storage**: Automatically saves wallets and preferences (with option to clear)

### Data Management

- **Auto-Save**: Wallets, mnemonics, and blockchain selection persist across sessions
- **Remove Individual Wallets**: Delete specific wallets while keeping others
- **Remove All Wallets**: Clear all wallets while preserving your mnemonic
- **Clear All Data**: Complete reset with confirmation dialog

## Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd k-chain
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## How It Works

### 1. Blockchain Selection

Users first select their preferred blockchain (Solana or Ethereum). This choice determines the BIP44 derivation path used for generating wallets.

### 2. Mnemonic Generation/Import

- **Generate New**: Creates a secure 12-word BIP39 mnemonic phrase
- **Import Existing**: Validates and uses an existing recovery phrase

### 3. Wallet Derivation

The application uses the following process:

1. Convert mnemonic to seed using `mnemonicToSeedSync()`
2. Derive keys using BIP44 path: `m/44'/{coin_type}'/0'/{account_index}'`
   - Solana: coin_type = 501
   - Ethereum: coin_type = 60
3. Generate keypairs:
   - **Solana**: Uses ed25519 curve with tweetnacl
   - **Ethereum**: Uses secp256k1 curve with ethers.js

### 4. Key Display

- **Public Key**: Always visible, click to copy
- **Private Key**: Hidden by default (shown as dots), toggle visibility with eye icon
- **Mnemonic**: Displayed in expandable accordion, click any word to copy entire phrase

### 5. Local Storage

All data is automatically saved to browser's localStorage:

- `k-chain-wallets`: Wallet data (public/private keys)
- `k-chain-mnemonic`: Recovery phrase
- `k-chain-blockchain`: Selected blockchain type

### Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```
