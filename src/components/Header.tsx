import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  BrandGithub,
  BrandLinkedin,
  LayoutSidebarRightExpand,
  LayoutSidebarLeftExpand,
} from "tabler-icons-react";
const nav = [
  {
    name: "Home",
    href: "/",
  },
  {
    href: "/about",
    name: "About",
  },
  {
    name: "Projects",
    href: "/projects",
  },
  {
    name: "Guestbook",
    href: "/guestbook",
  },
];

const social = [
  {
    name: "Github",
    href: "https://github.com/N-Georges",
    icon: BrandGithub,
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/georges-nodari/",
    icon: BrandLinkedin,
  },
];

const Header = () => {
  const router = useRouter();
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarIsOpen(!sidebarIsOpen);
  };

  return (
    <header aria-label="Site Header" className="sticky top-0">
      <div className="flex items-center justify-between h-16 max-w-screen-lg px-6 mx-auto">
        <div className="flex items-center justify-between w-full gap-4">
          <Link href="/" className="flex">
            <span className="sr-only">Logo</span>
            <Image src="/logo1.png" alt="Logo" width={40} height={40} />
          </Link>
          <button
            aria-label="Toggle Sidebar"
            onClick={toggleSidebar}
            className="sm:hidden"
          >
            {sidebarIsOpen ? (
              <LayoutSidebarLeftExpand size={35} />
            ) : (
              <LayoutSidebarRightExpand size={35} />
            )}
          </button>
        </div>

        <div className="flex items-center justify-end flex-1 gap-8">
          <nav
            aria-label="Site Nav"
            className="hidden sm:flex sm:gap-4 whitespace-nowrap sm:text-sm sm:font-bold sm:capitalize sm:tracking-wide sm:text-white"
          >
            {nav.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block h-16 border-b-2 border-transparent hover:text-cyan-500 ${
                  router.pathname === item.href
                    ? "border-cyan-500 text-cyan-500"
                    : ""
                } leading-[4rem] `}
              >
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>

          <div className="items-center hidden sm:flex">
            {social.map((item) => (
              <div key={item.name} className="flex items-center">
                <span>
                  <Link
                    target="_blank"
                    href={item.href}
                    className="grid w-16 h-16 border-b-2 border-transparent place-content-center hover:text-cyan-500"
                  >
                    <item.icon size={20} />

                    <span className="sr-only">{item.name}</span>
                  </Link>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
