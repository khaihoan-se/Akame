import React, { useState, useRef, useCallback, useEffect, useMemo } from "react";
import Image from "@/components/shared/Image";
import { AnimatePresence, motion } from "framer-motion";
import YouTube, { YouTubeProps } from "react-youtube";
import classNames from "classnames"
import CircleButton from "@/components/shared/CircleButton";
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";
import BannerSwiper from "@/components/shared/BannerSwiper";
import { SwiperProps } from "@/components/shared/Swiper";


const bannerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
};
interface HomeBannerProps {
    data?: any
}

const HomeBanner: React.FC<HomeBannerProps> = ({ data }) => {
    const [index, setIndex] = useState<number>(2)
    const [showTrailer, setShowTrailer] = useState(false);
    const [player, setPlayer] =
    useState<ReturnType<YouTube["getInternalPlayer"]>>();
    const isRanOnce = useRef(false);
    const [isMuted, setIsMuted] = useState(true);

    // const datas = data.Page.media;
    // const activeSlide = useMemo(() => datas[index], [datas, index]);
    const activeSlide = useMemo(() => data[index], [data, index])

    const handleSlideChange: SwiperProps["onSlideChange"] = useCallback(
        (swiper: any) => {
          setIndex(swiper.realIndex);
        },
        []
    );

    const mute = useCallback(() => {
        if (!player) return;
    
        player.mute();
    
        setIsMuted(true);
      }, [player]);
    
    const unMute = useCallback(() => {
        if (!player) return;
    
        player.unMute();
    
        setIsMuted(false);
    }, [player]);

    useEffect(() => {
        setShowTrailer(false);
    }, [activeSlide]);
    return (
        <React.Fragment>
            <div className="group relative w-full h-[450px] overflow-hidden">
                <AnimatePresence>
                    {activeSlide.bannerImage && !showTrailer && (
                        <motion.div
                        variants={bannerVariants}
                        animate="animate"
                        exit="exit"
                        initial="initial"
                        className="w-full h-0"
                        key={activeSlide.bannerImage}
                        >
                        <Image
                            src={activeSlide.bannerImage}
                            layout="fill"
                            objectFit="cover"
                            objectPosition="50% 35%"
                            alt={activeSlide.bannerImage}
                        />
                        </motion.div>
                    )}
                    {activeSlide?.trailer && (
                        <YouTube
                            videoId={activeSlide.trailer.id}
                            onReady={({ target }) => {
                            setPlayer(target);
                            }}
                            onPlay={({ target }) => {
                            setShowTrailer(true);
            
                            if (!isRanOnce.current) {
                                setIsMuted(true);
                            } else if (!isMuted) {
                                setIsMuted(false);
            
                                target.unMute();
                            }
            
                            isRanOnce.current = true;
                            }}
                            onEnd={() => {
                                setShowTrailer(false);
                            }}
                            onError={() => {
                                setShowTrailer(false);
                            }}
                            containerClassName={classNames(
                                "relative w-full overflow-hidden aspect-w-16 aspect-h-9 h-[300%] -top-[100%]",
                                !showTrailer && "hidden"
                            )}
                            className="absolute inset-0 w-full h-full"
                            opts={{
                                playerVars: {
                                    autoplay: 1,
                                    modestbranding: 1,
                                    controls: 0,
                                    mute: 1,
                                    origin: "http://localhost:3000",
                                },
                            }}
                        />
                    )}
                </AnimatePresence>
                <div className="absolute inset-0 flex flex-col justify-center px-4 banner__overlay md:px-12"></div>

                {showTrailer && player && (
                    <CircleButton
                        LeftIcon={isMuted ? BsFillVolumeMuteFill : BsFillVolumeUpFill}
                        outline
                        className="absolute bottom-20 right-12"
                        iconClassName="w-6 h-6"
                        onClick={isMuted ? unMute : mute}
                    />
                )}
                <div className="absolute bottom-0 w-full h-16 banner__overlay--down"></div>
            </div>
            <div className="w-full px-4 pb-12 md:px-12">
                <BannerSwiper onSlideChange={handleSlideChange} data={data} />
            </div>
        </React.Fragment>
    )
}

export default React.memo(HomeBanner) as typeof HomeBanner;
