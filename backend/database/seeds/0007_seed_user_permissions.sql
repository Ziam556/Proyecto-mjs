-- Seed: user_permissions (permisos extra asignados directo a un usuario)
-- Depende de: users, permissions

INSERT INTO user_permissions (user_id, permission_id)
SELECT u.id, p.permissions_id
FROM users u, permissions p
WHERE u.user_email = 'usuario@proyecto.com' AND p.permissions_codename = 'create_user'
ON CONFLICT DO NOTHING;
