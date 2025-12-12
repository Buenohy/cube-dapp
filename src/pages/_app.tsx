import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import { SessionProvider } from "next-auth/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import {
  RainbowKitProvider,
  darkTheme,
  type Locale,
} from "@rainbow-me/rainbowkit";
import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from "@rainbow-me/rainbowkit-siwe-next-auth";

import { config } from "../wagmi";

const queryClient = new QueryClient();

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Sign in to my Cube Dapp",
});

function MyApp({ Component, pageProps }: AppProps) {
  const { locale } = useRouter() as { locale: Locale };

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <SessionProvider refetchInterval={0} session={pageProps.session}>
          <RainbowKitSiweNextAuthProvider
            getSiweMessageOptions={getSiweMessageOptions}
          >
            <RainbowKitProvider
              locale="en"
              modalSize="wide"
              theme={darkTheme({
                accentColor: "#00c951",
                accentColorForeground: "white",
                borderRadius: "large",
                fontStack: "system",
                overlayBlur: "small",
              })}
              showRecentTransactions={true}
            >
              <Component {...pageProps} />
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default MyApp;
