import Image from "next/image";
export default function Publish() {
  return (
    <div className="h-[120vh] flex flex-col items-center   relative mt-20">
      <div className="mb-1">
        <h1 className="text-7xl font-bold text-center mb-6 leading-17 ">
          Become a creative <br />
          designer today
        </h1>
        <h4 className="text-3xl text-center text-gray-400">
          Built apps faster with <br />
          pre-built components...
        </h4>
      </div>

      

      <div className="h-[40vh] w-[28%] px-25 relative">
        <Image
          src="/hand.png"
          alt=""
         fill
          className=" rounded-lg object-cover absolute  "
        />
        <button
        className=" h-20 w-50 text-xl  cursor-pointer absolute z-9  top-15 
  px-6 py-3 
  rounded-2xl 
  text-white 
  font-bold 
  bg-[#A44BF8] 
  shadow-[0_12px_60px_#A44BF8,0_0_80px_#A44BF8] 
  hover:shadow-[0_16px_80px_#A44BF8,0_0_120px_#A44BF8] 
  transition 
  duration-300
"
      >
        Publish
      </button>
      </div> 


    </div>
  );
}
