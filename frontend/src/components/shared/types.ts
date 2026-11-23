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

export type Offer = {
  id: string;
  title: string | null;
  description: string | null;
  original_price: string | number | null;
  discounted_price: string | number;
  discount_percent: string | number | null;
  starts_at: string | null;
  expires_at: string | null;
  created_at: string;
  category_name?: string | null;
  product_name: string;
  product_unit: string;
  store_name: string;
  store_brand: string | null;
  store_address: string | null;
  store_city: string;
  works_votes: number;
  expired_votes: number;
  my_vote: {
    offer_id: string;
    vote: "works" | "expired";
    created_at: string;
  } | null;
};

export type Category = {
  id: number | string;
  name: string;
  name_lt: string | null;
  sort_order: number | string;
};
