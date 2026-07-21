import { useState, useEffect } from "react";
import { getDocumentTypes } from "@/features/users/services/selectServices.js";
import { Input, Button, Select, Checkbox, IconButton, FileInput } from "@/shared";
import { userSchema } from '../schemas/userSchema.js';
import { useNavigate } from "react-router-dom"
import { createUser } from "../services/userServices.js";

export default function UserRegisterForm() {
    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [documentTypes, setDocumentTypes] = useState([]);
    const [formData, setFormData] = useState({
        userName: "",
        userEmail: "",
        userPhone: "",
        userDocumentType: "",
        userDocumentNumber: "",
        userPassword: "",
        userImage: [],

        // Flags booleanos
        isStaff:false,
        isActive: true,
        isSuperUser: false,
    });

    const [errors, setErrors] = useState({})

    useEffect(() => {
        getDocumentTypes().then(setDocumentTypes);
    }, [])

    // ==============================================
    //               Handle Genérico 
    // ==============================================

    // Funcion que se ejecuta cada vez que cambia el valor de un input del formulario

    const handleChange = (e) => {
        // Se obtiene el nombre del campo y su valor 
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            // Se copian todos los valores anteriores del estado
            ...prev,

            // Se actualiza unicamente lo que cambió
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    //============== HANDLE SUBMIT ==============
const handleSubmit = async (e) => {


  // Evita que el formulario recargue la página
    e.preventDefault();


  // Validamos los datos del formulario contra el esquema Zod
  // safeParse NO lanza excepción, retorna un objeto controlado
    const result = userSchema.safeParse(formData);


  // Si la validación falla
    if (!result.success) {


    // Objeto donde almacenaremos los errores por campo
    const fieldErrors = {};


    // Recorremos cada error generado por Zod
    result.error.issues.forEach((issue) => {
      // issue.path[0] corresponde al nombre del campo
      // issue.message contiene el mensaje de error definido en el schema
        fieldErrors[issue.path[0]] = issue.message;
    });


    // Actualizamos el estado de errores para mostrarlos en la UI
    setErrors(fieldErrors);


    // Cortamos la ejecución: NO se envía nada al backend
    return;
  }


  // Si la validación pasa, limpiamos errores previos
  setErrors({});


  // Activamos estado de envío (útil para deshabilitar el botón)
  setIsSubmitting(true);


  try {
    // Llamamos al servicio frontend que consume la API
    // result.data contiene los datos ya validados por Zod
    const response = await createUser(result.data);


    // Log informativo para desarrollo
    console.log("Usuario creado:", response);


    // Feedback básico al usuario
    alert("Usuario creado correctamente");


    // Navegamos a la vista anterior
    // navigate(-1) equivale a "volver atrás"
    navigate(-1);


  } catch (error) {
    // Capturamos errores de red o errores lanzados por el service
    console.error("Error:", error.message);


    // Mostramos el mensaje de error al usuario
    alert(error.message);


  } finally {
    // Pase lo que pase, desactivamos el estado de envío
    setIsSubmitting(false);
  }
};


    return (
        <div>
            <h1 className="text-text-primary text-2x1 mb-6 text-center">
                Registro de Usuarios 
            </h1>

            <form
            className="grid grid-cols-1 items-center gap-6"
            onSubmit={handleSubmit}
            >
            
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-0 mx-auto  border-1 p-[48px] rounded-[6px]  pt-6">
                    
                    <Input
                        label="Nombre"
                        name="userName"
                        placeholder="Ingrese su nombre"
                        value={formData.userName}
                        onChange={handleChange}
                        error={errors.userName}
                    />
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
                        label="Teléfono"
                        name="userPhone"
                        placeholder="Ingrese su telefono"
                        value={formData.userPhone}
                        type="tel"
                        onChange={handleChange}
                        error={errors.userPhone}
                    />
                    <Select
                        label="Tipo de documento"
                        name="userDocumentType"
                        value={formData.userDocumentType}
                        options={documentTypes}
                        onChange={handleChange}
                        error={errors.userDocumentType}
                    />
                    <Input
                        label="Numero de documento"
                        name="userDocumentNumber"
                        placeholder="Ingrese su numero de documento"
                        value={formData.userDocumentNumber}
                        onChange={handleChange}
                        error={errors.userDocumentNumber}
                    />
                    <Input
                        label="Contraseña"
                        name="userPassword"
                        placeholder="Ingrese su contraseña"
                        value={formData.userPassword}
                        type="password"
                        onChange={handleChange}
                        error={errors.userPassword}
                    />
                    <Checkbox
                        id="isStaff"
                        name="isStaff"
                        label="Es Staff"
                        checked={formData.isStaff}
                        onChange={handleChange}
                    />
                    <Checkbox
                        id="isActive"
                        name="isActive"
                        label="Está Activo"
                        checked={formData.isActive}
                        onChange={handleChange}
                    />
                    <Checkbox
                        id="isAdmin"
                        name="isAdmin"
                        label="Es Administrador"
                        checked={formData.isAdmin}
                        onChange={handleChange}
                    />

                    <FileInput
                        value={formData.userImage}
                        onChange={(files) => 
                            setFormData((prev) => ({ ...prev, userImage: files }))
                        }
                        multiple={true}
                    />
                    {errors.userImage && (
                        <span className="text-red-500 text-sm">{errors.userImage}</span>
                    )}

                    {/* Actions */}
                    <div className="flex items-end justify-end gap-6">
                        <Button
                            variant="secondary"
                            size="sm"
                            onClick={()=> navigate(-1)}
                        >
                            Cancelar
                        </Button>

                        <Button
                            variant="primary"
                            size="md"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Guardando..." : "Guardar💕"}
                        </Button>

                        {/* Icon button */}
                        {/* <Link to="/DashboardLayout">
                            <IconButton
                            onClick={() => Navigate("/DashboardLayout")}>
                                <SquareArrowRightEnter/>
                            </IconButton>
                        </Link> */}

                        {/* Dropdown */}

                        <div className="p-10">
                            
                        </div>
                        {/* <Link to="/dashboard">
                            <IconButton
                            onClick={() => Navigate("/DashboardLayout")}>
                                <SquareArrowRightEnter/>
                            </IconButton>
                        </Link> */}
                    </div>
                </div>
            </form>  
        </div>
    );
}