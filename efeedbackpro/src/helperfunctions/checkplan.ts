import { plans } from "@/state/types";
import toast from "react-hot-toast";

export const maximumProductsBysubscription = (
  userplan: string,
  productlength: number
) => {
  if (userplan === plans.free && productlength >= 1) {
    return false;
  } else if (userplan === plans.basic && productlength >= 5) {
    return false;
  }

  return true;
};
