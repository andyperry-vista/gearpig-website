
CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  handle text UNIQUE NOT NULL,
  title text NOT NULL,
  description text,
  vendor text,
  category text,
  tags text[],
  price numeric NOT NULL DEFAULT 0,
  compare_at_price numeric,
  currency_code text NOT NULL DEFAULT 'AUD',
  image_url text,
  images text[],
  sku text,
  barcode text,
  option1_name text,
  option1_value text,
  option2_name text,
  option2_value text,
  option3_name text,
  option3_value text,
  variants jsonb DEFAULT '[]'::jsonb,
  seo_title text,
  seo_description text,
  published boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published products"
ON public.products
FOR SELECT
TO public
USING (published = true);

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
