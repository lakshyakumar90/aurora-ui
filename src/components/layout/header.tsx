import Image from "next/image";
import Link from "next/link";


export default function header() {
  return (
    <div className=" px-10 py-4 flex items-center justify-between backdrop-blur-lg">
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
  );
}
