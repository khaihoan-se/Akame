import React from "react";
import Header from "@/components/partials/Header";
import Footer from "@/components/partials/Footer";
import MobileLayout from "./MobileLayout";
import Router from "next/router";
import NProgress from "nprogress";


Router.events.on('routeChangeStart', NProgress.start)
Router.events.on('routeChangeComplete', NProgress.done)
Router.events.on('routeChangeError', NProgress.done)
interface Props {
    children: any;
}

const BaseLayouts: React.FC<Props> = ({ children }) => {
    const [ isMobile, setIsMobile ] = React.useState(false)
    
    React.useEffect(() => {
        const MobileWidth = 1024;
        setIsMobile(window.innerWidth < MobileWidth)
        const handleIsMobile = () => {
            setIsMobile(window.innerWidth < MobileWidth)
        }
        window.addEventListener("resize", handleIsMobile)
    }, [isMobile])

    return isMobile ? <MobileLayout /> :  
    (
        <main className="scroll-bar">
            <Header />

            <div className="app">{children}</div>

            <Footer />
        </main>
    ) 
}

export default BaseLayouts;