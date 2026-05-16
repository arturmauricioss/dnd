-- Grant permissions for anon and authenticated roles
GRANT SELECT, INSERT, UPDATE, DELETE ON personagens TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON personagens TO authenticated;

-- Grant usage on sequences
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA public TO authenticated;