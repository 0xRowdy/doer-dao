import { Proposal } from "../types/proposal/proposal";

export const mockProposals: Proposal[] = [
  {
    id: 0,
    name: "DoerDao Action 1",
    description: "The first test proposal for our stuff",
    cost: 1000,
    childProposals: null,
  },
  {
    id: 1,
    name: "DoerDao Action 2",
    description: "The second test proposal for our stuff",
    cost: 2000,
    childProposals: null,
  },
  {
    id: 2,
    name: "DoerDao Action 3",
    description: "The third test proposal for our stuff",
    cost: 3000,
    childProposals: [
      {
        id: 10,
        name: "DoerDao Child Action 1a",
        description: "The first child proposal for Action 1",
        cost: 10,
        childProposals: null,
      },
      {
        id: 20,
        name: "DoerDao Child Action 1b",
        description: "The second child proposal for Action 1",
        cost: 20,
        childProposals: null,
      },
      {
        id: 30,
        name: "DoerDao Child Action 1c",
        description: "The third test proposal for our stuff",
        cost: 30,
        childProposals: null,
      },
    ],
  },
];
