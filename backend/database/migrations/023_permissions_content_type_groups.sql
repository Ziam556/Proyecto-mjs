UPDATE permissions
SET content_type_id = 2
WHERE permissions_codename IN (
    'create_groups'
);