import { Button } from "@/components/ui/button";
import { type BlockchainType } from "@/types/blockchain-type";

export const BlockchainTypeSelector = ({
  handleSelectBlockchain,
}: {
  handleSelectBlockchain: (blockchain: BlockchainType) => void;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-4xl font-extrabold mt-10">
        K-Chain supports multiple blockchains
      </div>
      <p className="mt-[-10px]">Choose a blockchain to get started</p>
      <div className="flex gap-2">
        <Button onClick={() => handleSelectBlockchain("solana")}>Solana</Button>
        <Button onClick={() => handleSelectBlockchain("ethereum")}>
          Ethereum
        </Button>
      </div>
    </div>
  );
};
