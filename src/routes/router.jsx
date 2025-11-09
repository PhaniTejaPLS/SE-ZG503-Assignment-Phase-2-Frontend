import { createBrowserRouter, Navigate } from "react-router";
import App from "../App.jsx";
import HomepageRoot from "../homepage/homepage-root.jsx";
import { InventoryPageRoot } from "../inventory-page/inventory-root.jsx";
import { EquipmentPage } from "../inventory-page/equipment-page/equipment-page.component.jsx";
import RootLayout from "../RootLayout.jsx";
import { CartComponent } from "../cart/cart-root.component.jsx";
import { ProtectedRoute } from "../ProtectedRoute.jsx";
import { LoginComponent } from "../login/login.component.jsx";
import { StudentRequestPageComponent } from "../console-pages/student/student-request.component.jsx";
import { AdminConsoleComponent } from "../console-pages/admin/AdminConsole.component.jsx";

export const router = createBrowserRouter([
    // Root layout route - all main application routes are nested here
    {
        path: "/",
        element: <RootLayout />,
        errorElement: <></>,
        children: [
            // Redirect root path to home
            {
                index: true,
                element: <Navigate to="/home" replace />
            },

            // Homepage route - protected for all authenticated users
            {
                element: <ProtectedRoute allowedRoles={['admin', 'student', 'staff']} />,
                children: [
                    { path: "home", element: <HomepageRoot /> }
                ]
            },

            // Inventory routes - organized by category
            {
                path: "inventory",
                children: [
                    // Labs inventory
                    {
                        path: "labs",
                        element: <ProtectedRoute allowedRoles={['admin', 'student', 'staff']} />,
                        children: [
                            { path: '', element: <InventoryPageRoot tag="lab" /> }
                        ]
                    },
                    // Sports inventory
                    {
                        path: "sports",
                        element: <ProtectedRoute allowedRoles={['admin', 'student', 'staff']} />,
                        children: [
                            { path: '', element: <InventoryPageRoot tag="sports" /> }
                        ]
                    },
                    // Electronics inventory
                    {
                        path: "electronics",
                        element: <ProtectedRoute allowedRoles={['admin', 'student', 'staff']} />,
                        children: [
                            { path: '', element: <InventoryPageRoot tag="electronics" /> }
                        ]
                    },
                    // Music inventory
                    {
                        path: "music",
                        element: <ProtectedRoute allowedRoles={['admin', 'student', 'staff']} />,
                        children: [
                            { path: '', element: <InventoryPageRoot tag="music" /> }
                        ]
                    },
                    // Furniture inventory
                    {
                        path: "furniture",
                        element: <ProtectedRoute allowedRoles={['admin', 'student', 'staff']} />,
                        children: [
                            { path: '', element: <InventoryPageRoot tag="furniture" /> }
                        ]
                    }
                ]
            },

            // Cart route - protected for all authenticated users
            {
                path: "cart",
                element: <ProtectedRoute allowedRoles={['admin', 'student', 'staff']} />,
                children: [
                    { path: "", element: <CartComponent /> }
                ]
            },

            // Student routes - accessible to admin, staff, and students
            {
                path: "student",
                element: <ProtectedRoute allowedRoles={['admin', 'staff', 'student']} />,
                children: [
                    { path: "requests", element: <StudentRequestPageComponent /> }
                ]
            },

            // Admin routes - accessible only to admins
            {
                path: "admin",
                element: <ProtectedRoute allowedRoles={['admin']} />,
                children: [
                    { path: "console/edit", element: <AdminConsoleComponent tag={'edit-inv'} /> },
                    { path: "console/request", element: <AdminConsoleComponent tag={'approve-req'} /> }
                ]
            }
        ]
    },

    // Login route - public, outside of root layout
    {
        path: "/login",
        element: <LoginComponent />
    }
])