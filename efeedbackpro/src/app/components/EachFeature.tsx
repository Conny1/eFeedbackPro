type Props = {
  pic: string;
  heading: string;
  explanation: string;
};

const EachFeature: React.FC<Props> = ({ pic, heading, explanation }) => {
  return (
    <div className="flex w-85 max-w-1000 mx-auto mt-12 justify-center  md:justify-between">
      <div className="w-1/2 h-72 hidden md:block ">
        <img src={pic} alt="Feature" className="w-full h-full object-contain" />
      </div>
      <div className=" w-full md:w-1/2 pl-8 ">
        <h1 className="text-2xl font-bold mb-4">{heading}</h1>
        <p className="max-w-xs">{explanation}</p>
      </div>
    </div>
  );
};

export default EachFeature;
