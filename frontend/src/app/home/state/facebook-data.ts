interface AgeRange {
    min: number;
}

export interface FacebookProfile {
    age_range: AgeRange,
    birthday: string,
    gender: string,
}