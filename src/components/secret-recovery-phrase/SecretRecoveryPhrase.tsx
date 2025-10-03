import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { generateMnemonic, validateMnemonic } from "bip39";
import { Buffer } from "buffer";
import { toast } from "sonner";

// Make Buffer available globally for bip39
window.Buffer = Buffer;

export const SecretRecoveryPhrase = ({
  handleSetMnemonic,
}: {
  handleSetMnemonic: (mnemonic: string) => void;
}) => {
  const [secretRecoveryPhrase, setSecretRecoveryPhrase] = useState("");

  const handleGenerateSecretRecoveryPhrase = () => {
    if (secretRecoveryPhrase === "") {
      const mnemonic = generateMnemonic();
      console.log(mnemonic);
      toast.success("Secret recovery phrase generated successfully!");
      handleSetMnemonic(mnemonic);
    } else {
      if (validateMnemonic(secretRecoveryPhrase)) {
        toast.success("Secret recovery phrase validated successfully!");
        handleSetMnemonic(secretRecoveryPhrase);
      } else {
        toast.error(
          "Invalid secret recovery phrase. Please check and try again."
        );
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="text-4xl font-extrabold mt-10">
        Secret Recovery Phrase
      </div>
      <p className="mt-[-10px]">Save these words in a safe place.</p>
      <div className="flex gap-2">
        <Input
          placeholder="Enter your secret recovery phrase (or leave black to generate)"
          value={secretRecoveryPhrase}
          onChange={(e) => setSecretRecoveryPhrase(e.target.value)}
        />
        <Button onClick={handleGenerateSecretRecoveryPhrase}>Generate</Button>
      </div>
    </div>
  );
};
