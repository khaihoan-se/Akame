import PlainCard from "@/components/shared/PlainCard";
import Swiper, { SwiperProps, SwiperSlide } from "@/components/shared/Swiper";
import { motion } from "framer-motion";
import React from "react";
import {Anime, Manga} from "@/types"

interface BannerSwiperProps extends SwiperProps {
  data: Anime[] | Manga[];
}

const BannerSwiper: React.FC<BannerSwiperProps> = ({ data, ...props }) => {
  return (
    <Swiper
      slidesPerGroup={1}
      centerInsufficientSlides
      centeredSlides
      loop
      slidesPerView={2}
      spaceBetween={20}
      breakpoints={{
        1280: {
          slidesPerView: 6,
        },
        1024: {
          slidesPerView: 5,
        },
        768: {
          slidesPerView: 4,
        },
        640: {
          slidesPerView: 3,
        },
      }}
      {...props}
    >
      {data.map((anime: any) => (
        <SwiperSlide key={anime.id}>
          {({ isActive }) => (
              <motion.div
                variants={{
                  enter: {
                    opacity: 1,
                    y: -40,
                    speed: 300,
                  },
                  exit: {
                    opacity: 0.2,
                    y: 0,
                  },
                }}
                className="w-full"
                animate={isActive ? "enter" : "exit"}
              >
                <PlainCard src={anime.coverImage.extraLarge} />
              </motion.div>
            )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default React.memo(BannerSwiper);
