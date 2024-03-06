const Nav = () => {
  return (
    <div className="w-full flex justify-center items-center h-20 bg-gray-100">
      <nav className="w-full flex justify-between items-center max-w-4xl sm:px-4">
        <p className="text-lg font-bold ml-4 "> eFeedbackPro</p>
        <div className="mr-4   ">
          <ul className="flex space-x-6  ">
            {/* <li>
              <a className=" cursor-pointer text-lg font-bold text-white-1 p-1 rounded hover:text-blue-500 hover:bg-white transition duration-300">
                Home
              </a>
            </li>
            <li>
              <a className="  cursor-pointer text-lg font-bold text-whitep-1 rounded hover:text-blue-500 hover:bg-white transition duration-300">
                Features
              </a>
            </li>
            <li>
              <a className="  cursor-pointer text-lg font-bold text-whitep-1 rounded hover:text-blue-500 hover:bg-white transition duration-300">
                Pricing
              </a>
            </li>
            <li>
              <a className="  cursor-pointer text-lg font-bold text-whitep-1 rounded hover:text-blue-500 hover:bg-white transition duration-300">
                About Us
              </a>
            </li> */}

            <li>
              <a
                href="/auth"
                className="p-1 cursor-pointer border-2 border-blue-400 text-white-1 font-bold sm:py-2 sm:px-4 rounded-md hover:bg-blue-400 hover:text-white transition duration-300"
              >
                Signin/Signup
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
