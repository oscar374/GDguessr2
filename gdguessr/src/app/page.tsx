import Image from "next/image";
import NavBar from "./components/navbar";

export default function Home() {
  return (
    <div className="">
      <NavBar />
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-white text-8xl">GDguessr</h1>
        <a href="/modeSelection" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4 text-4xl">Play</a>
      </div>
    </div>
  );
}
