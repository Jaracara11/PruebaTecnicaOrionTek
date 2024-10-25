import { Address } from "./address.model";

export interface Client {
  id: number | null;
  name?: string;
  email?: string;
  phone?: string;
  addresses?: Address[];
}