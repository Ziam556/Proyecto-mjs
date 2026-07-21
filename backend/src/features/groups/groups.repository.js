// backend/src/features/groups/groups.repository.js
// Corrección: agregado método getPermissionsByGroupId


import { pool } from "../../config/db.js";


export const groupsRepository = {
async getAll() {
const query = `
    SELECT
    group_id,
    group_name,
    is_active
    FROM groups
    ORDER BY group_name;
`;


const result = await pool.query(query);


return result.rows;
},


// Obtener permisos de grupo por ID
async getPermissionsByGroupId(groupId) {
const query = `
    SELECT
    p.permissions_id,
    p.permissions_name,
    p.permissions_codename
    FROM group_permissions gp
    INNER JOIN permissions p
    ON p.permissions_id = gp.permissions_id
    WHERE gp.group_id = $1
    ORDER BY p.permissions_name;
`;


const result = await pool.query(query, [groupId]);


return result.rows;
},

// Actualizar permisos del grupo
async updatePermissions(groupId, permissionIds) {
const client = await pool.connect();


try {
    await client.query("BEGIN");


    await client.query(
    `
    DELETE FROM group_permissions
    WHERE group_id = $1
`,
    [groupId],
    );


    for (const permissionId of permissionIds) {
    await client.query(
        `
    INSERT INTO group_permissions (
        group_id,
        permissions_id
    )
    VALUES ($1, $2)
    `,
        [groupId, permissionId],
    );
    }


    await client.query("COMMIT");
} catch (error) {
    await client.query("ROLLBACK");
    throw error;
} finally {
    client.release();
}
},

};