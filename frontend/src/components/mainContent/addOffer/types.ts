export type Product = {
  id: string;
  name: string;
  name_lt: string | null;
  category_id: number | string;
  unit: string;
};

export type ProductDraft = {
  category_id: string;
  name: string;
  unit: string;
  barcode: string;
};
