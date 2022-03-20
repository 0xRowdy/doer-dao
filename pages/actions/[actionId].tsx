import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { getActionById } from "../../mock-data/actions";
import EventSummary from "../../components/actions/event-detail/event-summary";
import EventLogistics from "../../components/actions/event-detail/event-logistics";
import EventContent from "../../components/actions/event-detail/event-content";

export default function ActionDetailPage() {
  const router = useRouter();
  const actionId = router.query.actionId;
  const action = getActionById(actionId);

  if (!action) {
    return <p>No Event Found</p>;
  }
  return (
    <Fragment>
      <EventSummary title={action.title} />
      <EventLogistics
        date={action.date}
        address={action.location}
        image={action.image}
        imageAlt={action.title}
      />
      <EventContent>
        <p>{action.description}</p>
      </EventContent>
    </Fragment>
  );
}
