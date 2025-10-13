import { motion } from "motion/react";
import Image from "next/image";
export default function TemplateShow() {
  return (
    <div className="h-[65vh] w-full px-20 py-10   relative flex-nowrap overflow-x-hidden"> 
      <div className="bottom-0 left-0 absolute bg-background h-[100%] w-[7%] shrink-0 blur-[48px] z-9"></div>
      <motion.div
      className="h-[90%] w-[100%] flex gap-8 "
      initial={{ x: 0 }}
      whileInView={{ x: "-100%"}} 
      transition={{ 
        repeat: Infinity, 
        repeatType: "loop", 
        duration: 20,
        ease: "linear"
       }}
   
    >
        <div className="h-[100%] w-[40%] rounded-lg shrink-0 relative">
             <Image
                 src="/luffy.jpg"   
                    alt="Example image"
                    fill                 
                       className="object-cover rounded-lg hover:scale-90 transition-transform duration-500"
                       priority             
                          />
        </div>
        <div className="h-[100%] w-[40%] rounded-lg shrink-0 relative">
             <Image
                 src="/luffy.jpg" 
                    alt="Example image"
                    fill                  
                       className="object-cover rounded-lg hover:scale-90 transition-transform duration-500"
                       priority          
                          />
        </div>
        <div className="h-[100%] w-[40%] rounded-lg shrink-0 relative">
             <Image
                 src="/luffy.jpg"  
                    alt="Example image"
                    fill                  
                       className="object-cover rounded-lg hover:scale-90 transition-transform duration-500"
                       priority             
                          />
        </div>
        <div className="h-[100%] w-[40%] rounded-lg shrink-0 relative">
             <Image
                 src="/luffy.jpg"  
                    alt="Example image"
                    fill                 
                       className="object-cover rounded-lg hover:scale-90 transition-transform duration-500"
                       priority            
                          />
        </div>
        <div className="h-[100%] w-[40%] rounded-lg shrink-0 relative">
             <Image
                 src="/luffy.jpg"  
                    alt="Example image"
                    fill                 
                       className="object-cover rounded-lg hover:scale-90 transition-transform duration-500 "
                       priority              
                          />
        </div>
        <div className="h-[100%] w-[40%] rounded-lg shrink-0 relative">
             <Image
                 src="/luffy.jpg" 
                    alt="Example image"
                    fill                  
                       className="object-cover rounded-lg hover:scale-90 transition-transform duration-500"
                       priority              
                          />
        </div>
        
        
      </motion.div>
      <div className="bottom-0 right-0 absolute bg-background h-[100%] w-[7%] shrink-0 blur-[48px] z-9"></div>
    </div>
  );
}
