import { Web3Auth } from "@web3auth/modal";
import React from "react";
type MFAProps = {
  web3Auth: Web3Auth;
};
export default function MFA({ web3Auth }: MFAProps) {
  const handleMFA = () => {
    if (!web3Auth) {
      console.log("web3auth not initialized yet");
      return;
    }
    web3Auth.enableMFA();
  };
  return (
    <button
      className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
      onClick={handleMFA}
    >
      Set 2FA account
    </button>
  );
}
