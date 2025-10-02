export type ByLine = { name: string };
export type Collection = { name: string };
export type Condition = { name: string };
export type Copy = {
  id: number;
  issue: Issue;
  conditionId: number;
  condition: Condition;
  notes: string;
  userId: number;
  collectionId: number;
};
export type Cover = {
  id: number;
  imageUrl: string;
  variant: string;
  issueId: number;
};
export type Creator = {
  id: number;
  name: string;
};
export type Credit = {
  id: number;
  issueId: number;
  creatorId: number;
  creator?: Creator;
  byLineId: number;
  byLine?: ByLine;
};
export type Issue = {
  id: number;
  volume: number;
  number: number;
  coverDate: string;
  publicationId: number;
};
export type Publication = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
  publisherId: number;
};
export type Publisher = {
  id: number;
  name: string;
};
export type User = {
  id: number;
  name: string;
  email: string;
};
