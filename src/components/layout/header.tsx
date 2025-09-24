import Image from "next/image";
import Link from "next/link";


export default function header() {
  return (
    <div className="sticky top-0 z-[9999] w-full">
      <div className="h-13 flex items-center justify-center bg-gradient-to-br from-[#A44BF8] to-blue-500 shadow-[0_12px_60px_#A44BF8,0_0_120px_#A44BF8] animate-gradient-move  ">
            <p>Looking for components? Introducing <span className="underline">Aurora UI </span></p>
      </div>
      <div className=" w-full px-10 py-4 flex items-center justify-between bg-background  border-b-[1px] border-dotted border-zinc-400 dark:border-white/20 ">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.png"
          width={40}
          height={40}
          alt="logo"
          className=""
        ></Image>
        <span className="text-xl font-semibold">Aurora-UI</span>
      </Link>

      <div className="flex items-center gap-4">
        {["Docs", "Components", "Templates"].map((item, index) => (
          <Link key={index} href="#">
            <span className="text-sm">{item}</span>
          </Link>
        ))}
      </div>
    </div>
    </div>
  );
}
