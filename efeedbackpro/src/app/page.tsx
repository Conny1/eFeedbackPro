"use client";
import { useState } from "react";
import Nav from "./components/Nav";
import EachFeature from "./components/EachFeature";
import Pricing from "./components/Pricing";

type tutorialType = {
  step: string;
  pic: string;
};

const tutorial: tutorialType[] = [
  {
    step: "Create your account and Log in.",
    pic: "./images/login.png",
  },

  {
    step: "Choose your subscription plan.",
    pic: "./images/chooseplan.png",
  },
  {
    step: "Add your product.",
    pic: "./images/addproduct.png",
  },
  {
    step: "Head over to products menu and copy the feedback link and send it to your users to collect feedback.",
    pic: "./images/sendlink.png",
  },
];

const Home: React.FC = () => {
  const [isCollect, setIsCollect] = useState<boolean>(true);
  const [isManage, setIsManage] = useState<boolean>(false);
  const [isAnalyze, setIsAnalyze] = useState<boolean>(false);
  const [isVote, setisVote] = useState<boolean>(false);
  const [steps, setsteps] = useState(0);

  return (
    <div>
      <Nav />

      <header className=" bg-gradient-to-r from-cyan-400 to-blue-400 flex  justify-center items-center py-20">
        <div className=" max-w-4xl  mx-10 flex flex-col md:flex-row justify-between items-center">
          <div className=" md:w-1/2 ">
            <h1 className="text-4xl font-bold text-white mb-4">
              eFeedbackPro: The Ultimate Feedback Management System
            </h1>
            <p className="text-lg text-white mb-8">
              Ready to take your product feedback collection to the next level?
              Sign up for eFeedbackPro now and unlock the power of actionable
              insights. Whether you&apos;re launching a new product or refining
              an existing one, eFeedbackPro empowers you to make informed
              decisions and drive success.
            </p>
            <a
              href="/auth"
              className="bg-blue-400 text-white font-semibold py-2 px-4 rounded hover:bg-white transition duration-300 hover:text-black "
            >
              Start Your Free Trial
            </a>
            <p className="text-sm mt-2">No credit card required</p>
          </div>
          <div className="w-1/2 flex-none hidden md:block  ">
            <img src="/images/head.jpg" alt="Feedback" className="w-full" />
          </div>
        </div>
      </header>

      <section className="bg-gray-100 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Our Features
          </h2>
          <div className="flex justify-center items-center mb-10  ">
            <button
              className={`mx-2 py-2 px-4 rounded-lg font-semibold text-sm ${
                isCollect
                  ? "bg-blue-400 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => {
                setIsCollect(true);
                setIsManage(false);
                setIsAnalyze(false);
                setisVote(false);
              }}
            >
              Collect
            </button>
            <button
              className={`mx-2 py-2 px-4 rounded-lg font-semibold text-sm ${
                isManage
                  ? "bg-blue-400 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => {
                setIsCollect(false);
                setisVote(false);
                setIsAnalyze(false);
                setIsManage(true);
              }}
            >
              Manage
            </button>
            <button
              className={`mx-2 py-2 px-4 rounded-lg font-semibold text-sm ${
                isAnalyze
                  ? "bg-blue-400 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => {
                setIsCollect(false);
                setIsManage(false);
                setisVote(false);
                setIsAnalyze(true);
              }}
            >
              Analyze
            </button>
            <button
              className={`mx-2 py-2 px-4 rounded-lg font-semibold text-sm ${
                isVote
                  ? "bg-blue-400 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => {
                setIsCollect(false);
                setIsManage(false);
                setIsAnalyze(false);
                setisVote(true);
              }}
            >
              User Insights
            </button>
          </div>
          {isCollect && (
            <EachFeature
              pic="./images/collect.png"
              heading="Effortless Feedback Collection"
              explanation="Collect feedback from multiple channels in a single place."
            />
          )}
          {isManage && (
            <EachFeature
              pic="./images/manage.png"
              heading="Streamlined Feedback Management"
              explanation="Organize and prioritize feedback to focus on what matters most."
            />
          )}
          {isAnalyze && (
            <EachFeature
              pic="./images/analyze.png"
              heading="Insightful Feedback Analysis"
              explanation="Turn feedback into actionable insights with our powerful analysis tools."
            />
          )}
          {isVote && (
            <EachFeature
              pic="./images/vote.png"
              heading="User interaction"
              explanation="Get insights on  feedback from the users by enabling them to vote and provide comments on each feedback."
            />
          )}
        </div>
      </section>

      <section className="max-w-4xl mx-auto flex flex-col items-center ">
        <h2 className="text-3xl font-bold mb-8">Pricing</h2>

        <div>
          <Pricing />
        </div>
      </section>

      <section className="max-w-4xl mx-auto flex flex-col items-center ">
        <h2 className="text-3xl font-bold mb-8">How it works</h2>
        <div className="flex flex-col items-center relative ">
          <p className="font-semibold mb-8 p-2 ">
            step {steps + 1}: {tutorial[steps].step}
          </p>
          <button
            onClick={() => setsteps((prev) => (prev === 0 ? 0 : prev - 1))}
            className=" sm:absolute left-20 bottom-60 bg-blue-400 p-2 rounded w-16 "
          >
            prev
          </button>
          <div className="w-full">
            <img
              className="object-cover sm:object-contain"
              src={tutorial[steps].pic}
              alt="step"
            />
          </div>
          <button
            onClick={() =>
              setsteps((prev) =>
                prev < tutorial.length - 1 ? prev + 1 : tutorial.length - 1
              )
            }
            className="sm:absolute right-20 bottom-60 bg-blue-400 p-2 rounded w-16 "
          >
            next
          </button>
        </div>
      </section>

      <section className=" bg-gradient-to-r from-cyan-400 to-blue-400 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to revolutionize your feedback management?
          </h2>
          <p className="text-lg text-white mb-6">
            Start your free trial today.
          </p>
          <a
            href="/auth"
            className="bg-white text-black font-semibold py-2 px-6 rounded-lg hover:bg-blue-400 hover:text-white transition duration-300"
          >
            Get Started
          </a>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <p>
            &copy; {new Date().getFullYear()} eFeedbackPro. All rights reserved.
          </p>
          {/* <div className="flex space-x-6">
            <div>
              <h3 className="font-bold mb-2">Company</h3>
              <ul>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-300 transition duration-300"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-300 transition duration-300"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Resources</h3>
              <ul>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-300 transition duration-300"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-gray-300 transition duration-300"
                  >
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div> */}
        </div>
      </footer>
    </div>
  );
};

export default Home;
