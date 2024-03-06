import Link from "next/link";

const Pricing = () => {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col ">
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
            <Link
              href="/auth"
              className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Get Started
            </Link>
          </div>
        </div>
        {/* standard */}
        <div className="bg-white p-8 rounded shadow-md flex flex-col justify-between items-center">
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
          {/* <p className="mb-4  w-4/5 bg-slate-200 p-1 ">
            - Embeded link to collect feedback directly from your site
          </p> */}

          {/* <p className="mb-4  w-4/5 bg-slate-200 p-1 ">
            - Add users to help manage feedback
          </p> */}
          <p className="mb-4  w-4/5 bg-slate-200 p-1 ">
            - File uploads in feedback collection
          </p>

          <form>
            {/* Your form fields go here */}
            <Link
              href="/auth"
              className="bg-blue-400 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Get started
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
