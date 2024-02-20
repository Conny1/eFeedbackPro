import { Feedback, plans } from "@/state/types";
import jwt from "jsonwebtoken";

export const handleAuthErrors = (status: number) => {
  let message = "";
  switch (status) {
    case 404:
      message = "Account with that email does not exists";

      break;

    case 401:
      message = "Invalid Email or Password";

      break;
    case 400:
      message = "An account with that email exists";

      break;
  }

  return message;
};

export const handleFeedbackErrors = (status: number) => {
  let message = "";
  switch (status) {
    case 401:
      message = "All details not captured";
      break;

    case 403:
      message = "invalid request";
      break;

    case 404:
      message = "No feedback yet";
      break;

    case 500:
      message = "Server Error";
      break;
  }

  return message;
};

export const handleCommentsErrors = (status: number) => {
  let message = "";
  switch (status) {
    case 404:
      message = "Be the first to live a comment";

      break;

    case 500:
      message = "Server Error";

      break;
  }

  return message;
};

export const handleBusinessErrors = (status: number) => {
  let message = "";
  switch (status) {
    case 404:
      message = "No Product yet Yet";

      break;

    case 500:
      message = "Server Error";

      break;
  }

  return message;
};

export const handleconfirmpassworderrors = (status: number) => {
  let message = "";
  switch (status) {
    case 404:
      message = "invalid email";

      break;

    case 500:
      message = "Server Error";

      break;
  }

  return message;
};

// filters fro most voted feedback
export const mostVoted = (feedback: Feedback[]) => {
  if (!feedback) return [];
  return new Promise((resolve, reject) => {
    const data = feedback.sort((a, b) => b.votes - a.votes);

    resolve(data);
  });
};

// verify jwt tokens
export const verifyToken = (token?: string) => {
  if (!token) return false;
  const secret = process.env.SECRET_KEY as string;
  let bol = false;
  jwt.verify(token, secret, (err, user) => {
    if (err) return (bol = false);

    bol = true;
  });

  return bol;
};

//********************/ check user Plans***********************//

// basic plan
export const Basicplan = (userplan: string) => {
  if (userplan === plans.free) {
    return true;
  }
  return false;
};
