

const NavBarLink = ({ href, text }: { href: string; text: string }) => {
  return (
    <a href={href} className="text-blue-300 hover:text-gray-400 text-l ml-10 text-2xl">
        {text}
    </a>
    );
};
export default NavBarLink;