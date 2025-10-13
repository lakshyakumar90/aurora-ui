"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function ShowCase() {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    if (!counterRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true); // start counting
        }
      },
      { threshold: 0.3 } // 30% visible
    );

    const currentRef = counterRef.current;
    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [started]);

  useEffect(() => {
    if (started && count < 100) {
      const timer = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 30);

      return () => clearInterval(timer);
    }
  }, [started, count]);

  return (
    <div className="  flex-col ">
      <div className="h-[70vh] w-full  px-25 flex gap-5">
        <div className="h-[100%] w-[50%]  flex flex-col gap-5 ">
          
          <div className="h-[50%] w-full rounded-lg relative cursor-pointer group   border-1 border-[#A44BF8]">
            <Image
              src="/messages.gif"
              fill
              alt="l"
              className="blur-[2px] relative rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 object-cover   "
            ></Image>
            <div className="absolute h-35 w-[100%]  bottom-0 left-5 rounded-lg">
              <h1 ref={counterRef} className="text-7xl text-[#A44BF8]  tracking-tight">
                {count}%
              </h1>
              <p className="text-2xl">Free and Open Source</p>
              <p className="text-sm text-[#9286A8]">Loved by devs around the world</p>
            </div>
          </div>

          <div className="h-[50%] w-full rounded-lg relative cursor-pointer group  border-1 border-[#A44BF8]">
            <div className="h-[50%] w-[50%] absolute right-15 top-10">
              <Image
              src="/switch.gif"
              fill
              alt=""
              className="blur-[2px] relative rounded-4xl opacity-0 group-hover:opacity-100 transition duration-300 object-cover   "
            ></Image>
            </div>
            <div className="absolute h-40 w-[100%]  bottom-0 left-5 rounded-lg">
              <h1 ref={counterRef} className="text-8xl text-[#A44BF8] tracking-tight">
                4
              </h1>
              <p className="text-2xl ">Component Variants</p>
              <p className="text-sm text-[#9286A8]" >Pick your favourite technology</p>
            </div>
          </div>
        </div>

        <div className="cursor-pointer group h-[100%] w-[50%]  rounded-lg relative border-1 border-[#A44BF8]">
          <Image
            src="/components1.gif"
            fill
            alt="logo"
            className="blur-xs relative rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 object-cover   "
          ></Image>
          <div className="absolute h-50 w-80  bottom-0 left-5 rounded-lg">
            <h1 ref={counterRef} className="text-9xl text-[#A44BF8] tracking-tight">
              {count}+
            </h1>
            <p className="text-3xl">Creative Components</p>
            <p className=" text-[#9286A8] text-sm">Growing weekly and only getting better</p>
          </div>
        </div>
      </div>
    </div>
  );
}
