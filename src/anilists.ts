export type Maybe<T> = T | null;


export interface FuzzyDate {
    year: Maybe<number>;
    month: Maybe<number>;
    day: Maybe<number>;
}
export interface MediaTitle {
    /** The romanization of the native language title*/
    romaji: Maybe<string>;
    /** The official english title*/
    english: Maybe<string>;
    /** Official title in it's native language*/
    native: Maybe<string>;
    /** The currently authenticated users preferred title language. Default romaji for non-authenticated*/
    userPreferred: Maybe<string>;
}
export interface CoverImage {
    /** The url of the image*/
    extraLarge: string;
    /** The url of the image*/
    large: string;
    /** The url of the image*/
    medium: string;
    /** The url of the image*/
    color: string;
}
export enum MediaFormat {
    Tv = "TV",
    Tv_short = "TV_SHORT",
    Movie = "MOVIE",
    Special = "SPECIAL",
    Ova = "OVA",
    Ona = "ONA",
    Music = "MUSIC",
    Manga = "MANGA",
    Novel = "NOVEL",
    One_shot = "ONE_SHOT",
}
export enum MediaStatus {
    Finished = "FINISHED",
    Releasing = "RELEASING",
    Not_yet_released = "NOT_YET_RELEASED",
    Cancelled = "CANCELLED",
    Hiatus = "HIATUS",
}
export enum MediaSeason {
    Winter = "WINTER",
    Spring = "SPRING",
    Summer = "SUMMER",
    Fall = "FALL",
}