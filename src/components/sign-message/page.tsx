"use client";
import { useEffect, useState } from "react";
import { useSignMessage } from "wagmi";

export default function SignMessage() {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data, signMessage, isError, isSuccess, error } = useSignMessage();

  useEffect(() => {
    if (data) {
      console.log("data: ", data);
      setIsLoading(false);
      setMessage("");
    }
  }, [data]);

  useEffect(() => {
    if (isError || isSuccess) {
      setIsLoading(false);
    }
  }, [isError, isSuccess]);

  return (
    <div className="container">
      <div className="flex flex-col space-y-4">
        <h2 className="font-semibold">Sign Message</h2>
        <form className="flex flex-col space-y-4">
          <textarea
            id="message"
            name="message"
            placeholder="Enter a message to sign"
            defaultValue={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            disabled={isLoading}
            type="button"
            onClick={() => {
              setIsLoading(true);
              signMessage({ message });
            }}
            className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            {isLoading ? "Check Wallet" : "Sign Message"}
          </button>
        </form>
        {data && (
          <div className="flex flex-col space-y-4">
            <h4 className="break-words">{data}</h4>
          </div>
        )}
        {error && (
          <div className="flex flex-col space-y-4">
            <h4 className="break-words text-red-600">{error.message}</h4>
          </div>
        )}
      </div>
    </div>
  );
}
