import { Anime, Manga } from "@/types";
import React from "react";
import Section from "./Section";
import CardSwiper from "./CardSwiper";


interface RantingProps<T> {
    data: T extends 'anime' ? Anime[] : Manga[];
    type: T;
    title?: string;
    viewMoreHref?: string;
}
const Rantings = <T extends 'manga' | 'anime' >({
    data,
    type,
    title,
    viewMoreHref
}: RantingProps<T>) => {
    return (
        <Section title={title}>
            <CardSwiper data={data} type={type} />
        </Section>
    )
}
export default Rantings;