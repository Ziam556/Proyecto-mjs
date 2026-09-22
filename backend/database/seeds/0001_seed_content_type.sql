-- Seed: content_type (catálogo de módulos/entidades del sistema)

INSERT INTO content_type (app_label, model, display_name)
VALUES
('users', 'user', 'Usuarios'),
('groups', 'group', 'Grupos'),
('tasks', 'task', 'Tareas'),
('access', 'permission', 'Permisos')
ON CONFLICT (app_label, model) DO NOTHING;
