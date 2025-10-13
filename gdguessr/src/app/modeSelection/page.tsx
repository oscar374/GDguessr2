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
            <div className="w-full h-screen flex flex-col items-center justify-center">
                <h1 className="text-white text-6xl mb-5 select-none">Select a gameMode</h1>
                <div className="flex">
                    <button onClick={() => handleMaxLevelChange(50)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded m-4 text-4xl cursor-pointer">Main</button>
                    <button onClick={() => handleMaxLevelChange(100)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded m-4 text-4xl cursor-pointer">Extended</button>
                    <button onClick={() => handleMaxLevelChange(150)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded m-4 text-4xl cursor-pointer">Legacy</button>
                </div>
            </div>
        </>
    )
}