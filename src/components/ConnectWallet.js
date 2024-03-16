import {
  createWeb3Modal,
  defaultConfig,
  useWeb3ModalAccount,
} from "@web3modal/ethers5/react";

// 1. Get projectId
const projectId =
  process.env.REACT_APP_WEB3_MODAL_PROJECT_ID ||
  "b33caa78d626402d07b18cd662bea700";

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const sepollia = {
  chainId: 11155111,
  name: "Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: "https://rpc.sepolia.org	",
};

const mumbai = {
  chainId: 80001,
  name: "Mumbai",
  currency: "MATIC",
  explorerUrl: "https://mumbai.polygonscan.com",
  rpcUrl: "https://rpc-mumbai.maticvigil.com",
};

// 3. Create modal
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [mainnet, sepollia, mumbai],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  themeMode: "dark",
});

const ConnectWallet = () => {
  let acc = useWeb3ModalAccount();
  return (
    <div>
      <w3m-button />
    </div>
  );
};

export default ConnectWallet;
