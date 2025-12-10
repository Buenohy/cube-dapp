"use client";
import React from "react";
import { useAccount, useBalance, useBlockNumber, useChainId } from "wagmi";

import { formatUnits } from "viem";

export default function ReadBalance() {
  const { address } = useAccount();

  const { data: balanceNumber } = useBalance({ address });

  const { data: blockNumber } = useBlockNumber({ watch: true });

  const chainId = useChainId();
  return (
    <div>
      <p>Carteira:</p>
      <p>{address}</p>
      <p>O seu saldo é:</p>
      <p>
        {balanceNumber?.formatted} {balanceNumber?.symbol}
      </p>
      <p>Block:</p>
      <p>{blockNumber?.toString()}</p>
      <p>Chain Id:</p>
      <p>{chainId}</p>
    </div>
  );
}
