import { Action } from "../types/action/action";

const DUMMY_ACTIONS: Action[] = [
  {
    id: "0x00",
    title: "Programming for everyone",
    description:
      "Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.",
    location: "Somestreet 25, 12345 San Somewhereo",
    date: "2021-05-12",
    image: "assets/images/nat-1.jpg",
    isFeatured: false,
    subActions: null,
  },
  {
    id: "0x01",
    title: "Networking for introverts",
    description:
      "We know: Networking is no fun if you are an introvert person. That's why we came up with this event - it'll be so much easier. Promised!",
    location: "New Wall Street 5, 98765 New Work",
    date: "2021-05-30",
    image: "assets/images/nat-2.jpg",
    isFeatured: true,
    subActions: null,
  },
  {
    id: "0x02",
    title: "Networking for extroverts",
    description:
      "You probably need no help with networking in general. But focusing your energy correctly - that is something where most people can improve.",
    location: "My Street 12, 10115 Broke City",
    date: "2022-04-10",
    image: "assets/images/nat-3.jpg",
    isFeatured: true,
    subActions: [
      {
        id: "0x10",
        title: "Programming for everyone",
        description:
          "Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.",
        location: "Somestreet 25, 12345 San Somewhereo",
        date: "2021-05-12",
        image: "assets/images/nat-4.jpg",
        isFeatured: false,
        subActions: null,
      },
      {
        id: "0x20",
        title: "Programming for everyone",
        description:
          "Everyone can learn to code! Yes, everyone! In this live event, we are going to go through all the key basics and get you started with programming as well.",
        location: "Somestreet 25, 12345 San Somewhereo",
        date: "2021-05-12",
        image: "assets/images/nat-5.jpg",
        isFeatured: false,
        subActions: null,
      },
    ],
  },
];

export function getFeaturedActions() {
  return DUMMY_ACTIONS.filter((event) => event.isFeatured);
}

export function getAllActions() {
  return DUMMY_ACTIONS;
}

export function getFilteredActions(dateFilter: any) {
  const { year, month } = dateFilter;

  let filteredEvents = DUMMY_ACTIONS.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export function getActionById(id: string) {
  return DUMMY_ACTIONS.find((event) => event.id === id);
}
