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
  setrefetchFeeddback: Dispatch<SetStateAction<boolean>>;
  refetchFeeddback: boolean;
  setrefetch: Dispatch<SetStateAction<boolean>>;
  refetch: boolean;
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
  const [refetchFeeddback, setrefetchFeeddback] = useState(false);
  const [refetch, setrefetch] = useState(false);

  const feedbackValues: feedbackContextProps = {
    dashboardfeedback,
    setdashboardfeedback,
    user,
    setuser,
    refetchFeeddback,
    setrefetchFeeddback,
    refetch,
    setrefetch,
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
