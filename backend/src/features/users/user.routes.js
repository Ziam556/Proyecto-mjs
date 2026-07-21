// Importamos Router desde Express.
// Router permite modularizar las rutas por feature
// y mantener el archivo principal de la app limpio.
import { Router } from "express";
import multer from "multer"
import { authenticateToken } from "../../middlewares/auth.middleware.js"

// Importamos el controlador de usuarios.
// El controller nunca implementa lógica,
// solo delega la ejecución al controller.
import { userController } from "./user.controller.js";

// Inicializamos el router
const router = Router();

const upload = multer({ dest: "uploads/" });

// Definimos la ruta para crear un usuario
// POST /users
// Cuando se recibe una petición POST en la raíz del recurso,
// Express ejecuta el método create del controller.
router.post(
    "/",
    upload.array("userImage"),
    userController.create);

// Exportamos el router para ser registrado en la aplicación principal
// (ej: app.use("/users", router))
export default router;