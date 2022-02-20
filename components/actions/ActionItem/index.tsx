import Link from "next/link";
import React from "react";

import Button from "../../ui/Button";
import { Action } from "../../../types/action/action";
import classes from "./ActionItem.module.css";

function ActionItem(props: { action: Action }) {
  const { action } = props;

  const formattedDate = new Date(action.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = action.location.replace(", ", "\n");
  const actionLink = `/events${action.id}`;

  return (
    <li className={classes.item}>
      <img src={`/${action.image}`} alt="" />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{action.title}</h2>
          <div className="">
            <time className={classes.date}>{formattedDate}</time>
          </div>
          <div className="">
            <address className={classes.address}>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={actionLink}>Explore Action</Button>
        </div>
      </div>
    </li>
  );
}

export default ActionItem;
