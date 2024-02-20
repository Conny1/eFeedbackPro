// components/Loading.tsx

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center  h-52 ">
      <div className="animate-spin rounded-full border-t-4 border-blue-500 border-solid border-8 h-16 w-16"></div>
      <span className="ml-4 text-xl font-semibold">Loading...</span>
    </div>
  );
};

export default Loading;
