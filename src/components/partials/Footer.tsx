import React from 'react'
import Logo from '../shared/Logo'
import { DISCORD_URL, FACEBOOK_URL } from "@/constants";
import { AiFillFacebook } from "react-icons/ai";
import { FaDiscord } from "react-icons/fa";
import Link from 'next/link'
interface FooterItemProps {
  Icon: React.ComponentType<any>;
  href: string;
}

const Footer = () => {
  return (
    <div className='w-full flex flex-col items-center justify-center px-4 md:px-12 py-16 space-y-4'>
      <Logo className='w-28 h-28' />
      <div className="flex items-center space-x-4">
        <ContactItem href={DISCORD_URL} Icon={FaDiscord} />
        <ContactItem href={FACEBOOK_URL} Icon={AiFillFacebook} />
      </div>
      <div className="flex items-center space-x-8 text-center">
        <Link href="/tos">
          <p className="text-lg">Terms of Service</p>
        </Link>

        <Link href="/dmca">
          <p className="text-lg">DMCA</p>
        </Link>

        <Link href="/contact">
          <p className="text-lg">Contact</p>
        </Link>
      </div>
      <p className="text-sm text-gray-300 text-center">Kaguya does not store any files on our server, we only linked to the media which is hosted on 3rd party services.</p>

      <p className="text-sm text-gray-300 text-center">© Kaguya.live</p>
    </div>
  )
}

const ContactItem: React.FC<FooterItemProps> = ({ Icon, href }) => {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      <Icon className="w-6 h-6 hover:text-primary-500 transition duration-300" />
    </a>
  );
};

export default Footer