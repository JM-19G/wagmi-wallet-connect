import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useAccount, useBalance, useReadContract } from "wagmi";
import { formatEther, formatUnits } from "viem";
import { TEST_TOKEN_ADDRESS, ERC20_ABI } from "../config/keys";

const PrivyConnect = () => {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const { wallets } = useWallets();
  const { address, isConnected, chain } = useAccount();

  const { data: ethBalance, isLoading: isBalanceLoading } = useBalance({
    address,
    chainId: 11155111,
    query: { enabled: isConnected && !!address },
  });

  const { data: tokenBalance } = useReadContract({
    address: TEST_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
    query: { enabled: isConnected && !!address },
  });

  const { data: tokenDecimals } = useReadContract({
    address: TEST_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: "decimals",
    query: { enabled: isConnected },
  });

  const { data: tokenSymbol } = useReadContract({
    address: TEST_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: "symbol",
    query: { enabled: isConnected },
  });

  const shortenAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  const cardClass =
    "bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 shadow-lg shadow-black/20";

  if (!ready) {
    return (
      <div className="min-h-screen bg-[#05070d] text-white flex items-center justify-center">
        <div className="flex items-center gap-3 text-slate-400">
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          Loading Privy...
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-[#05070d] text-white px-4 py-10 sm:py-16 overflow-hidden">
            {/* Background: aurora mesh + noise grain */}
            <div className="pointer-events-none fixed inset-0 overflow-hidden bg-[#06070a]">
                <div
                  className="absolute -top-1/3 left-0 right-0 h-[60%]"
                  style={{
                    background:
                    "radial-gradient(60% 80% at 20% 20%, rgba(99,102,241,0.35), transparent 60%), radial-gradient(50% 70% at 80% 10%, rgba(56,189,248,0.25), transparent 60%), radial-gradient(40% 60% at 50% 40%, rgba(16,185,129,0.15), transparent 60%)",
                    filter: "blur(60px)",
                 }}
                />
                <div className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                   }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#06070a]" />
            </div>

      <div className="relative max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-300 bg-clip-text text-transparent mb-2">
          Privy Wallet Connection
        </h1>
        <p className="text-slate-400 mb-8 text-sm sm:text-base">
          Connect using Privy's login flow, then run read interactions through wagmi.
        </p>

        <div className={cardClass}>
          {!authenticated ? (
            <div className="text-center py-6">
              <p className="text-slate-400 text-sm mb-5">
                Sign in with a wallet, email, or social account via Privy.
              </p>
              <button
                onClick={login}
                className="bg-indigo-500 hover:bg-indigo-400 transition-colors text-white font-semibold px-6 py-2.5 rounded-lg"
              >
                Login with Privy
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Authenticated
                </span>
                <button
                  onClick={logout}
                  className="bg-red-500/20 hover:bg-red-500/30 text-red-300 text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                >
                  Logout
                </button>
              </div>

              <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 space-y-2 text-sm">
                <p>
                  <span className="text-slate-400">Privy user ID:</span>{" "}
                  <span className="font-mono text-xs">{user?.id}</span>
                </p>
                <p>
                  <span className="text-slate-400">Linked wallets:</span> {wallets.length}
                </p>
              </div>

              {isConnected ? (
                <div className="bg-slate-900/60 border border-white/10 rounded-xl p-4 space-y-2 text-sm">
                  <p>
                    <span className="text-slate-400">wagmi address:</span>{" "}
                    <span className="font-mono">{shortenAddress(address!)}</span>
                  </p>
                  <p>
                    <span className="text-slate-400">Chain:</span>{" "}
                    <span className="text-indigo-300 font-medium">{chain?.name ?? "Unknown"}</span>
                  </p>
                  <p>
                    <span className="text-slate-400">ETH balance:</span>{" "}
                    {isBalanceLoading
                      ? "Loading..."
                      : ethBalance?.value !== undefined
                      ? `${formatEther(ethBalance.value)} ETH`
                      : "Unavailable"}
                  </p>
                  <p>
                    <span className="text-slate-400">Test token balance:</span>{" "}
                    {tokenBalance !== undefined && tokenDecimals !== undefined
                      ? `${formatUnits(tokenBalance, tokenDecimals)} ${tokenSymbol ?? ""}`
                      : "Loading..."}
                  </p>
                </div>
              ) : (
                <p className="text-slate-400 text-sm bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                  No wallet connected to wagmi yet — connect a wallet inside Privy to see on-chain data.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrivyConnect;