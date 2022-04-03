interface Sprites {
    other: {
        "official-artwork": {
            front_default: string;
        };
    }
}

export interface InfosData {
    id: number;
    name: string;
    height: number;
    weight: number;
    sprites: Sprites;
    base_experience: number;
}