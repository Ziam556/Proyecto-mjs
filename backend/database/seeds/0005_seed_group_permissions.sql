-- Seed: group_permissions (qué puede hacer cada grupo)
-- Depende de: groups, permissions

INSERT INTO group_permissions (group_id, permissions_id)
SELECT g.group_id, p.permissions_id
FROM groups g, permissions p
WHERE g.group_name = 'Administrador'
ON CONFLICT DO NOTHING;

INSERT INTO group_permissions (group_id, permissions_id)
SELECT g.group_id, p.permissions_id
FROM groups g, permissions p
WHERE g.group_name = 'Usuario'
  AND p.permissions_codename IN ('list_user', 'view_users')
ON CONFLICT DO NOTHING;
