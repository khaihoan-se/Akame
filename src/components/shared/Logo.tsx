import Image from "next/image";
import React from "react";
import classNames from "classnames";
import Link from "next/link";

interface LogoProps {
    className?: string
}
const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <Link href="/">
            <div className={classNames(
                "relative rounded-full cursor-pointer",
                className
            )}>
                <Image src="/logo.jpeg" layout="fill" objectFit="contain" alt="logo" className="rounded-full" />
            </div>
        </Link>
    )
}

export default Logo;