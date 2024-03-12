"use client";
import { useAccount, useBalance } from "wagmi";

export default function Balance() {
  const { address } = useAccount();

  const { data: default_ } = useBalance({ address });
  const { data: account_ } = useBalance({ address });

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="font-semibold">Balance</h2>
      <div>Balance (Default Chain): {default_?.formatted}</div>
      <div>Balance (Account Chain): {account_?.formatted}</div>
    </div>
  );
}
