"use client";
import { FormEvent } from "react";
import {
  useWaitForTransactionReceipt,
  useSendTransaction,
  BaseError,
} from "wagmi";
import { Hex, parseEther } from "viem";
import { clsx } from "clsx";

export function SendTransaction() {
  const {
    data: hash,
    error,
    isPending,
    sendTransaction,
  } = useSendTransaction();

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const to = formData.get("address") as Hex;
    const value = formData.get("value") as string;
    sendTransaction({ to, value: parseEther(value) });
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  return (
    <div>
      <h2>Send Transaction</h2>
      <form
        className="flex flex-col space-y-4 text-left min-w-64"
        onSubmit={submit}
      >
        {/* register your input into the hook by invoking the "register" function */}
        <div className="flex flex-col space-y-1 text-left">
          <input
            autoFocus
            type="text"
            id="email-input"
            name="address"
            placeholder="Address"
            className={clsx(
              "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            )}
          />
        </div>
        <div className="flex flex-col space-y-1 text-left">
          {/* include validation with required or other standard HTML validation rules */}
          <input
            id="password-input"
            name="value"
            type="number"
            step="0.000000001"
            placeholder="Amount (ETH)"
            className={clsx(
              "border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            )}
          />
        </div>
        <div className="w-full">
          <button
            disabled={isPending}
            type="submit"
            className="w-full text-white bg-violet-500 font-light rounded-full text-sm px-5 py-2.5 me-2 mb-2"
          >
            {isPending ? "Confirming..." : "Send"}
          </button>
        </div>
      </form>
      {hash && <div>Transaction Hash: {hash}</div>}
      {isConfirming && "Waiting for confirmation..."}
      {isConfirmed && "Transaction confirmed."}
      {error && (
        <div>Error: {(error as BaseError).shortMessage || error.message}</div>
      )}
    </div>
  );
}
