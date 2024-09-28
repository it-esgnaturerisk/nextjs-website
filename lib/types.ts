

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
    latitude: number | null;
    longitude: number | null;
    address: string | null;
    country: string | null;
    species_risk: string | null;
    geographical_risk: string | null;
    portfolio_id: number | null;
    last_updated: Date;
    created: Date;
    customer_id: number;
    ranges: number[] | null;
    report_link: string | null;
}

export type SiteMarker = {
    key: number;
    longitude: number;
    latitude: number;
}