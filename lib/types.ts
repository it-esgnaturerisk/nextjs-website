

export type User = {
    key: string;
    email: string;
    password: string;
    name: string;
    image: string;
    role: 'admin' | 'user';
    createdAt: Date;
    updatedAt: Date;
};

export type Site = {
    key: string;
    name: string;
    latitude: number;
    longitude: number;
    ranges: number[];
    imageurl: string | null;
    address: string;
}

export type SiteMarker = {
    key: number;
    longitude: number;
    latitude: number;
}