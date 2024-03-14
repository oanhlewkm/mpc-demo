"use client";
import { useAccount, useBalance, useChainId } from "wagmi";

export default function Balance() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { data: default_ } = useBalance({ address });
  const { data: account_ } = useBalance({
    address,
    token: "0x1AaE1d7fDb17D25804470149e5e165385007DC44",
    chainId,
  });

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="font-semibold">Balance</h2>
      <div>Balance (Default Chain): {default_?.formatted}</div>
      <div>Balance (Account Chain): {account_?.formatted}</div>
    </div>
  );
}
