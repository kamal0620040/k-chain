import { Navbar } from "@/components/navbar/Navbar";
import { ThemeProvider } from "@/provider/theme-provider";
import { GenerateWallet } from "./components/generate-wallet/GenerateWallet";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="max-w-4xl mx-auto flex flex-col">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <GenerateWallet />
        <Toaster position="top-right" richColors />
      </ThemeProvider>
    </div>
  );
}

export default App;
