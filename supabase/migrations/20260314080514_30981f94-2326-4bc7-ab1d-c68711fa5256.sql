
-- Allow public INSERT on products
CREATE POLICY "Allow public insert on products"
ON public.products
FOR INSERT
TO public
WITH CHECK (true);

-- Allow public UPDATE on products
CREATE POLICY "Allow public update on products"
ON public.products
FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Allow public DELETE on products
CREATE POLICY "Allow public delete on products"
ON public.products
FOR DELETE
TO public
USING (true);

-- Also allow SELECT on all products (not just published) for management tools
CREATE POLICY "Allow public select all products"
ON public.products
FOR SELECT
TO public
USING (true);
