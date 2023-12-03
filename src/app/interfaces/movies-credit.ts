export interface MoviesCredit {
    adult: boolean;
    backdrop_path: null | string;
    genre_ids: number[];
    id: number;
    original_language: OriginalLanguage;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: null | string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    character?: string;
    credit_id: string;
    order?: number;
    department?: Department;
    job?: Job;
}

export enum Department {
    Directing = "Directing",
    Production = "Production",
}

export enum Job {
    Director = "Director",
    ExecutiveProducer = "Executive Producer",
    Producer = "Producer",
}

export enum OriginalLanguage {
    En = "en",
    Fr = "fr",
}

