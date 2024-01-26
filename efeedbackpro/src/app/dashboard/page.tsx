"use client";
import React, { useEffect } from "react";
import Feedback from "./dashboardcomponents/Feedback";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Header from "./dashboardcomponents/Header";
import { useFeeddbackState } from "@/state/state";
import { handleFeedbackErrors } from "@/helperfunctions/helperfunctions";

const dashboard = () => {
  const router = useRouter();
  const { user, setuser, dashboardfeedback } = useFeeddbackState();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setuser(JSON.parse(user));
    }
  }, []);

  return (
    <main>
      <Toaster />
      <Header />

      <section className=" mt-4  flex justify-evenly h-12 gap-1 flex-wrap ">
        {dashboardfeedback.length > 0
          ? dashboardfeedback.map((item) => {
              return <Feedback key={item._id} {...item} />;
            })
          : "No feed back collected yet"}
      </section>
    </main>
  );
};

export default dashboard;
