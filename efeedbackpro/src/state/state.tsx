// import {
//   Dispatch,
//   ReactNode,
//   SetStateAction,
//   createContext,
//   useContext,
//   useState,
// } from "react";
// import { Feedback } from "./types";

// interface feedbackContextProps {
//   setfeedback: Dispatch<SetStateAction<Feedback[]>>;
//   feedback: Feedback[];
// }

// const feedbackContext = createContext<feedbackContextProps | undefined>(
//   undefined
// );
// interface Props {
//   children: ReactNode;
// }

// const ContextProvider = ({ children }: Props) => {
//   const [feedback, setfeedback] = useState<Feedback[]>([]);

//   const feedbackValues = {
//     feedback,
//     setfeedback,
//   };

//   return (
//     <feedbackContext.Provider value={feedbackValues}>
//       {children}
//     </feedbackContext.Provider>
//   );
// };

// export const useFeeddbackState = (): feedbackContextProps => {
//   const context = useContext(feedbackContext);
//   if (!context) {
//     throw new Error("usefeedbackstate must be within the provider");
//   }
//   return context;
// };

// export default ContextProvider;
