import Link from "next/link";
import React from "react";
import { Action } from "../../types/action/action";

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
    <li>
      <img src={`/${action.image}`} alt="" />
      <div className="">
        <div className="">
          <h2>{action.title}</h2>
          <div className="">
            <time>{formattedDate}</time>
          </div>
          <div className="">
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className="">
          <Link href={actionLink}>Explore Action</Link>
        </div>
      </div>
    </li>
  );
}

export default ActionItem;
