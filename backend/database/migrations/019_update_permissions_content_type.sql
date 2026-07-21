UPDATE permissions
SET content_type_id = 1
WHERE permissions_codename IN (
    'list_user',
    'create_user',
    'report_user',
    'disable_user'
);