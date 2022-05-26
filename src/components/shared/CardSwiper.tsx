import { Anime, Manga } from "@/types";
import React from "react";
import Card from "@/components/shared/Card";
import Swiper, { SwiperSlide } from "@/components/shared/Swiper";

interface CardSwiperProps<T> {
    data: T extends "anime" ? Anime[] : Manga[];
    type: T;
}
const CardSwiper = <T extends "manga" | "anime">({
    data,
    type
}: CardSwiperProps<T>) => {
  return (
    <Swiper speed={500}>
      {data.map((item: any, index: number) => (
        <SwiperSlide key={index}>
            <Card data={item} type={type} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default React.memo(CardSwiper);