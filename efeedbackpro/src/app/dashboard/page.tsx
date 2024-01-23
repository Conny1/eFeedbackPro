import React from "react";
import Feedback from "./dashboardcomponents/Feedback";

const dashboard = () => {
  return (
    <main>
      <section className=" flex justify-evenly h-20 gap-1 ">
        <div className=" flex items-center justify-center  bg-gradient-to-r from-cyan-400 to-blue-400 flex-1">
          <button className="text-slate-700 text-xl font-bold ">
            Feedback
          </button>
        </div>

        <div className=" flex items-center justify-center  bg-gradient-to-r from-cyan-400 to-blue-400 flex-1">
          <button className="text-slate-700 text-xl font-bold ">
            New Features
          </button>
        </div>

        <div className=" flex items-center justify-center  bg-gradient-to-r from-cyan-400 to-blue-400 flex-1">
          <button className="text-slate-700 text-xl font-bold ">Bugs</button>
        </div>
        {/* auth details */}
        <div className=" flex items-center justify-center  flex-1 max-w-xs flex-col  ">
          <img
            className="w-8 h-8 rounded-3xl "
            src="https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?q=80&w=1386&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
          />
          <p className="text-slate-700 font-bold text-xs ">
            {" "}
            joelconrad@gmail.com
          </p>
          <button className="text-slate-700 text-l  ">Log Out</button>
        </div>
      </section>

      <section className="  flex justify-evenly h-12 gap-1 ">
        <div className=" flex items-center justify-center bg-slate-200 flex-1">
          <button className="text-slate-700 text-l  ">Product A</button>
        </div>

        <div className=" flex items-center justify-center bg-slate-200 flex-1">
          <button className="text-slate-700 text-l  ">Product B</button>
        </div>

        <div className=" flex items-center justify-center  bg-slate-200 flex-1">
          <button className="text-slate-700 text-l  ">Product C</button>
        </div>
        <div className=" flex items-center justify-center  bg-slate-200 flex-1">
          <button className="text-slate-700 text-l  ">Add Product</button>
        </div>
      </section>

      <section className=" mt-4  flex justify-evenly h-12 gap-1 flex-wrap ">
        <Feedback />
        <Feedback />
        <Feedback />
        <Feedback />
      </section>
    </main>
  );
};

export default dashboard;
