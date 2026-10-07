import { sepolia } from "wagmi/chains";
import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { REOWN_PROJECT_ID } from "./keys";

const networks = [sepolia] as const;

export const wagmiAdapter = new WagmiAdapter({
  networks: [...networks],
  projectId: REOWN_PROJECT_ID,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;

// AppKit modal — this gives you the "Connect Wallet" button/modal UI for WalletConnect.
createAppKit({
  adapters: [wagmiAdapter],
  networks: [...networks],
  projectId: REOWN_PROJECT_ID,
  metadata: {
    name: "Wagmi Wallet Connect Demo",
    description: "Class assignment: Privy + wagmi + AppKit",
    url: "http://localhost:5173",
    icons: ["https://avatars.githubusercontent.com/u/37784886"],
  },
});