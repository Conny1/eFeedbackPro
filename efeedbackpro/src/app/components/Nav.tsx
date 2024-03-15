const Nav = () => {
  return (
    <div className="w-full flex justify-center items-center h-28 sm:h-20  bg-gray-100">
      <nav className="w-full h-full flex justify-between items-center max-w-4xl sm:px-4">
        <p className="text-lg font-bold ml-4 "> eFeedbackPro</p>

        <ul className="flex space-x-6 flex-col sm:flex-row  h-20 justify-around sm:h-auto  ">
          <li>
            <a
              href="/documentations"
              className="p-1 cursor-pointer border-2 border-blue-400 text-white-1 font-bold sm:py-2 sm:px-4 rounded-md hover:bg-blue-400 hover:text-white transition duration-300"
            >
              Documentation
            </a>
          </li>

          <li>
            <a
              href="/auth"
              className="p-1 cursor-pointer border-2 border-blue-400 text-white-1 font-bold sm:py-2 sm:px-4 rounded-md hover:bg-blue-400 hover:text-white transition duration-300"
            >
              Signin/Signup
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Nav;
