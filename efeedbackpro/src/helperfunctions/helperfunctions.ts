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
