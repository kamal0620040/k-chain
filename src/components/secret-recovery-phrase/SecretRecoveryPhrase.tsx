import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export const SecretRecoveryPhrase = () => {
  const [secretRecoveryPhrase, setSecretRecoveryPhrase] = useState("");

  const handleGenerateSecretRecoveryPhrase = () => {
    console.log("Generate secret recovery phrase");
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
