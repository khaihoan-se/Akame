import React, { useEffect, useState } from "react";
import Logo from "@/components/shared/Logo";
import Link from "next/link";
import classNames from "classnames";
import { useRouter } from "next/router";
import { RiGlobalLine } from "react-icons/ri";
import Button from "../shared/BaseButton";
import NavItem from "../shared/NavItem";
import { AiFillFacebook, AiOutlineSearch } from "react-icons/ai";
import Image from "../shared/Image";
import HeaderProject from "../shared/HeaderProject";
import { GetStaticProps } from "next";
import { useDispatch, useSelector } from "react-redux";
import { getUser, removeUser } from "@/redux/actions/userAction";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import ModuleFavorite from "../shared/ModuleFavorite";



const MENU_LIST = [
    { title: 'Anime', path: '/' },
    { title: 'Manga', path: '/manga' },
]

const Header: React.FC = () => {
    const listUser = useSelector((state: any) => state.user.listUser)
    const listFavorite = useSelector((state: any) => state.favorite.listFavorite)

    const dispatch = useDispatch()

    console.log(listFavorite);
    
    const router = useRouter();

    const searchUrl = router.asPath.includes("manga")
    ? "/browse?type=manga"
    : "/browse?type=anime";
    
    const [ istop, setIstop ] = useState<boolean>(false);
    const [ open, setOpen ] = useState(false);
    const [ openFa, setOpenFa ] = useState(false)

    const isActive = (url: string) => {
        if(router.pathname === url) return true
    }
    
    useEffect(() => {
        const handleIsTop = () => {
            setIstop(window.scrollY > 0);
        }
        document.addEventListener('scroll', handleIsTop);
    }, [])


    const handleSignOut = () => {
        const action = removeUser(listUser)
        dispatch(action)
        localStorage.clear()
        router.push('/')
    }
        
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
                        "p-2 flex items-center rounded-3xl bg-background-900 gap-x-1.5 mr-16 cursor-pointer",
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
                            "w-7 h-7 font-semibold hover:text-primary-300 transition duration-300 mr-16",
                            isActive && "text-primary-300"
                        )}
                        />
                    )}
                </NavItem>
                
                <div className="mr-16 relative cursor-pointer"
                    onClick={() => setOpenFa(!openFa)}
                >
                    <div>
                        <MdOutlineFavoriteBorder className="w-7 h-7 font-semibold hover:text-primary-300" />
                        <div className="absolute top-[-8px] right-[-8px] text-xs bg-primary-600 flex items-center justify-center rounded-full min-w-[20px] min-h-[20px]">{listFavorite.length}</div>
                    </div>
                    {
                        openFa && <ModuleFavorite data={listFavorite} />
                    }
                </div>

                <div className="flex items-center space-x-2">
                    { listUser.length < 1
                    ? <Link href="/login">
                            <a>
                                <Button primary className="px-4 py-2 rounded-md hover:bg-primary-700">
                                    <p>Login</p>
                                </Button>
                            </a>
                        </Link> 
                    : <HeaderProject user={listUser[0]} open={open} setOpen={setOpen} handleSignOut={handleSignOut} />}
                </div>
            </div>
        </header>
    )
}

export default Header;