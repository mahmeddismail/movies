export interface multiSearch {

    adult: boolean;
    backdrop_path?: null | string;
    profile_path?: null | string;
    id: number;
    name?: string;
    original_name?: string;
    overview?: string;
    poster_path?: null | string;
    media_type: MediaType;
    genre_ids?: number[];
    popularity: number;
    first_air_date?: Date;
    vote_average?: number;
    vote_count?: number;
    origin_country?: string[];
    title?: string;
    original_title?: string;
    release_date?: Date;
    video?: boolean;
    gender?: number;
    known_for_department?: string;
    known_for?: null | KnownFor[];
}


export enum MediaType {
    Movie = "movie",
    Person = "person",
    Tv = "tv",
}

export interface KnownFor {
    adult: boolean;
    backdrop_path: string;
    id: number;
    title: string;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    genre_ids: number[];
    popularity: number;
    release_date: Date;
    video: boolean;
    vote_average: number;
    vote_count: number;
}
