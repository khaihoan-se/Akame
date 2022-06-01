import React from "react";
import Section from "@/components/shared/Section";
import Head from "../shared/Head";
import Link from "next/link";

const MobileLayout: React.FC = () => {
    return (
        <div className="relative w-full min-h-screen flex items-center">
            <Head title={`Mobile - Kaguya`} />

            <div className="fixed z-0 w-full h-full flex items-center justify-center">
                <h1 className="font-bold text-[30vw] text-gray-500">SORRY</h1>

                <div className="absolute inset-0 bg-black/90 w-full h-full"></div>
            </div>

            <Section className="relative z-10 flex flex-col items-center w-full h-full text-center ">
                <div className="mb-4 text-gray-300">
                <span className="text-lg">
                    <span className="text-red-300">This is the screen under 970px</span>
                </span>
                </div>

                <p className="text-4xl font-semibold">Currently, we do not support interfaces smaller than 970px</p>

                <p className="text-2xl text-gray-200 mt-4">Please use a screen above 970px for the best user interface experience</p>

                <Link href="/">
                <a>
                    <button className="mt-8">
                    <p className="text-lg">back</p>
                    </button>
                </a>
                </Link>
            </Section>
        </div>
    )
}

export default MobileLayout;