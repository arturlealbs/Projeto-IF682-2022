interface AgeRange {
    min: number;
}

export interface FacebookProfile {
    age_range: AgeRange,
    birthday: string,
    gender: string,
    picture: {
        data: {
            url: string
        }
    }
}

export interface GoogleProfile {
	username: string,
	firstName: string,
	lastName: string,
	picture: string,
}