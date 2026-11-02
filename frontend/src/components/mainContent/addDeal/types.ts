export type Store = {
  id: string;
  name: string;
  brand: string | null;
  address: string | null;
  city: string;
  is_active: boolean;
};

export type Category = {
  id: number | string;
  name: string;
  name_lt: string | null;
  sort_order: number | string;
};

export type Product = {
  id: string;
  name: string;
  name_lt: string | null;
  category_id: number | string;
};

export type ProductDraft = {
  category_id: string;
  name: string;
  name_lt: string;
  unit: string;
  barcode: string;
  description: string;
};
