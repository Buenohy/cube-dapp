import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

export default function CustomConnectButton() {
  return (
    <ConnectButton
      label="Sing in"
      showBalance={{
        smallScreen: true,
        largeScreen: true,
      }}
      accountStatus={{
        smallScreen: "address",
        largeScreen: "full",
      }}
      chainStatus={{
        smallScreen: "none",
        largeScreen: "full",
      }}
    />
  );
}
