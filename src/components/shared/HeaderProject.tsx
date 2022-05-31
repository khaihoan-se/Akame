import React from 'react'
import { HiLogout } from "react-icons/hi";


interface HeaderProjectProps {
    user?: any;
    setOpen: any;
    open?: boolean;
    handleSignOut?: () => void;
}
const HeaderProject: React.FC<HeaderProjectProps> = ({
    user,
    setOpen,
    open,
    handleSignOut,
}) => {
    return (
        <div 
            className="relative h-10 w-10 rounded-full cursor-pointer"
            onClick={() => setOpen(!open)}
        >
            <img src={user[0]?.photoURL} alt="" className="rounded-full object-cover" />
            {open && (
                <div className="absolute right-0 top-14 min-w-[250px] p-4 bg-background rounded-md after:w-4 after:h-4 after:bg-black after:inline-block after:absolute after:top-[-7px] after:right-[10px] after:rotate-45	">
                    <div className="flex items-center">
                        <img src={user[0]?.photoURL} alt="" className="rounded-full object-cover w-16 h-16" />
                        <div className="ml-4">
                            <p className="text-xl">{user[0]?.displayName}</p>
                            <span className="text-[10px]">{user[0]?.email}</span>
                        </div>
                    </div>
                    <div 
                        className="flex items-center mt-6 hover:bg-background-600 px-4 py-2 rounded-md cursor-pointer"
                        onClick={handleSignOut}
                    >
                        <HiLogout />
                        <p className="ml-2">Đăng xuất</p>
                    </div>
                </div>
            )}
        </div>
  )
}

export default HeaderProject