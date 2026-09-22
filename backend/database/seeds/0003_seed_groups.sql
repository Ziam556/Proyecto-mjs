-- Seed: groups (roles del sistema)

INSERT INTO groups (group_name)
VALUES
('Administrador'),
('Usuario')
ON CONFLICT (group_name) DO NOTHING;
