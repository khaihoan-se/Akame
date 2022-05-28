import {
  CharacterRole,
  FuzzyDate,
  MediaFormat,
  MediaRelation,
  MediaStatus,
  MediaTitle,
} from "./anilist";


export type MediaDescription = Record<string, string>;

export type SourceConnection = {
  id: string;
  sourceId: string;
  sourceMediaId: string;
  mediaId: string;
  source: Source;
};

export interface AnimeSourceConnection extends SourceConnection {
  episodes: Episode[];
}

export interface MangaSourceConnection extends SourceConnection {
  chapters: Chapter[];
}

export type Source = {
  id: string;
  name: string;
  locales: string[];
};

export type Episode = {
  name: string;
  sourceConnectionId?: string;
  sourceConnection?: AnimeSourceConnection;
  sourceId: string;
  sourceEpisodeId: string;
  sourceMediaId: string;
  source: Source;
  slug: string;
  thumbnailImage?: string;
};

export type Chapter = {
  name: string;
  sourceConnectionId?: string;
  sourceConnection?: MangaSourceConnection;
  sourceId: string;
  sourceChapterId: string;
  sourceMediaId: string;
  source: Source;
  slug: string;
};

export type VoiceActorImage = {
  large: string;
  medium: string;
};

export type VoiceActorName = {
  first: string;
  middle: string;
  last: string;
  full: string;
  native: string;
  alternative: string[];
  userPreferred: string;
};

export type VoiceActorConnection = {
  voiceActorId: number;
  characterId: number;
  voiceActor?: VoiceActor;
  character?: Character;
};

export type VoiceActor = {
  id: number;
  name: VoiceActorName;
  language: string;
  image: VoiceActorImage;
  gender: string;
  dateOfBirth: FuzzyDate;
  dateOfDeath: FuzzyDate;
  age: number;
  yearsActive: number[];
  homeTown: string;
  bloodType: string;
  favourites: number;
};

export type AiringSchedule = {
  nodes: AiringScheduleNode[];
};
export type AiringScheduleNode = {
  id: number;
  airingAt: number;
  episode: number;
  mediaId: number;
  media?: Anime;
}
export type Recommendation<T extends Anime | Manga> = {
  nodes: RecommendationNode<T>[];
};

export type RecommendationNode<T extends Anime | Manga> = {
  mediaRecommendation: T
}

export type Relation<T extends Anime | Manga> = {
  media: T;
  relationType: MediaRelation;
};

export type CharacterImage = {
  large: string;
  medium: string;
};

export type CharacterName = {
  first: string;
  middle: string;
  last: string;
  full: string;
  native: string;
  alternative: string[];
  alternativeSpoiler: string[];
  userPreferred: string;
};

export type CharacterConnection<T extends Anime | Manga> = {
  edges: CharacterEdge<T>[];
};
export type CharacterEdge<T extends Anime | Manga> = {
  characterId: number;
  id: number;
  role: CharacterRole;
  name: string;
  mediaId: number;
  media?: T;
  character: Character;
  node: any;
}
export type Character = {
  id: number;
  name: CharacterName;
  image: CharacterImage;
  gender: string;
  dateOfBirth: FuzzyDate;
  age: string;
  favourites: number;
};

export type StudioConnection = {
  edges: StudioEdge[];
  id: number
};

export type StudioEdge = {
  node: Studio;
}

export type Studio = {
  id: number;
  name: string;
  isAnimationStudio: boolean;
  favourites: number;
};

export type CoverImage = {
  extraLarge: string;
  large: string;
  medium: string;
  color: string;
};

export interface Media<T extends Anime | Manga> {
  id: number;
  idMal: number;
  title: MediaTitle;
  coverImage: CoverImage;
  startDate: FuzzyDate;
  endDate: FuzzyDate;
  trending: number;
  popularity: number;
  favourites: number;
  bannerImage: string;
  format: MediaFormat;
  status: MediaStatus;
  characters: CharacterConnection<T>;
  relations: Relation<T>[];
  recommendations: Recommendation<T>;
  tags: any[];
  genres: string[];
  countryOfOrigin: string;
  isAdult: boolean;
  synonyms: string[];
  averageScore: number;
  meanScore: number;
  description: string;
  updated_at?: string;
  created_at?: string;
  episodes?: number;
}

export interface Anime extends Media<Anime> {
  sourceConnections: AnimeSourceConnection[];
  season: string;
  seasonYear: number;
  totalEpisodes: number;
  studios: StudioConnection;
  voiceActors: VoiceActorConnection[];
  airingSchedule: AiringSchedule;
  episodeUpdatedAt: string;
  duration: number;
  trailer?: Trailer;
}
export type Trailer = {
  id: string;
}
export interface Manga extends Media<Manga> {
  totalChapters: number;
  chapterUpdatedAt: string;
  sourceConnections: MangaSourceConnection[];
  trailer?: Trailer;
}

export interface Watched {
  media: Anime;
  episode: Episode;
  episodeId: string;
  mediaId?: number;
  userId: string;
  updated_at?: string;
  created_at?: string;
  watchedTime?: number;
}

export interface Read {
  media: Manga;
  mediaId?: number;
  chapterId?: string;
  chapter: Chapter;
  userId: string;
  updated_at?: string;
  created_at?: string;
}

export type Subtitle = {
  file: string;
  lang: string;
  language: string;
};

export type VideoSource = {
  file: string;
  label?: string;
  useProxy?: boolean;
};

export type ImageSource = {
  image: string;
  useProxy?: boolean;
};



export type CallbackSetter<T> = (handler: T) => void;

export type Noop = () => void;

export type WatchStatus = "WATCHING" | "COMPLETED" | "PLANNING";
export type ReadStatus = "READING" | "COMPLETED" | "PLANNING";
