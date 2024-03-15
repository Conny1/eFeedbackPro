import type { Metadata } from "next";
import "./globals.css";
import ContextProvider from "@/state/state";

export const metadata: Metadata = {
  title: "efeedbackpro",
  description:
    "eFeedbackPro: Your go-to platform for collecting comprehensive feedback on any product. Streamline your feedback collection process effortlessly and make data-driven decisions to enhance your products' performance. Sign up now for insightful analytics and actionable insights.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ContextProvider>{children}</ContextProvider>
      </body>
    </html>
  );
}
