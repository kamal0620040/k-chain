import { useState } from "react";
import { BlockchainTypeSelector } from "../blockchain-type-selector/BlockchainTypeSelector";
import type { BlockchainType } from "@/types/blockchain-type";
import { SecretRecoveryPhrase } from "../secret-recovery-phrase/SecretRecoveryPhrase";

export const GenerateWallet = () => {
  const [selectedBlockchain, setSelectedBlockchain] = useState<
    BlockchainType | ""
  >("");

  const handleSelectBlockchain = (blockchain: BlockchainType) => {
    setSelectedBlockchain(blockchain);
  };

  if (selectedBlockchain === "") {
    return (
      <BlockchainTypeSelector handleSelectBlockchain={handleSelectBlockchain} />
    );
  }

  return (
    <div>
      <SecretRecoveryPhrase />
    </div>
  );
};
