"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { Feedback, User } from "./types";

interface feedbackContextProps {
  setdashboardfeedback: Dispatch<SetStateAction<Feedback[]>>;
  dashboardfeedback: Feedback[];
  user?: User;
  setuser: Dispatch<SetStateAction<User | undefined>>;
}

const feedbackContext = createContext<feedbackContextProps | undefined>(
  undefined
);
interface Props {
  children: ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  const [dashboardfeedback, setdashboardfeedback] = useState<Feedback[]>([]);
  const [user, setuser] = useState<User | undefined>(undefined);

  const feedbackValues: feedbackContextProps = {
    dashboardfeedback,
    setdashboardfeedback,
    user,
    setuser,
  };

  return (
    <feedbackContext.Provider value={feedbackValues}>
      {children}
    </feedbackContext.Provider>
  );
};

export const useFeeddbackState = (): feedbackContextProps => {
  const context = useContext(feedbackContext);
  if (!context) {
    throw new Error("usefeedbackstate must be within the provider");
  }
  return context;
};

export default ContextProvider;
