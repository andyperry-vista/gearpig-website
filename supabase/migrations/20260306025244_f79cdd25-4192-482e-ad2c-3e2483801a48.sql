
CREATE TABLE public.dropship_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  handle text UNIQUE NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  currency_code text NOT NULL DEFAULT 'USD',
  image_url text,
  category text,
  sku text,
  stock_quantity integer NOT NULL DEFAULT 0,
  available boolean NOT NULL DEFAULT true,
  supplier_name text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.dropship_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view dropship products"
  ON public.dropship_products
  FOR SELECT
  USING (true);

CREATE TRIGGER update_dropship_products_updated_at
  BEFORE UPDATE ON public.dropship_products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
