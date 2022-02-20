export type Proposal = {
  id: number;
  name: string;
  description: string;
  cost: number;
  childProposals: Proposal[] | null;
};
