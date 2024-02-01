"use client";
import React, { useEffect } from "react";
import Feedback from "./dashboardcomponents/Feedback";
import Header from "./dashboardcomponents/Header";
import { useFeeddbackState } from "@/state/state";

const dashboard = () => {
  const { setuser, dashboardfeedback } = useFeeddbackState();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setuser(JSON.parse(user));
    }
  }, []);

  return (
    <main>
      <Header />

      <section className=" mt-4  flex justify-evenly h-12 gap-4 flex-wrap  ">
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
