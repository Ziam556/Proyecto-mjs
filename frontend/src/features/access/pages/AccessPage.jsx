// frontend/src/features/access/pages/AccessPage.jsx
// Corrección: el estado de edición pasa a AccessPage


import { useEffect, useState } from "react";
import AccessSidebar from "../components/AccessSidebar";
import PermissionModule from "../components/PermissionModule";
import { updateGroupPermissions } from "../services/groupService";
import { getAllPermissions } from "../services/permissionService";


export default function AccessPage() {
const [selectedGroup, setSelectedGroup] = useState("");
const [groupPermissions, setGroupPermissions] = useState([]);
const [selectedGroupName, setSelectedGroupName] = useState("");
const [allPermissions, setAllPermissions] = useState([]);


const [isEditing, setIsEditing] = useState(false);
const [permissionsDraft, setPermissionsDraft] = useState([]);

useEffect(() => {
    getAllPermissions().then(setAllPermissions).catch(console.error);
}, []);



useEffect(() => {
setPermissionsDraft(groupPermissions);
}, [groupPermissions]);


const handleEdit = () => {
setIsEditing(true);
};


const handleCancel = () => {
setPermissionsDraft(groupPermissions);
setIsEditing(false);
};


const handleSave = async () => {
    const permissionIds = permissionsDraft.map(
        (permission) => permission.permissions_id,
    );

    await updateGroupPermissions(selectedGroup, permissionIds);

    setGroupPermissions(permissionsDraft);

    setIsEditing(false);
};


return (
<div className="p-6 flex gap-10">
    <AccessSidebar
    selectedGroup={selectedGroup}
    setSelectedGroup={setSelectedGroup}
    setSelectedGroupName={setSelectedGroupName}
    groupPermissions={groupPermissions}
    setGroupPermissions={setGroupPermissions}
    />


    <div className="flex-1">
    <h1 className="text-xl font-semibold mb-6">Gestión de permisos</h1>


    <PermissionModule
        selectedGroup={selectedGroup}
        selectedGroupName={selectedGroupName}
        allPermissions={allPermissions}
        isEditing={isEditing}
        permissionsDraft={permissionsDraft}
        setPermissionsDraft={setPermissionsDraft}
        onEdit={handleEdit}
        onCancel={handleCancel}
        onSave={handleSave}
    />
    </div>
</div>
);
}
