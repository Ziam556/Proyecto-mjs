-- Seed: permissions (permisos base del sistema)
-- Depende de: content_type

INSERT INTO permissions (permissions_name, permissions_codename, content_type_id)
VALUES
('Listar usuarios', 'list_user', 1),
('Crear usuarios', 'create_user', 1),
('Visualizar usuarios', 'view_users', 1),
('Habilitar usuarios', 'enable_user', 1),
('Deshabilitar usuarios', 'desabled_user', 1),
('Reportar usuarios', 'report_user', 1),
('Crear grupos', 'create_groups', 2)
ON CONFLICT (permissions_codename) DO NOTHING;
