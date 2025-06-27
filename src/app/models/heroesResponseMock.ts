import { Heroe } from "./heroe";

export interface HeroesMockResponse {
  data: Heroe[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}
