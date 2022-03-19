import type { NextPage } from "next";
import React, { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";

import Hero from "../components/Hero";
import ActionList from "../components/actions/ActionList";
import { getFeaturedActions } from "../mock-data/actions";
import ActionForm from "../components/actions/ActionForm";
import Button from "../components/ui/Button";
// Ethers for web3
import { NETWORKS } from "../constants";
import { ethers, Signer, Wallet } from "ethers";
import actionFactory from "../artifacts/contracts/ActionFactory.sol/ActionFactory.json";
import Onboard from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";
import {
  useConnectWallet,
  useSetChain,
  useWallets,
  init,
} from "@web3-onboard/react";

const injected = injectedModule();
const web3Onboard = init({
  wallets: [injected],
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
      { name: "Coinbase", url: "https://wallet.coinbase.com/" },
    ],
  },
});

const HomePage: NextPage = () => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ chains, connectedChain, settingChain }, setChain] = useSetChain();
  const connectedWallets = useWallets();
  const [signature, setSignature] = useState({
    signature: "",
  });
  const [loginState, setLoginState] = useState({
    walletKey: "",
    provider: {},
    connectedContract: {},
  });
  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

  const localProvider = ethers.getDefaultProvider("http://127.0.0.1:8545/");
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
    console.log(loginState);
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

      {signature.signature.length > 0 ? (
        <div className="">
          <ActionForm />
        </div>
      ) : (
        <Hero handleLoginClick={() => connect()} />
      )}

      <div>
        <button onClick={() => connect()}>
          {connecting ? "connecting" : "connect"}
        </button>
        {wallet && (
          <div>
            <label>Switch Chain</label>
            {settingChain ? (
              <span>Switching chain...</span>
            ) : (
              <select
                onChange={({ target: { value } }) =>
                  console.log("onChange called") || setChain({ chainId: value })
                }
                value={connectedChain.id}
              >
                {chains.map(({ id, label }) => {
                  return (
                    <option key={id} value={id}>
                      {label}
                    </option>
                  );
                })}
              </select>
            )}
            <button onClick={() => disconnect(wallet)}>
              Disconnect Wallet
            </button>
          </div>
        )}

        {connectedWallets.map(({ label, accounts }) => {
          return (
            <div key={label}>
              <div>{label}</div>
              <div>Accounts: {JSON.stringify(accounts, null, 2)}</div>
            </div>
          );
        })}
      </div>

      <button onClick={createTopLevelAction}>CreateAction</button>

      <ActionList actions={featuredActions} />
      <div className={styles.grid}></div>
    </div>
  );
};

export default HomePage;
