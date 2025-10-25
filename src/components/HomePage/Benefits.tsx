import Image from "next/image";
export default function Benefits(){
    return(
       <div className=" flex flex-col gap-25 mt-15">
        
        <div className="md:min-h-[60vh] md:w-full  px-25 ">
                  <div className=" h-[100%] rounded-lg border-1 hover:border-3 hover:scale-110 transition-transform duration-600 border-[#A44BF8] flex gap-15 p-10">
                      <div className="bg-[#0A0A0A] w-[50%]  rounded-lg ">
                          <div className="h-[90%] w-[90%] relative  rounded-lg flex flex-col justify-center items-center m-auto mt-5">
                              <Image src="/first.png" alt="" fill className="rounded-lg object-cover absolute hover:scale-75 transition-transform duration-500"/>
                          </div>
                      </div>
                      <div className=" w-[40%] h-[70%] rounded-lg  mt-8 flex flex-col gap-3">
                          <p className="text-xl border-1 w-fit px-3 py-1 rounded-xl border-[#60A5FA] bg-gray-950
                           hover:border-gray-800 hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 transition-transform duration-500">built for speed</p>
                          <h3 className="text-6xl font-medium">Lightning Fast Development</h3>
                          <p className="mb-1">Cut your development time by 80% with our extensive library of pre-built components.</p>
                          <div className="flex gap-4">
                              <p  className="text-xl border-1 w-fit px-3 py-1 rounded-xl border-gray-700 bg-gray-950
                               hover:border-gray-800 hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 leading-6 transition-transform duration-500 ">rapid prototyping</p>
                              <p  className="text-xl border-1 w-fit px-3 py-1 rounded-xl border-gray-700 bg-gray-950
                               hover:border-gray-800 hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 leading-6 transition-transform duration-500">scalable apps</p>
                              <p className="text-xl border-1 w-fit px-3 py-1 rounded-xl border-gray-700 bg-gray-950
                               hover:border-gray-800 hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 leading-6 transition-transform duration-500">modern ui/ux</p>
                          </div>
                      </div>
                  </div>
              </div>

        <div className="min-h-[60vh] w-full  px-25 ">
                  <div className=" h-[100%] rounded-lg border-1 hover:border-3 hover:scale-110 transition-transform duration-600 border-[#A44BF8] flex  gap-20 p-10">
                     
                      <div className=" w-[40%] h-[70%] rounded-lg  mt-8 flex flex-col gap-3">
                          <p className="text-xl border-1 w-fit px-3 py-1 rounded-xl border-[#60A5FA] bg-gray-950
                           hover:border-gray-800 hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 transition-transform duration-500">modern design</p>
                          <h3 className="text-6xl font-medium leading-13"> Beautiful by Default</h3>
                          <p className="mb-1">Every component follows modern design principles with built-in dark mode support, responsive layouts, and accessibility features.</p>
                          <div className="flex gap-4">
                              <p  className="text-xl border-1 w-fit px-3 py-1 rounded-xl border-gray-700 bg-gray-950
                               hover:border-gray-800 hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 leading-6 transition-transform duration-500 ">responsive</p>
                              <p  className="text-xl border-1 w-fit px-3 py-1 rounded-xl border-gray-700 bg-gray-950
                               hover:border-gray-800 hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 leading-6 transition-transform duration-500">dark mode</p>
                              <p className="text-xl border-1 w-fit px-3 py-1 rounded-xl border-gray-700 bg-gray-950
                               hover:border-gray-800 hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 leading-6 transition-transform duration-500">accessibility</p>
                          </div>
                      </div>

                       <div className="bg-[#0A0A0A] w-[50%]  rounded-lg ">
                          <div className="h-[90%] w-[90%] relative  rounded-lg flex flex-col justify-center items-center m-auto mt-5">
                              <Image src="/second.png" alt="" fill className="rounded-lg object-cover absolute hover:scale-75 transition-transform duration-500"/>
                          </div>
                      </div>
                  </div>
              </div>


              <div className="min-h-[60vh] w-full  px-25 ">
                  <div className=" h-[100%] rounded-lg border-1 hover:border-3 hover:scale-110 transition-transform duration-600 border-[#A44BF8] flex gap-15 p-10">
                      <div className="bg-[#0A0A0A] w-[50%] l rounded-lg ">
                          <div className="h-[90%] w-[90%] relative  rounded-lg flex flex-col justify-center items-center m-auto mt-5">
                              <Image src="/third.png" alt="" height={350} width={350} className="rounded-lg object-contain absolute hover:scale-75 transition-transform duration-500"/>
                          </div>
                      </div>
                      <div className=" w-[40%] h-[70%] rounded-lg  mt-7 flex flex-col gap-2">
                          <p className="text-xl border-1 w-fit px-3 py-1 rounded-xl border-[#60A5FA] bg-gray-950
                           hover:border-gray-800 hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 transition-transform duration-500">framework optimized</p>
                          <h3 className="text-6xl font-medium">Next.js Optimized</h3>
                          <p className="mb-1">Built specifically for Next.js with server-side rendering support, automatic code splitting, and performance optimizations out of the box.</p>
                          <div className="flex gap-3">
                              <p  className="text-xl border-1 w-fit px-3 py-1 rounded-xl border-gray-700 bg-gray-950
                               hover:border-gray-800 hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 leading-6 transition-transform duration-500 ">server-side rendering</p>
                              <p  className="text-xl border-1 w-fit px-3 py-1 rounded-xl border-gray-700 bg-gray-950
                               hover:border-gray-800 hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 leading-6 transition-transform duration-500">code splitting</p>
                              <p className="text-xl border-1 w-fit px-3 py-1 rounded-xl border-gray-700 bg-gray-950
                               hover:border-gray-800 hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 leading-6 transition-transform duration-500">performance</p>
                          </div>
                      </div>
                  </div>
              </div>


              <div className="min-h-[60vh] w-full  px-25 ">
                  <div className=" h-[100%] rounded-lg border-1 hover:border-3 hover:scale-110 transition-transform duration-600 border-[#A44BF8] flex gap-20 p-10">
                      
                      <div className=" w-[40%] h-[70%] rounded-lg  mt-8 flex flex-col gap-3">
                          <p className="text-xl border-1 w-fit px-3 py-1 rounded-xl border-[#60A5FA] bg-gray-950
                           hover:border-gray-800 hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 transition-transform duration-500">built for everyone</p>
                          <h3 className="text-6xl font-medium">Accessibility Built-In</h3>
                          <p className="mb-1">Deliver a seamless experience for all users with features designed to meet accessibility standards.</p>
                          <div className="flex gap-4">
                              <p  className="text-xl border-1 w-fit px-3 py-1 rounded-xl border-gray-700 bg-gray-950
                               hover:border-gray-800 hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 leading-6 transition-transform duration-500 ">universal</p>
                              <p  className="text-xl border-1 w-fit px-3 py-1 rounded-xl border-gray-700 bg-gray-950
                               hover:border-gray-800 hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 leading-6 transition-transform duration-500">accessible design</p>
                              <p className="text-xl border-1 w-fit px-3 py-1 rounded-xl border-gray-700 bg-gray-950
                               hover:border-gray-800 hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 leading-6 transition-transform duration-500">screen friendly</p>
                          </div>
                      </div>
                      <div className="bg-[#0A0A0A] w-[50%]  rounded-lg ">
                          <div className="h-[90%] w-[90%] relative  rounded-lg flex flex-col justify-center items-center m-auto mt-5">
                              <Image src="/fourth.png" alt="" fill className="rounded-lg object-cover absolute hover:scale-75 transition-transform duration-500"/>
                          </div>
                      </div>
                  </div>
              </div>


              <div className="min-h-[60vh] w-full  px-25 ">
                  <div className=" h-[100%] rounded-lg border-1 hover:border-3 hover:scale-110 transition-transform duration-600 border-[#A44BF8] flex gap-15 p-10">
                      <div className="bg-[#0A0A0A] w-[50%]  rounded-lg ">
                          <div className="h-[90%] w-[90%] relative  rounded-lg flex flex-col justify-center items-center m-auto mt-5">
                              <Image src="/fifth.png" alt="" height={350} width={350} className="rounded-lg object-contain absolute hover:scale-75 transition-transform duration-500"/>
                          </div>
                      </div>
                      <div className=" w-[40%] h-[70%] rounded-lg  mt-8 flex flex-col gap-2">
                          <p className="text-xl border-1 w-fit px-3 py-1 rounded-xl border-[#60A5FA] bg-gray-950
                           hover:border-gray-800 hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 transition-transform duration-500">fully customizable</p>
                          <h3 className="text-6xl font-medium">Easily Personalized</h3>
                          <p className="mb-1">Easily customize colors, typography, spacing, and animations using Tailwind CSS classes. Make it match your brand perfectly.</p>
                          <div className="flex gap-4">
                              <p  className="text-xl border-1 w-fit px-3 py-1 rounded-xl border-gray-700 bg-gray-950
                               hover:border-gray-800 hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 leading-6 transition-transform duration-500 ">custom themes</p>
                              <p  className="text-xl border-1 w-fit px-3 py-1 rounded-xl border-gray-700 bg-gray-950
                               hover:border-gray-800 hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 leading-6 transition-transform duration-500">animations</p>
                              <p className="text-xl border-1 w-fit px-3 py-1 rounded-xl border-gray-700 bg-gray-950
                               hover:border-gray-800 hover:bg-gradient-to-br from-[#A44BF8] to-blue-500 hover:scale-110 leading-6 transition-transform duration-500">personalized ui/ux</p>
                          </div>
                      </div>
                  </div>
              </div>




       </div>
              


              
              
    )
}