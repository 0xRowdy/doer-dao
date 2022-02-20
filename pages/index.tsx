import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Header from "../components/globalNav";
import Hero from "../components/hero/Hero";
import ActionList from "../components/actions/ActionList";
import { getFeaturedActions } from "../mock-data/actions";
import ActionForm from "../components/actions/ActionForm";
import Button from "../components/ui/Button";
// Ethers for web3
import { ethers, Wallet } from "ethers";
import actionFactory from "../artifacts/contracts/ActionFactory.sol/ActionFactory.json";
import { EthersProvider } from "@ethers-react/system";

const HomePage: NextPage = () => {
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page
  // const provider = new ethers.providers.Web3Provider(window.ethereum);

  const localProvider = ethers.getDefaultProvider("http://127.0.0.1:8545/");
  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  const tempWalletKey =
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  // Create Temp wallet based on hard coded
  const tempWallet = new Wallet(tempWalletKey, localProvider);
  // Create new contract
  const contract = new ethers.Contract(
    contractAddress,
    actionFactory.abi,
    localProvider
  );

  const connectedContract = contract.connect(tempWallet);

  const createTopLevelAction = async () => {
    const result = await connectedContract.createAction(contractAddress, 0);
    console.log("Transaction Hash", result);
  };

  const featuredActions = getFeaturedActions();
  // console.log("Actions", featuredActions);
  return (
    <div className={styles.container}>
      <Head>
        <title>Doer DAO</title>
        <meta
          name="description"
          content="DoerDAO empowers creators to DAOify their production process, grow and manage their community using bounties, composable governance, advanced treasury management, and community dividends."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Hero />
        <button onClick={createTopLevelAction}></button>
        <div className="max-w-7xl mx-auto">
          <ActionForm />
        </div>

        <button onClick={createTopLevelAction}>CreateAction</button>

        <ActionList actions={featuredActions} />
        <div className={styles.grid}></div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Become a Doer{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default HomePage;
