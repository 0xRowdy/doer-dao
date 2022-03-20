import React, { ReactChildren } from "react";
import Link from "next/link";

// import classes from "./Button.module.css";

export default function Button(props: {
  link: string;
  children: string | JSX.Element[];
}) {
  return (
    <div className="rounded shadow">
      <Link href={props.link}>
        <a className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10">
          {props.children}
        </a>
      </Link>
    </div>
  );
}
