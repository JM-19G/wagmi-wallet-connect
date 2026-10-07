export const PRIVY_APP_ID = "cmuxh1aw400ri0dl3236s29bl";
export const REOWN_PROJECT_ID = "fce8a0a0b16e8c52046bbb60fa00270c";

// Your TestToken from the crowdfunding assignment — reused here to demo a wagmi read interaction.
export const TEST_TOKEN_ADDRESS = "0xd375D7cA67d2852D2717c12B89b6D4B9Df00d8aD";

export const ERC20_ABI = [
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
] as const;