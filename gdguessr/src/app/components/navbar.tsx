'use client'

import NavBarLink from "./navbarLink"
import { useState } from "react"

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <nav className="w-full h-15 fixed flex items-center justify-center bg-gray-950 border-b-2 border-cyan-800 z-50">
            <div className="w-8/9 h-full flex items-center justify-between">
                <div className="h-full flex items-center justify-start">
                    <NavBarLink href="/" text="GDguessr" />
                </div>
                
                {/* Desktop Menu */}
                <div className="hidden md:flex h-full items-center justify-end gap-2">
                    <NavBarLink href="/" text="Home" />
                    <NavBarLink href="/modeSelection" text="Play" />
                    <NavBarLink href="/tutorial" text="How to play" />
                </div>

                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden flex flex-col gap-1 cursor-pointer"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="w-6 h-0.5 bg-cyan-800"></div>
                    <div className="w-6 h-0.5 bg-cyan-800"></div>
                    <div className="w-6 h-0.5 bg-cyan-800"></div>
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-15 left-0 w-full bg-gray-950 border-b-2 border-cyan-800 md:hidden flex flex-col gap-2 p-4">
                    <NavBarLink href="/" text="Home" />
                    <NavBarLink href="/modeSelection" text="Play" />
                    <NavBarLink href="/tutorial" text="How to play" />
                </div>
            )}
        </nav>
    )
}
