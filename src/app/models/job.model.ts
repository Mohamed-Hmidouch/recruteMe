export interface Job {
  id: number;
  name: string;
  company: {
    id: number;
    name: string;
    short_name: string;
  };
  locations: {
    name: string;
  }[];
  levels: {
    name: string;
    short_name: string;
  }[];
  categories: {
    name: string;
  }[];
  publication_date: string;
  contents: string;
  refs: {
    landing_page: string;
  };
  type?: string;
}

export interface TheMuseResponse {
  page: number;
  page_count: number;
  items_per_page: number;
  total: number;
  results: Job[];
}
  