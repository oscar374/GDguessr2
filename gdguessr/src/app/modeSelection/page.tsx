"use client";

import NavBar from "../components/navbar"
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function ModeSelection() {
    const router = useRouter();
    const [maxLevel, setMaxLevel] = useState(0);
    
    const handleMaxLevelChange = (selectedMaxLevel: number) => {
        setMaxLevel(selectedMaxLevel);
        router.push(`/game?maxLevel=${selectedMaxLevel}`);
    };

    return (
        <>
            <NavBar />
            <div className="w-full h-screen flex flex-col items-center justify-center px-4">
                <h1 className="text-white text-4xl sm:text-5xl md:text-6xl mb-5 select-none text-center">Select a gameMode</h1>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-2 w-full sm:w-auto justify-center">
                    <button onClick={() => handleMaxLevelChange(50)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-2xl sm:text-3xl md:text-4xl cursor-pointer">Main</button>
                    <button disabled onClick={() => handleMaxLevelChange(100)} className="bg-gray-500 text-white font-bold py-2 px-4 rounded text-2xl sm:text-3xl md:text-4xl cursor-not-allowed opacity-60">Extended</button>
                    <button disabled onClick={() => handleMaxLevelChange(150)} className="bg-gray-500 text-white font-bold py-2 px-4 rounded text-2xl sm:text-3xl md:text-4xl cursor-not-allowed opacity-60">Legacy</button>
                </div>
            </div>
        </>
    )
}