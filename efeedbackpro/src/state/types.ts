export type User = {
  _id: string;
  name: string;
  email: string;
  password: string;
  isadmin: Boolean;
  subToken: string;
};

export type Comments = {
  _id: string;
  comment: string;
  likes: number;
  feedback: Feedback;
  client: Client;
  createdAt: Date;
};

export type Client = {
  _id: string;
  email: string;
  feedback: Feedback;
  business: Business;
};

export type Business = {
  _id: string;
  name: string;
  userid: User;
  logoUrl: string;
  feedback: Feedback[];
};

export type Feedback = {
  _id: string;
  title: string;
  description: string;
  user: User;
  comments: Comments[];
  votes: number;
  isPublic: boolean;
  uploads: string[];
  client: Client;
  business: Business;
};
