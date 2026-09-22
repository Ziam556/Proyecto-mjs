-- Seed: user_groups (a qué grupo pertenece cada usuario)
-- Depende de: users, groups

INSERT INTO user_groups (user_id, group_id)
SELECT u.id, g.group_id
FROM users u, groups g
WHERE u.user_email = 'admin@proyecto.com' AND g.group_name = 'Administrador'
ON CONFLICT DO NOTHING;

INSERT INTO user_groups (user_id, group_id)
SELECT u.id, g.group_id
FROM users u, groups g
WHERE u.user_email = 'usuario@proyecto.com' AND g.group_name = 'Usuario'
ON CONFLICT DO NOTHING;
