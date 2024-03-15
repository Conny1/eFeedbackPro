"use client";
import React, { useEffect } from "react";
import Feedback from "./dashboardcomponents/Feedback";
import Header from "./dashboardcomponents/Header";
import { useFeeddbackState } from "@/state/state";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { setuser, dashboardfeedback } = useFeeddbackState();
  const router = useRouter();
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://rawcdn.githack.com/Conny1/eFeedbackPro/4c74318c0e1a9c84c16ddc23c0a2ad1c97182d3a/widget/client/main.js?id=65e83192d5895fe8be97482c";
    script.async = true;
    script.type = "module";
    script.id = "scripttagid"; // <!-- Add this id, it's crucial for the code to work -->
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
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
  }, [setuser, router]);

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

export default Dashboard;
