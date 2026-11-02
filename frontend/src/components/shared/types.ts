export type Store = {
  id: string;
  name: string;
  brand: string | null;
  address: string | null;
  city: string;
  latitude: string | number;
  longitude: string | number;
  is_active: boolean;
};
