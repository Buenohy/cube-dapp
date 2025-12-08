import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
  sepolia,
} from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "Cube Dapp",
  chains: [mainnet, polygon, optimism, arbitrum, base, sepolia],
  projectId: "Cube Dapp",
});

const queryClient = new QueryClient();

type RainbowKitPros = {
  childern: React.ReactNode;
};

export default function RainbowKit({ childern }: RainbowKitPros) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{childern}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
