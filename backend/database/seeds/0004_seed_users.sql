-- Seed: users (usuarios de prueba)
-- Nota: cambia las contraseñas por hashes reales (bcrypt) antes de usar en algo real

INSERT INTO users (user_name, user_email, password, document_type, document_number, is_staff, is_superuser)
VALUES
('Admin', 'admin@proyecto.com', 'hash_admin', 'CC', '1000000001', TRUE, TRUE),
('Usuario Prueba', 'usuario@proyecto.com', 'hash_usuario', 'CC', '1000000002', FALSE, FALSE)
ON CONFLICT (user_email) DO NOTHING;
