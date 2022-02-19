import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import Header from "../components/globalNav";
import ActionList from "../components/actions/ActionList";
import { getFeaturedActions } from "../mock-data/actions";

const HomePage: NextPage = () => {
  const featuredActions = getFeaturedActions();
  console.log("Actions", featuredActions);
  return (
    <div className={styles.container}>
      <Head>
        {/* <title>Doer DAO</title> */}
        <meta
          name="description"
          content="DoerDAO empowers creators to DAOify their production process, grow and manage their community using bounties, composable governance, advanced treasury management, and community dividends."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header></Header>
      <main className={styles.main}>
        <ActionList actions={featuredActions} />
        <h1 className={styles.title}>Doer DAO</h1>
        <h1 className="text-3xl font-bold underline">Doer DAO</h1>

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
