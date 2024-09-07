import Image from "next/image";
import SignIn from "./components/SignIn";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div className="h-screen w-full flex">
        <div className="h-full w-1/2 bg-[#f2f2f2] flex justify-center items-center">
          <Image
            src={"/login.svg"}
            alt=""
            width={100}
            height={100}
            className="h-full w-11/12"
          />
        </div>
        <div className="h-full w-1/2 flex flex-col justify-center items-center bg-red-500">
          <div>
            <SignIn />
          </div>
        </div>
      </div>
    </main>
  );
}
