import BannerSwiper from "@/components/shared/BannerSwiper";
import CircleButton from "@/components/shared/CircleButton";
import DotList from "@/components/shared/DotList";
import Image from "@/components/shared/Image";
import Swiper, { SwiperProps, SwiperSlide } from "@/components/shared/Swiper";
import TextIcon from "@/components/shared/TextIcon";
import { Anime, Manga } from "@/types";
import classNames from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AiFillHeart, AiFillPlayCircle } from "react-icons/ai";
import { BsFillVolumeMuteFill, BsFillVolumeUpFill } from "react-icons/bs";
import { MdTagFaces } from "react-icons/md";
import YouTube, { YouTubeProps } from "react-youtube";
import Description from "./Description";
interface HomeBannerProps<T> {
    data: T extends "anime" ? Anime[] : Manga[];
    type: T;
}

const bannerVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
const transition = [0.33, 1, 0.68, 1];

const HomeBanner = <T extends "anime" | "manga">({
  data,
  type,
}: HomeBannerProps<T>) => {  
  const [index, setIndex] = useState<number>(0);
  const [showTrailer, setShowTrailer] = useState(false);
  const [player, setPlayer] =
    useState<ReturnType<YouTube["getInternalPlayer"]>>();
  const [isMuted, setIsMuted] = useState(true);
  const isRanOnce = useRef(false);

  const activeSlide = data[index]

  const handleSlideChange: SwiperProps["onSlideChange"] = useCallback(
    (swiper: any) => {
      setIndex(swiper.realIndex);
    },
    []
  );

  const getRedirectUrl = useCallback(
    (id: number) => {
      return type === "anime" ? `/anime/details/${id}` : `/manga/details/${id}`;
    },
    [type]
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

          {type === "anime" && (activeSlide as Anime)?.trailer && (
            <YouTube
              videoId={(activeSlide as Anime)?.trailer?.id}
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
                  origin: "https://kaguya.live",
                },
              }}
            />
          )}
        </AnimatePresence>

        <div className="absolute inset-0 flex flex-col justify-center px-4 banner__overlay md:px-12"></div>

        <motion.div
          variants={bannerVariants}
          animate="animate"
          initial="initial"
          key={activeSlide.title.english}
          className="absolute left-12 top-1/2 -translate-y-1/2 w-full md:w-[45%]"
          transition={{ ease: transition, duration: 1 }}
        >
          <h1 className="text-2xl font-bold uppercase md:text-4xl line-clamp-2 sm:line-clamp-3 md:line-clamp-4">
            {activeSlide.title.native}
          </h1>
          <div className="flex flex-wrap items-center mt-4 text-lg gap-x-8">
            {activeSlide.averageScore && (
              <TextIcon LeftIcon={MdTagFaces} iconClassName="text-green-300">
                <p>{activeSlide.averageScore}%</p>
              </TextIcon>
            )}

            <TextIcon LeftIcon={AiFillHeart} iconClassName="text-red-400">
              <p>{activeSlide.favourites}</p>
            </TextIcon>

            <DotList>
              {activeSlide.genres.map((genre) => (
                <span key={genre}>{genre}</span>
              ))}
            </DotList>
          </div>

          <Description
            description={activeSlide.description}
            className="hidden mt-2 text-base md:block text-gray-200 md:line-clamp-5"
          />
        </motion.div>
        <Link href={getRedirectUrl(activeSlide.id)}>
          <a>
            <CircleButton
              LeftIcon={AiFillPlayCircle}
              outline
              className="absolute hidden -translate-x-1/2 -translate-y-1/2 opacity-0 md:block left-2/3 top-1/2 group-hover:opacity-100"
              iconClassName="w-16 h-16"
            />
          </a>
        </Link>

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
  );
};

export default React.memo(HomeBanner);
