"use client";
import Loading from "@/app/components/Loading";
import { useFeeddbackState } from "@/state/state";
import { User, plans } from "@/state/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SubscriptionPage = () => {
  const { user, setuser } = useFeeddbackState();
  const [userDetails, setuserDetails] = useState<User>();
  const [loading, setloading] = useState(false);

  const route = useRouter();

  useEffect(() => {
    if (!user) {
      const data = localStorage.getItem("user");
      if (data) {
        setuserDetails(JSON.parse(data));
      }
    } else if (user) {
      setuserDetails(user);
    }
  }, [user]);

  const freePlan = async () => {
    if (user?.plan === plans.basic) {
      return toast.error(`Unsubscribe from ${plans.basic} package first`);
    }
    setloading(true);

    try {
      const resp = await fetch(`../api/user/login`, {
        method: "PUT",
        headers: {
          Content_Type: "application/json",
        },
        body: JSON.stringify({ userid: userDetails?._id, plan: plans.free }),
      });

      const data = await resp.json();
      // handle auth errors

      if (data.status === 200) {
        toast.success("Subscribed");
        localStorage.setItem("user", JSON.stringify(data.user));
        setuser(user);
        setuserDetails(data.user);
        setloading(false);
        setTimeout(() => {
          route.push("/dashboard");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // logout
  const logout = async (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    ev.preventDefault();
    try {
      const resp = await fetch("../api/user/logout");
      const data = await resp.json();
      if (data.status === 200) {
        toast.success("Logged out");
        localStorage.removeItem("user");
        setTimeout(() => {
          route.push("/auth");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // cancel subscription
  const cancelsubscription = async () => {
    setloading(true);

    try {
      const resp = await fetch(`../api/subscribe/cancel`, {
        method: "POST",
        headers: {
          Content_Type: "application/json",
        },
        body: JSON.stringify({ email: userDetails?.email }),
      });

      const data = await resp.json();
      setloading(false);
      if (data.status === 200) {
        toast.success("Redirecting....");
        setTimeout(() => {
          route.push(data.respData);
        }, 2000);
      } else if (data.status === 404) {
        route.push("/auth");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col ">
      <Toaster />
      <div className="flex flex-wrap gap-5 ">
        <Link href="/dashboard" className="bg-blue-400 p-1 rounded font-bold ">
          Back to Dashboard
        </Link>
        <button
          onClick={logout}
          className="text-slate-700 text-l bg-red-600 p-1 rounded "
        >
          Log Out
        </button>
      </div>
      <p className="mb-4 text-xl ">Choose a Plan</p>
      <div className=" flex gap-3 flex-col md:flex-row ">
        <div className="bg-white p-8 rounded shadow-md flex flex-col justify-between items-center ">
          <h1 className="text-3xl font-bold mb-6">Free trial</h1>
          <p className="mb-4">Free trial</p>

          <p className="mb-4  w-4/5 bg-slate-200 p-1 ">
            - Collect limited feedback
          </p>
          <p className="mb-4  w-4/5 bg-slate-200 p-1 ">
            - Collect Feedback for a maximum of 1 Product
          </p>
          <p className="mb-4  w-4/5 bg-slate-200 p-1 ">
            - Allow users to vote for feedback
          </p>
          <div>
            {loading ? (
              <div className="absolute w-full h-full top-0 left-0 bg-black bg-opacity-70 flex items-center justify-center ">
                <Loading />
              </div>
            ) : userDetails?.plan === plans.free ? (
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Current Plan
              </button>
            ) : (
              <button
                onClick={freePlan}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Subscribe
              </button>
            )}
          </div>
        </div>
        {/* Basic */}
        <div className="bg-white p-8 rounded shadow-md flex flex-col justify-between items-center   ">
          <h1 className="text-3xl font-bold mb-6"> Basic plan </h1>
          <p className="mb-4  ">Starts from KSH 6000/month</p>
          <p className="mb-4 w-4/5 bg-slate-200 p-1 ">
            - Collect Unlimited Feedback
          </p>

          <p className="mb-4 w-4/5 bg-slate-200 p-1 ">
            - Allow users to vote for feedback
          </p>

          <p className="mb-4  w-4/5 bg-slate-200 p-1 ">
            - Collect feedback for a maximum of 5 Products
          </p>
          <p className="mb-4  w-4/5 bg-slate-200 p-1 ">
            - Reply to Each Users feedback{" "}
          </p>
          <p className="mb-4  w-4/5 bg-slate-200 p-1 ">
            - Widget to collect feedback directly from your website
          </p>
          <p className="mb-4  w-4/5 bg-slate-200 p-1 ">
            - Assistance in intergrating the widget
          </p>

          {/* <p className="mb-4  w-4/5 bg-slate-200 p-1 ">
            - Add users to help manage feedback
          </p> */}
          <p className="mb-4  w-4/5 bg-slate-200 p-1 ">
            - File uploads in feedback collection
          </p>
          <p className="text-sm font-bold text-red-600">
            Use your account email
          </p>

          <div>
            {userDetails?.plan === plans.basic ? (
              <button
                onClick={cancelsubscription}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                cancel Plan/Update card
              </button>
            ) : (
              <Link
                // https://paystack.com/pay/aadzpazy3v - text link
                href="https://paystack.com/pay/4-9szypn1g"
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Subscribe
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* paypal subscription */}
    </div>
  );
};

export default SubscriptionPage;
