import { useState } from "react";
import { BlockchainTypeSelector } from "@/components/blockchain-type-selector/BlockchainTypeSelector";
import type { BlockchainType } from "@/types/blockchain-type";
import { SecretRecoveryPhrase } from "@/components/secret-recovery-phrase/SecretRecoveryPhrase";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Copy, Eye, EyeOff, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import { ethers } from "ethers";
import { toast } from "sonner";

interface Wallet {
  publicKey: string;
  privateKey: string;
  mnemonic: string;
  path: string;
}

export const GenerateWallet = () => {
  const [selectedBlockchain, setSelectedBlockchain] = useState<
    BlockchainType | ""
  >("");
  const [mnemonic, setMnemonic] = useState<string>("");
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [visiblePrivateKeys, setVisiblePrivateKeys] = useState<{
    [key: number]: boolean;
  }>({});

  const handleSelectBlockchain = (blockchain: BlockchainType) => {
    setSelectedBlockchain(blockchain);
  };

  const handleSetMnemonic = (mnemonic: string) => {
    setMnemonic(mnemonic);
  };

  const generateWalletFromMnemonic = (
    pathType: string,
    mnemonic: string,
    accountIndex: number
  ): Wallet | null => {
    try {
      const seedBuffer = mnemonicToSeedSync(mnemonic);
      const path = `m/44'/${pathType}'/0'/${accountIndex}'`;
      const { key: derivedSeed } = derivePath(path, seedBuffer.toString("hex"));

      let publicKeyEncoded: string;
      let privateKeyEncoded: string;

      if (pathType === "501") {
        // Solana
        const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
        const keypair = Keypair.fromSecretKey(secretKey);

        privateKeyEncoded = bs58.encode(secretKey);
        publicKeyEncoded = keypair.publicKey.toBase58();
      } else if (pathType === "60") {
        // Ethereum
        const privateKey = Buffer.from(derivedSeed).toString("hex");
        privateKeyEncoded = privateKey;

        const wallet = new ethers.Wallet(privateKey);
        publicKeyEncoded = wallet.address;
      } else {
        toast.error("Unsupported path type.");
        return null;
      }

      return {
        publicKey: publicKeyEncoded,
        privateKey: privateKeyEncoded,
        mnemonic,
        path,
      };
    } catch (error) {
      console.error("Wallet generation error:", error);
      toast.error("Failed to generate wallet. Please try again.");
      return null;
    }
  };

  const handleAddWallet = () => {
    const pathType = selectedBlockchain === "solana" ? "501" : "60";
    const newWallet = generateWalletFromMnemonic(
      pathType,
      mnemonic,
      wallets.length
    );

    if (newWallet) {
      setWallets([...wallets, newWallet]);
      toast.success("Wallet added successfully!");
    }
  };

  const handleRemoveWallet = (index: number) => {
    const newWallets = wallets.filter((_, i) => i !== index);
    setWallets(newWallets);
    const newVisibleKeys = { ...visiblePrivateKeys };
    delete newVisibleKeys[index];
    setVisiblePrivateKeys(newVisibleKeys);
    toast.success("Wallet removed successfully!");
  };

  const handleRemoveAllWallets = () => {
    setWallets([]);
    setVisiblePrivateKeys({});
    toast.success("All wallets removed successfully!");
  };

  const togglePrivateKeyVisibility = (index: number) => {
    setVisiblePrivateKeys({
      ...visiblePrivateKeys,
      [index]: !visiblePrivateKeys[index],
    });
  };

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success(`${label} copied to clipboard!`);
    } catch (error) {
      console.error("Clipboard error:", error);
      toast.error("Failed to copy to clipboard");
    }
  };

  if (selectedBlockchain === "") {
    return (
      <BlockchainTypeSelector handleSelectBlockchain={handleSelectBlockchain} />
    );
  }

  if (mnemonic === "") {
    return <SecretRecoveryPhrase handleSetMnemonic={handleSetMnemonic} />;
  }

  return (
    <div>
      <div className="mt-10">
        <Accordion type="single" collapsible>
          <AccordionItem
            value="item-1"
            className="border-1 border-gray-200 rounded-sm last:border-b-1"
          >
            <AccordionTrigger className="flex items-center justify-between text-2xl font-extrabold rounded-md p-6 px-8">
              Your Secret Phrase
            </AccordionTrigger>
            <AccordionContent className="px-8">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center w-full items-center mx-auto my-8">
                {mnemonic?.split(" ")?.map((word, index) => (
                  <p
                    key={`${word}-${index}`}
                    onClick={() => copyToClipboard(mnemonic, "Secret phrase")}
                    className="md:text-lg bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 rounded-lg p-4 cursor-pointer"
                  >
                    {word}
                  </p>
                ))}
              </div>
              <div className="text-sm md:text-base text-primary/50 flex w-full gap-2 items-center group-hover:text-primary/80 transition-all duration-300">
                <Copy className="size-4" /> Click Anywhere To Copy
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-extrabold">
            {selectedBlockchain.toUpperCase()} Wallet
          </div>
          <div className="flex gap-2">
            <Button onClick={handleAddWallet}>Add Wallet</Button>
            <Button
              className="bg-red-700 text-white hover:bg-red-800"
              onClick={handleRemoveAllWallets}
              disabled={wallets.length === 0}
            >
              Remove All Wallets
            </Button>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-6">
          {wallets.length === 0 ? (
            <div className="text-center py-12 text-primary/50">
              <p className="text-lg">
                No wallets yet. Click "Add Wallet" to create one.
              </p>
            </div>
          ) : (
            wallets.map((wallet, index) => (
              <div
                key={index}
                className="flex flex-col rounded-2xl border border-primary/10"
              >
                <div className="flex justify-between px-8 py-6">
                  <h3 className="font-bold text-xl md:text-2xl tracking-tighter">
                    Wallet {index + 1}
                  </h3>

                  <Button
                    variant="ghost"
                    className="flex gap-2 items-center"
                    onClick={() => handleRemoveWallet(index)}
                  >
                    <Trash className="size-4 text-destructive" />
                  </Button>
                </div>
                <div className="flex flex-col gap-8 px-8 py-4 rounded-2xl bg-secondary/50">
                  <div className="flex flex-col w-full gap-2">
                    <span className="text-lg md:text-xl font-bold tracking-tighter">
                      Public Key
                    </span>
                    <p
                      onClick={() =>
                        copyToClipboard(wallet.publicKey, "Public key")
                      }
                      className="text-primary/80 font-medium cursor-pointer hover:text-primary transition-all duration-300 truncate"
                    >
                      {wallet.publicKey}
                    </p>
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <span className="text-lg md:text-xl font-bold tracking-tighter">
                      Private Key
                    </span>
                    <div className="flex justify-between w-full items-center gap-2">
                      <p
                        onClick={() =>
                          visiblePrivateKeys[index] &&
                          copyToClipboard(wallet.privateKey, "Private key")
                        }
                        className={`text-primary/80 font-medium ${
                          visiblePrivateKeys[index]
                            ? "cursor-pointer hover:text-primary"
                            : ""
                        } transition-all duration-300 truncate`}
                      >
                        {visiblePrivateKeys[index]
                          ? wallet.privateKey
                          : "•".repeat(64)}
                      </p>
                      <Button
                        variant="ghost"
                        onClick={() => togglePrivateKeyVisibility(index)}
                      >
                        {visiblePrivateKeys[index] ? (
                          <EyeOff className="size-4" />
                        ) : (
                          <Eye className="size-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
