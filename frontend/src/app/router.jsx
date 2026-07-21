import { createBrowserRouter, Navigate } from "react-router-dom";
import { AuthLayout, DashboardLayout, ProtectedRoute } from "@/shared";
import { Login } from "@/features/auth";
import { CreateUserPage, ListUserPage } from "@/features/users";
import { HomePage } from "@/features/home";
import { AccessPage } from "@/features/access";

const router = createBrowserRouter([
    {
        path:"/",
        element: <Navigate to ="/auth" replace/>,
    },
    {
        path: "/auth",
        element: <AuthLayout/>,
        children: [{ index: true, element: <h1></h1> }],
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <DashboardLayout/>,
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <CreateUserPage/>},
            { path: "/dashboard/auth", element: <Login/> },
            { path: "/dashboard/UserList", element: <ListUserPage/>},
            { path: "/dashboard/home", element: <HomePage/>},
            { path: "/dashboard/access", element: <AccessPage/>},
            // { path: "/", element: <ReportConfigModal/>},
        ],
    },
]);

export default router;