import React from "react";
import { Action } from "../../../types/action/action";

import ActionItem from "../ActionItem";
import classes from "./ActionList.module.css";

function ActionList(props: { actions: Action[] }) {
  const { actions } = props;
  return (
    <ul className={classes.list}>
      {actions.map((action) => (
        <ActionItem key={action.id} action={action} />
      ))}
    </ul>
  );
}

export default ActionList;
