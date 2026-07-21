import { useState } from "react";
import { userReportFields } from "../config/userReportFields";
import { generateUserReport } from "../services/generateUserReport";
import { Button, Input, Select, Checkbox } from "@/shared";

export default function ReportConfigModal({ isOpen, onClose }) {
    const [format, setFormat] = useState("pdf");
    const [scope, setScope] = useState("all");
    const [documentNumber, setDocumentNumber] = useState("");
    const [selectedFields, setSelectedFields] = useState(
        () => userReportFields.filter((f) => f.default),
    );

    if (!isOpen) return null;

    // ✅ Fix: usa función de actualización para evitar duplicados
    const handleFieldToggle = (field) => {
        setSelectedFields((prev) => {
            const exists = prev.some((f) => f.key === field.key);
            if (exists) {
                return prev.filter((f) => f.key !== field.key);
            } else {
                return prev.some((f) => f.key === field.key) ? prev : [...prev, field];
            }
        });
    };

    const handleGenerateReport = () => {
        generateUserReport({
            format,
            selectedFields,
            scope,
            documentNumber,
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
                <h2 className="mb-6 text-xl font-semibold">
                    Generar reporte de usuarios
                </h2>

                <div className="mb-4">
                    <Select
                        label="Formato del reporte"
                        value={format}
                        onChange={(e) => setFormat(e.target.value)}
                        options={[
                            { label: "PDF", value: "pdf" },
                            { label: "Excel", value: "excel" },
                        ]}
                    />
                </div>

                <div className="mb-4">
                    <p className="mb-2 font-medium">Campos del reporte</p>
                    <div className="grid grid-cols-2 gap-2">
                        {userReportFields.map((field) => {
                            const checked = selectedFields.some((f) => f.key === field.key);
                            return (
                                <Checkbox
                                    key={field.key}
                                    id={field.key}
                                    name={field.key}
                                    label={field.label}
                                    checked={checked}
                                    onChange={() => handleFieldToggle(field)}
                                />
                            );
                        })}
                    </div>
                </div>

                <div className="mb-4">
                    <Select
                        label="Alcance del reporte"
                        value={scope}
                        onChange={(e) => setScope(e.target.value)}
                        options={[
                            { label: "Todos los usuarios", value: "all" },
                            { label: "Filtrar por documento", value: "document" },
                        ]}
                    />
                </div>

                {scope === "document" && (
                    <div className="mb-4">
                        <Input
                            label="Número de documento"
                            value={documentNumber}
                            onChange={(e) => setDocumentNumber(e.target.value)}
                            placeholder="Ingrese número de documento"
                        />
                    </div>
                )}

                <div className="flex justify-end gap-2 mt-6">
                    <Button variant="secondary" onClick={onClose}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={handleGenerateReport}>
                        Generar reporte
                    </Button>
                </div>
            </div>
        </div>
    );
}