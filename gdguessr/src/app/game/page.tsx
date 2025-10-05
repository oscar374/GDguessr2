"use client";

import NavBar from "../components/navbar";
import { useState } from "react";
import { useEffect } from "react";

export default function Game() {
    const [round, setRound] = useState("");
    const [frame, setFrame] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch("http://localhost:8000/question/1/50");
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setRound(data);
        setFrame(data.frameURL);
        setSuggestions(data.allLevels);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setRound("ERROR");
      }
    };

    fetchQuestions();
  }, []);


  return (
    <div className="">
      <NavBar />  
      <div className="w-full h-screen flex flex-col items-center justify-center">
        {loading ? (
          <p className="text-2xl text-white">Loading...</p>
        ) : error ? (
          <p className="text-2xl text-red-500">Error: {error}</p>
        ) : (
        <>
        <div
        className="w-full max-w-4xl aspect-video bg-gray-300 flex items-center justify-center bg-cover"
        style={{ backgroundImage: `url(${frame})` }}
        ></div>

        <form>
            <input
            type="text"
            placeholder="Enter your guess"
            className="mt-4 p-2 border border-gray-400 rounded w-64 text-white"
            list="suggestions"
            />
            <datalist id="suggestions">
            {suggestions.map((suggestion, idx) => (
                <option key={idx} value={suggestion} />
            ))}
            </datalist>

            <button
            type="submit"
            className="ml-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >GUESS</button>
        </form>
        </>
        
        )}
      </div>
    </div>
  );
}