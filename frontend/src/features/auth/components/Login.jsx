import { useState } from "react";
import { Input, Button } from "@/shared";
import { loginSchema } from '../schemas/loginSchema.js';
import { Link, useNavigate } from "react-router-dom"
import { login } from "../services/authService.js";

export default function LoginForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userEmail: "",
        userPassword: "",
        isStaff: false,
        isActive: true,
        isSuperUser: false,
    });

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = loginSchema.safeParse(formData);

        if (!result.success) {
            const fieldErrors = {};
            result.error.issues.forEach((issue) => {
                fieldErrors[issue.path[0]] = issue.message;
            });
            setErrors(fieldErrors);
            return;
        }

        setErrors({});

        try {
            const data = await login(result.data)
            console.log("LOGIN RESPONSE:", data);
            sessionStorage.setItem("token", data.token);
            navigate("/dashboard/userlist")
        } catch (error) {
            alert(error.message)
        };
    };

    return (
        <div className="flex flex-col justify-center h-screen">
            {/* fix 2: "2x1" → "2xl" */}
            <h1 className="text-text-primary text-2xl mb-6 text-center">
                Registro de Sebas
            </h1>

            <form
                className="grid grid-cols-1 items-center gap-6"
                onSubmit={handleSubmit}
            >
                <div className="grid gap-6 my-0 mx-auto border-1 p-[48px] rounded-[6px] pt-6">
                    <Input
                        label="Correo"
                        name="userEmail"
                        placeholder="Ingrese su correo"
                        value={formData.userEmail}
                        type="email"
                        onChange={handleChange}
                        error={errors.userEmail}
                    />
                    <Input
                        label="Contraseña"
                        name="userPassword"
                        type="password"
                        placeholder="Ingrese su contraseña"
                        value={formData.userPassword}
                        onChange={handleChange}
                        error={errors.userPassword}
                    />
                    <div className="flex items-center justify-center gap-12">
                        <Button variant="secondary" size="sm">
                            Cancelar
                        </Button>

                        {/* fix 1: sin onClick, solo type="submit" */}
                        <Button variant="primary" size="md" type="submit">
                            Ingresar
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}