import Link from "next/link";
import React from "react";

import Button from "../../ui/Button";
import { Action } from "../../../types/action/action";
import classes from "./ActionItem.module.css";
import DateIcon from "../../icons/date-icon";
import AddressIcon from "../../icons/address-icon";
import ArrowRightIcon from "../../icons/arrow-right-icon";

function ActionItem(props: { action: Action }) {
  const { action } = props;

  const formattedDate = new Date(action.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = action.location.replace(", ", "\n");
  const actionLink = `/actions/${action.id}`;

  return (
    <li className={classes.item}>
      <img src={`/${action.image}`} alt="" />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{action.title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{formattedDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={actionLink}>
            <span className={classes.icon}></span>
            <span>Explore Bounty</span>
          </Button>
        </div>
      </div>
    </li>
  );
}

export default ActionItem;
