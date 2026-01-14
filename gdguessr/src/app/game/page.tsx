"use client";

import NavBar from "../components/navbar";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef } from "react";
import { getStreakCookie, setStreakCookie, handleWin } from "./streakManager";

export default function Game() {
    const searchParams = useSearchParams();
    const [tries, setTries] = useState(0);
    const [round, setRound] = useState<any>("");
    const [frame, setFrame] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [guess, setGuess] = useState("");
    const [feedback, setFeedback] = useState<"WRONG" | "CORRECT" | null>(null);
    const [feedbackVisible, setFeedbackVisible] = useState(false);
    const [streak, setStreak] = useState("");

    // AUDIO
    const [winAudio] = useState(
        typeof Audio !== "undefined" ? new Audio("/sounds/geometryDashCoin.mp3") : null
    );
    const [loseAudio] = useState(
        typeof Audio !== "undefined" ? new Audio("/sounds/geometryDashDeath.mp3") : null
    );

    const playSound = (type) => {
        const soundMap = {
        win: winAudio,
        lose: loseAudio,
    };

    const audio = soundMap[type];
        if (audio) {
            audio.currentTime = 0; 
            audio.volume = 0.2;
            audio.play();
        }
    };

    const hasFetched = useRef(false);

    const fetchQuestions = async (maxLevelValue: number) => {
        try {
            const response = await fetch(`http://192.168.0.134:8000/question/1/${maxLevelValue}`);
            if (!response.ok) {
                throw new Error("Failed to fetch questions");
            }
            const data = await response.json();
            setRound(data);

            if(data.frameURL === null) {
                window.location.reload();
                return;
            }
            setFrame(data.frameURL);
            setSuggestions(data.allLevels);
            setLoading(false);
        }catch (err: any) {
            setError(err.message);
            setRound("ERROR");
        }
    };

    useEffect(() => {
        const streakCookieValue = async () => {
            const streakValue = await getStreakCookie();
            setStreak(streakValue.toString());
        }
        streakCookieValue();
        const maxLevelParam = searchParams.get("maxLevel");
        if (maxLevelParam && !hasFetched.current) {
            hasFetched.current = true;
            const level = Number(maxLevelParam);
            fetchQuestions(level);
        }
    }, [searchParams]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!guess) return;
        if (guess.toLowerCase() === round.levelName.toLowerCase()) {
            playSound("win");
            setFeedback("CORRECT");
            setFeedbackVisible(true);
            if(tries == 0) {
                handleWin()
                setStreak((await getStreakCookie()).toString());
            } else {
                setStreak("0");
                setStreakCookie(0);
                setStreak
            }
            setTimeout(() => {
                setFeedbackVisible(false);
                window.location.reload();
            }, 800);
        } else {
            playSound("lose");
            setFeedback("WRONG");
            setFeedbackVisible(true);
            setTimeout(() => setFeedbackVisible(false), 500);
            setTries(tries + 1);
            setStreakCookie(0);
            setStreak("0");
        }
    };

    return (
        <div className="overflow-hidden h-screen">
            <NavBar />
            <div className="w-full h-screen flex flex-col items-center justify-center overflow-hidden">
                {loading ? (
                    <p className="text-5xl text-white select-none">Loading...</p>
                ) : error ? (
                    <p className="text-5xl text-red-500 select-none">Error: {error}</p>
                ) : (
                    <>
                        <h2 className="text-yellow-300 text-3xl select-none">attempts: {tries}</h2>
                        <h2 className="text-green-300 text-3xl select-none">streak: {streak}</h2>

                        <div
                            className="w-full max-w-5xl aspect-video bg-gray-300 flex items-center justify-center bg-cover relative rounded-2xl border-2 border-yellow-300 mt-4"
                            style={{ backgroundImage: `url(${frame})` }}
                        >
                            {feedbackVisible && (
                                <h1
                                    className={`absolute inset-0 flex items-center justify-center text-7xl font-bold animate-pulse-fade ${
                                        feedback === "WRONG" ? "text-red-500" : "text-green-500"
                                    }`}
                                >
                                    {feedback}
                                </h1>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="w-full max-w-md px-4 flex flex-col gap-2 mt-2">
                            <input
                                type="text"
                                placeholder="Enter your guess"
                                className="p-3 border-2 border-blue-400 rounded text-white bg-gray-800 text-lg placeholder-gray-400 w-full focus:outline-none focus:border-blue-600"
                                list="suggestions"
                                value={guess}
                                onChange={(e) => setGuess(e.target.value)}
                            />
                            <datalist id="suggestions">
                                {suggestions.map((suggestion, idx) => (
                                    <option key={idx} value={suggestion} />
                                ))}
                            </datalist>

                            <button
                                type="submit"
                                className="p-3 bg-blue-500 text-white rounded text-lg font-semibold hover:bg-blue-600 cursor-pointer w-full"
                            >
                                GUESS
                            </button>
                        </form>
                        <style jsx>{`
                            .animate-pulse-fade {
                                animation: pulseFade 1s ease;
                            }
                            @keyframes pulseFade {
                                0% {
                                    opacity: 1;
                                }
                                100% {
                                    opacity: 0;
                                }
                            }
                        `}</style>
                    </>
                )}
            </div>
        </div>
    );
}