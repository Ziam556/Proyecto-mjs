import DataTable from "@/shared/components/DataTable";
import { userColumns } from "../table/userColumns";
import { users } from "../data/users";
import { Link } from "react-router-dom"
import { Button } from "@/shared";
import { useState } from "react";
import ReportConfigModal from "../reports/components/ReportConfigModal";

export default function ListUserPage() {

    const [isReportModalOpen, setIsReportModalOpen] = useState(false)

    return (
        <div className="p-6">
        <h1 className="text-xl font-semibold mb-4">Usuarios</h1>

        
        <div className="flex gap-6 mb-7 ml-300">
                <Link to="/dashboard">
                <Button variant="primary" size="md">
                    Crear Usuario
                </Button>
                </Link>

                
                <Button 
                    variant="primary" 
                    size="md"
                    onClick={() => setIsReportModalOpen(true)}
                >
                    Crear Reporte
                </Button>
                
            </div>
        

        <DataTable data={users} columns={userColumns} />
        
        <ReportConfigModal
            isOpen={isReportModalOpen}
            onClose={() => setIsReportModalOpen(false)}
        />

        </div>
    );
}
