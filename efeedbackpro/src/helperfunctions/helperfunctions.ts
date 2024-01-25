export const handleAuthErrors = (status: number) => {
  let message = "";
  switch (status) {
    case 404:
      message = "Account with that email exists";

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
