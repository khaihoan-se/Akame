import React, { useEffect, useState } from "react";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";
import { RiGlobalLine } from "react-icons/ri";
import Button from "../shared/BaseButton";
import NavItem from "../shared/NavItem";
import { AiFillFacebook, AiOutlineSearch } from "react-icons/ai";
import { fetchUser, userAccessToken } from "@/api/user";
import Image from "../shared/Image";


const MENU_LIST = [
    { title: 'Anime', path: '/' },
    { title: 'Manga', path: '/manga' },
]

const Header: React.FC = () => {
    const router = useRouter();
    
    const searchUrl = router.asPath.includes("manga")
    ? "/browse?type=manga"
    : "/browse?type=anime";
    
    const [ istop, setIstop ] = useState<boolean>(false);

    const [ user, setUser ] = useState<any>({});

    const isActive = (url: string) => {
        if(router.pathname === url) return true
    }

    useEffect(() => {
        const userInfo = fetchUser();
        setUser(userInfo)
        
    }, [user])

    useEffect(() => {
        const handleIsTop = () => {
            setIstop(window.scrollY > 0);
        }
        
        document.addEventListener('scroll', handleIsTop);
    }, [])
    
    console.log(user);
    
    return (
        <header className={classNames(
            "px-4 md:px-12 flex items-center h-16 fixed top w-full z-50 transition duration-500 bg-gradient-to-b from-black/80 via-black/60 to-transparent",
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
                <div>
                    <div className={classNames(
                        "p-2 flex items-center rounded-3xl bg-background-900 gap-x-1.5 mr-6 cursor-pointer",
                        istop && "bg-background-800"
                    )}>
                        <RiGlobalLine className="w-6 h-6" />
                        <span className="text-base text-white">English</span>
                    </div>
                </div>
                
                <NavItem href={searchUrl}>
                    {({ isActive }) => (
                        <AiOutlineSearch
                        className={classNames(
                            "w-7 h-7 font-semibold hover:text-primary-300 transition duration-300 mr-6",
                            isActive && "text-primary-300"
                        )}
                        />
                    )}
                </NavItem>

                <div className="flex items-center space-x-2">
                    {/* {accessToken
                        ?   <Link href="/login">
                                <a>
                                    <Button primary className="px-4 py-2 rounded-md">
                                        <p>Login</p>
                                    </Button>
                                </a>
                            </Link> 
                        :   <div className="relative h-10 w-10 rounded-full">
                            </div>
                    } */}
                    {
                        !user[0]
                        ?   <Link href="/login">
                                <a>
                                    <Button primary className="px-4 py-2 rounded-md">
                                        <p>Login</p>
                                    </Button>
                                </a>
                            </Link>
                        : <div className="relative h-10 w-10 rounded-full">
                            <img src={user[0]?.photoURL} alt="" className="rounded-full object-cover" />
                        </div>
                    }
                </div>
            </div>
        </header>
    )
}

export default Header;