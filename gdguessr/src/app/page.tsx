import NavBar from "./components/navbar";

export default function Home() {
  return (
    <div className="">
      <NavBar />
      <div className="w-full h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-white text-6xl sm:text-7xl lg:text-8xl text-center">GDguessr</h1>
        <a href="/modeSelection" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-4 text-2xl sm:text-3xl lg:text-4xl">Play</a>
      </div>
    </div>
  );
}
