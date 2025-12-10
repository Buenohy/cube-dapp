import React from "react";
import CustomConnectButton from "./CustomConnectButton";

export default function Header() {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="mb-2 text-6xl text-green-500 sm:text-4xl">Cube</span>
      <CustomConnectButton />
    </div>
  );
}
