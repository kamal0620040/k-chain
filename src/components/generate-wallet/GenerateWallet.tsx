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
import { Copy, EyeOff, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

export const GenerateWallet = () => {
  const [selectedBlockchain, setSelectedBlockchain] = useState<
    BlockchainType | ""
  >("");
  const [mnemonic, setMnemonic] = useState<string>("");

  const handleSelectBlockchain = (blockchain: BlockchainType) => {
    setSelectedBlockchain(blockchain);
  };

  const handleSetMnemonic = (mnemonic: string) => {
    setMnemonic(mnemonic);
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
                {Array.from({ length: 12 }).map((_, index) => (
                  <p
                    key={index}
                    className="md:text-lg bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 rounded-lg p-4"
                  >
                    {index}
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
            <Button>Add Wallet</Button>
            <Button className="bg-red-700 text-white">Remove Wallet</Button>
          </div>
        </div>

        <div className="mt-10">
          <div className="flex flex-col rounded-2xl border border-primary/10">
            <div className="flex justify-between px-8 py-6">
              <h3 className="font-bold text-xl md:text-2xl tracking-tighter ">
                Wallet
              </h3>

              <Button variant="ghost" className="flex gap-2 items-center">
                <Trash className="size-4 text-destructive" />
              </Button>
            </div>
            <div className="flex flex-col gap-8 px-8 py-4 rounded-2xl bg-secondary/50">
              <div className="flex flex-col w-full gap-2" onClick={() => {}}>
                <span className="text-lg md:text-xl font-bold tracking-tighter">
                  Public Key
                </span>
                <p className="text-primary/80 font-medium cursor-pointer hover:text-primary transition-all duration-300 truncate">
                  {"publicKey"}
                </p>
              </div>
              <div className="flex flex-col w-full gap-2">
                <span className="text-lg md:text-xl font-bold tracking-tighter">
                  Private Key
                </span>
                <div className="flex justify-between w-full items-center gap-2">
                  <p
                    onClick={() => {}}
                    className="text-primary/80 font-medium cursor-pointer hover:text-primary transition-all duration-300 truncate"
                  >
                    {"•".repeat(12)}
                  </p>
                  <Button variant="ghost" onClick={() => {}}>
                    <EyeOff className="size-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
