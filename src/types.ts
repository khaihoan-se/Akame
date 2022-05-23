import { MediaTitle, CoverImage, MediaFormat, FuzzyDate, MediaStatus, MediaSeason } from "./anilists";

export interface Media {
    id: number;
    idMal: number;
    title: MediaTitle;
    coverImage: CoverImage;
    startDate: FuzzyDate;
    trending: number;
    popularity: number;
    favourites: number;
    bannerImage: string;
    format: MediaFormat;
    status: MediaStatus;
    characters: [];
    relations: [];
    recommendations: [];
    tags: string[];
    genres: string[];
    countryOfOrigin: string;
    isAdult: boolean;
    synonyms: string[];
    averageScore: number;
    description: string;
    updated_at?: string;
    created_at?: string;
}