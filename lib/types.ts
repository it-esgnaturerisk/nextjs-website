export type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  elevation: "regular" | "technician" | "admin";
  company: number;
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
};

export type SiteMarker = {
  longitude: number;
  latitude: number;
};
