import NavBarLink from "./navbarLink"

export default function NavBar() {
    
    
    return (
        <nav className="w-full h-15 fixed flex items-center justify-center">
            <div className="w-8/9 h-full flex">
                <div className="w-1/2 h-full flex items-center justify-start">
                    <NavBarLink href="/" text="GDguessr" />
                </div>
                <div className="w-1/2 h-full flex items-center justify-end">
                    <NavBarLink href="/" text="Home" />
                    <NavBarLink href="/game" text="Game" />
                </div>
            </div>
        </nav>
    )
}
