import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Header from "../components/Header";
import Hero from "../components/Hero";
import ActionList from "../components/actions/ActionList";
import { getFeaturedActions } from "../mock-data/actions";
import ActionForm from "../components/actions/ActionForm";
import Button from "../components/ui/Button";
// Ethers for web3
import { ethers, Signer, Wallet } from "ethers";
import actionFactory from "../artifacts/contracts/ActionFactory.sol/ActionFactory.json";
import Onboard from "@web3-onboard/core";
// Onboard for connecting to wallets
import {
  useConnectWallet,
  useSetChain,
  useWallets,
  init,
} from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import trezorModule from "@web3-onboard/trezor";
import ledgerModule from "@web3-onboard/ledger";
import walletConnectModule from "@web3-onboard/walletconnect";
import walletLinkModule from "@web3-onboard/walletlink";
import portisModule from "@web3-onboard/portis";
import fortmaticModule from "@web3-onboard/fortmatic";
import torusModule from "@web3-onboard/torus";
import keepkeyModule from "@web3-onboard/keepkey";

const injected = injectedModule();
const walletLink = walletLinkModule();
const walletConnect = walletConnectModule();
const portis = portisModule({
  apiKey: "b2b7586f-2b1e-4c30-a7fb-c2d1533b153b",
});

const fortmatic = fortmaticModule({
  apiKey: "pk_test_886ADCAB855632AA",
});

const torus = torusModule();
const ledger = ledgerModule();
const keepkey = keepkeyModule();

const trezorOptions = {
  email: "test@test.com",
  appUrl: "https://www.blocknative.com",
};

const trezor = trezorModule(trezorOptions);

const web3Onboard = init({
  wallets: [
    ledger,
    trezor,
    walletConnect,
    keepkey,
    walletLink,
    injected,
    fortmatic,
    portis,
    torus,
  ],
  chains: [
    {
      id: "0x1",
      token: "ETH",
      label: "Ethereum Mainnet",
      rpcUrl: "https://mainnet.infura.io/v3/ababf9851fd845d0a167825f97eeb12b",
    },
    {
      id: "0x3",
      token: "tROP",
      label: "Ethereum Ropsten Testnet",
      rpcUrl: "https://ropsten.infura.io/v3/ababf9851fd845d0a167825f97eeb12b",
    },
    {
      id: "0x4",
      token: "rETH",
      label: "Ethereum Rinkeby Testnet",
      rpcUrl: "https://rinkeby.infura.io/v3/ababf9851fd845d0a167825f97eeb12b",
    },
    {
      id: "0x89",
      token: "MATIC",
      label: "Matic Mainnet",
      rpcUrl: "https://matic-mainnet.chainstacklabs.com",
    },
  ],
  appMetadata: {
    name: "Blocknative",
    icon: "<svg><svg/>",
    description: "Demo app for Onboard V2",
    recommendedInjectedWallets: [
      { name: "MetaMask", url: "https://metamask.io" },
      // { name: "Coinbase", url: "https://wallet.coinbase.com/" },
    ],
  },
});

const HomePage: NextPage = () => {
  const [loginState, setLoginState] = useState({
    walletKey: "",
    provider: {},
  });
  // A Web3Provider wraps a standard Web3 provider, which is
  // what MetaMask injects as window.ethereum into each page

  const login = async () => {
    // const provider = await detectEthereumProvider();
    const provider = new ethers.providers.Web3Provider(web3.currentProvider);
    await provider.send("eth_requestAccounts", []);
    if (!provider) {
      return;
    }
    console.log(provider);
    const signer = provider.getSigner();
    const walletAddr = provider.provider.selectedAddress;
    console.log("wallet", walletAddr);
    const signature = await signer.signMessage("Doer DAO Connected");
    console.log(signature);
    setLoginState((prevState) => {
      return {
        ...prevState,
        walletKey: signature,
        provider: provider,
      };
    });
  };
  // const metaMaskProvider = new ethers.providers.Web3Provider(window.ethereum);
  // console.log(metaMaskProvider);

  const localProvider = ethers.getDefaultProvider("http://127.0.0.1:8545/");
  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";
  const tempWalletKey =
    "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
  // Create Temp wallet based on hard coded
  const tempWallet = new Wallet(tempWalletKey, localProvider);
  console.log("tempWallet", tempWallet);
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
      <Hero handleLoginClick={login} />

      {/* <button onClick={createTopLevelAction}>CreateAction</button> */}

      <ActionList actions={featuredActions} />
      <div className={styles.grid}></div>
    </div>
  );
};

export default HomePage;
