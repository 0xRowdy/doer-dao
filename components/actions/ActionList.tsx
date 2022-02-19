import React from "react";
import { Action } from "../../types/action/action";

import ActionItem from "./ActionItem";

function ActionList(props: { actions: Action[] }) {
  const { actions } = props;
  return (
    <ul>
      {actions.map((action) => (
        <ActionItem key={action.id} action={action} />
      ))}
    </ul>
  );
}

export default ActionList;
