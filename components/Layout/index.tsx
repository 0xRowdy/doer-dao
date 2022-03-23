import React, { Fragment } from "react";
import Header from "../Header";
import styles from "../../styles/Home.module.css";
import Footer from "../Footer";

export default function Layout(props: any) {
  return (
    <Fragment>
      <header>
        <Header />
      </header>
      <main className={styles.main}>{props.children}</main>
      <footer
        className="text-center text-white"
        style={{ backgroundColor: "#f1f1f1" }}
      >
        <Footer />
      </footer>
    </Fragment>
  );
}
