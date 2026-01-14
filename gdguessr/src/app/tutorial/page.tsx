import NavBar from "../components/navbar"

export default function Tutorial() {
    return (
        <>
            <NavBar />
            <div className="w-full min-h-screen flex flex-col items-center justify-center px-4 py-8">
                <h1 className="pt-10 text-white text-3xl sm:text-5xl text-center">How to play GDguessr</h1>
                <h1 className="pt-12 text-white text-lg sm:text-3xl text-center">1. Click play and then choose a gamemode</h1>
                <h1 className="pt-12 text-white text-lg sm:text-3xl text-center">2. Wait a couple of seconds for it to load</h1>
                <h1 className="pt-12 text-white text-lg sm:text-3xl text-center">3. Try to guess the level on the demonList from the presented frame</h1>
            </div>
        </>
    )
    
}