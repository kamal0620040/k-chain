import type { BlockchainType } from "@/types/blockchain-type";

export interface Wallet {
  publicKey: string;
  privateKey: string;
  mnemonic: string;
  path: string;
}

const STORAGE_KEYS = {
  WALLETS: "k-chain-wallets",
  MNEMONIC: "k-chain-mnemonic",
  BLOCKCHAIN: "k-chain-blockchain",
} as const;

export const storage = {
  // Save wallets to localStorage
  saveWallets: (wallets: Wallet[]): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.WALLETS, JSON.stringify(wallets));
    } catch (error) {
      console.error("Failed to save wallets to localStorage:", error);
    }
  },

  // Load wallets from localStorage
  loadWallets: (): Wallet[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.WALLETS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error("Failed to load wallets from localStorage:", error);
      return [];
    }
  },

  // Save mnemonic to localStorage
  saveMnemonic: (mnemonic: string): void => {
    try {
      localStorage.setItem(STORAGE_KEYS.MNEMONIC, mnemonic);
    } catch (error) {
      console.error("Failed to save mnemonic to localStorage:", error);
    }
  },

  // Load mnemonic from localStorage
  loadMnemonic: (): string => {
    try {
      return localStorage.getItem(STORAGE_KEYS.MNEMONIC) || "";
    } catch (error) {
      console.error("Failed to load mnemonic from localStorage:", error);
      return "";
    }
  },

  // Save blockchain type to localStorage
  saveBlockchain: (blockchain: BlockchainType | ""): void => {
    try {
      if (blockchain) {
        localStorage.setItem(STORAGE_KEYS.BLOCKCHAIN, blockchain);
      }
    } catch (error) {
      console.error("Failed to save blockchain to localStorage:", error);
    }
  },

  // Load blockchain type from localStorage
  loadBlockchain: (): BlockchainType | "" => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.BLOCKCHAIN);
      return (stored as BlockchainType) || "";
    } catch (error) {
      console.error("Failed to load blockchain from localStorage:", error);
      return "";
    }
  },

  // Clear all wallet data from localStorage
  clearAll: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.WALLETS);
      localStorage.removeItem(STORAGE_KEYS.MNEMONIC);
      localStorage.removeItem(STORAGE_KEYS.BLOCKCHAIN);
    } catch (error) {
      console.error("Failed to clear localStorage:", error);
    }
  },

  // Clear only wallets (keep mnemonic and blockchain)
  clearWallets: (): void => {
    try {
      localStorage.removeItem(STORAGE_KEYS.WALLETS);
    } catch (error) {
      console.error("Failed to clear wallets from localStorage:", error);
    }
  },
};
