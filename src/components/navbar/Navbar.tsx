import { Box } from "lucide-react";
import { ModeToggle } from "../mode-toggle/ModeToggle";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center py-4">
      <div className="flex items-center gap-2">
        <Box className="size-8" />
        <div className="tracking-tighter text-3xl font-extrabold text-primary flex gap-2 items-center">
          K-Chain
        </div>
      </div>
      <ModeToggle />
    </nav>
  );
};
