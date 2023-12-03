export interface TvCredit {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string|null;
    first_air_date: Date;
    name: string;
    vote_average: number;
    vote_count: number;
    character?: string;
    credit_id: string;
    episode_count: number;
    department?: string;
    job?: string;
}


