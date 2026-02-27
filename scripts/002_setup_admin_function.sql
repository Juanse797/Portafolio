-- Create a function to set a user as admin by email
-- This should be called from the Supabase SQL editor after creating your user account
-- Usage: SELECT set_user_admin('your-email@example.com');

CREATE OR REPLACE FUNCTION public.set_user_admin(user_email TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE auth.users
  SET raw_user_meta_data = raw_user_meta_data || '{"is_admin": true}'::jsonb
  WHERE email = user_email;
END;
$$;
