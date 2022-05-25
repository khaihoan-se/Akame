import React, { useEffect, useState } from "react";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";
import Search from "@/components/shared/Search";
import { RiGlobalLine } from "react-icons/ri";
import Button from "../shared/Button";
import NavItem from "../shared/NavItem";

const MENU_LIST = [
    { title: 'Anime', path: '/' },
    { title: 'Manga', path: '/manga' },
    { title: 'Developer', path: '/developer' }
]

const Header: React.FC = () => {
    const router = useRouter();
    
    const [ istop, setIstop ] = useState<boolean>(false);

    const isActive = (url: string) => {
        if(router.pathname === url) return true
    }

    useEffect(() => {
        const handleIsTop = () => {
            setIstop(window.scrollY > 0);
        }
        
        document.addEventListener('scroll', handleIsTop);
    }, [])
    return (
        <header className={classNames(
            "px-4 md:px-12 flex items-center h-16 fixed top w-full z-40 transition duration-500 bg-gradient-to-b from-black/80 via-black/60 to-transparent",
            istop && "bg-background"
        )}>
            {/* Logo */}
            <div className="relative h-10 w-10 mr-6">
                <NavItem href="/">{() => <Logo className="!w-full !h-full" />}</NavItem>
            </div>
            {/* menu */}
            <ul className="flex-1 flex items-center">
                {MENU_LIST.map((menu) => (
                    <Link href={`${menu.path}`} key={menu.path}>
                        <li className={classNames(
                            "pl-4 text-typography-secondary cursor-pointer hover:text-white",
                            isActive(`${menu.path}`) && "text-primary-300 hover:text-primary-400"
                        )}>{menu.title}</li>
                    </Link>
                ))}
            </ul>
            {/* tools */}
            <div className="flex items-center">
                <Search classSearch={classNames("mr-6", istop && "bg-background-800")} />
                <div>
                    <div className={classNames(
                        "p-2 flex items-center rounded-3xl bg-background-900 gap-x-1.5 mr-6 cursor-pointer",
                        istop && "bg-background-800"
                    )}>
                        <RiGlobalLine className="w-6 h-6" />
                        <span className="text-base text-white">English</span>
                    </div>
                </div>
                <Button title="Login" classButton="transition duration-300 flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-opacity-80 hover:bg-primary-500 bg-primary-500" />
            </div>
        </header>
    )
}

export default Header;