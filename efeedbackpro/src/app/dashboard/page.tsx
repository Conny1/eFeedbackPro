"use client";
import React, { useEffect } from "react";
import Feedback from "./dashboardcomponents/Feedback";
import Header from "./dashboardcomponents/Header";
import { useFeeddbackState } from "@/state/state";
import { useRouter } from "next/navigation";

const dashboard = () => {
  const { setuser, dashboardfeedback } = useFeeddbackState();
  const router = useRouter();
  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      setuser(JSON.parse(user));
      const userData = JSON.parse(user);
      if ("plan" in userData) {
        if (userData.plan === "") {
          router.push("/dashboard/subscription");
        }
      }
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
