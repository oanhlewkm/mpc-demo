import { useChainId, useSwitchChain } from "wagmi";

const CSS_BTNS: any = {
  5: "text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
  1442: "text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
  97: "text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2",
};

export default function SwitchChain() {
  const chainId = useChainId();
  const { chains, switchChain, error } = useSwitchChain();

  return (
    <div className="flex flex-col space-y-5">
      <h2 className="font-semibold">Switch Chain</h2>
      <h3>Connected to {chainId}</h3>
      <div className="flex flex-row space-x-3">
        {chains.map((chain) => (
          <button
            className={CSS_BTNS[chain.id]}
            disabled={chainId === chain.id}
            key={chain.id}
            onClick={() => switchChain({ chainId: chain.id })}
            type="button"
          >
            {chain.name}
          </button>
        ))}
      </div>
      {error?.message}
    </div>
  );
}
