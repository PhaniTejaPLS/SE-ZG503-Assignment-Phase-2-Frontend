# Component Hierarchy Diagram

```mermaid
graph TD
    A[main.jsx] --> B[App.jsx]
    B --> C[AuthProvider]
    C --> D[CartProvider]
    D --> E[RouterProvider]
    
    E --> F[RootLayout]
    E --> G[LoginComponent]
    
    F --> H[NavBarComponent]
    F --> I[Outlet]
    
    I --> J[ProtectedRoute]
    J --> K[HomepageRoot]
    J --> L[InventoryPageRoot]
    J --> M[CartComponent]
    J --> N[StudentRequestPageComponent]
    J --> O[AdminConsoleComponent]
    
    K --> P[CardComponentGrid]
    P --> Q1[CardComponent - Lab]
    P --> Q2[CardComponent - Sports]
    P --> Q3[CardComponent - Electronics]
    P --> Q4[CardComponent - Music]
    P --> Q5[CardComponent - Furniture]
    
    L --> R[EquipmentPage]
    R --> S[TableComponent]
    
    O --> T[EditInventoryComponent]
    O --> U[ApproveRequestComponent]
    
    style A fill:#e1f5ff
    style B fill:#e1f5ff
    style C fill:#fff4e1
    style D fill:#fff4e1
    style E fill:#e1ffe1
    style F fill:#ffe1f5
    style G fill:#ffe1f5
    style H fill:#f5e1ff
    style I fill:#e1ffe1
    style J fill:#ffe1e1
    style K fill:#e1f5ff
    style L fill:#e1f5ff
    style M fill:#e1f5ff
    style N fill:#e1f5ff
    style O fill:#e1f5ff
    style P fill:#fff4e1
    style Q1 fill:#f0f0f0
    style Q2 fill:#f0f0f0
    style Q3 fill:#f0f0f0
    style Q4 fill:#f0f0f0
    style Q5 fill:#f0f0f0
    style R fill:#fff4e1
    style S fill:#f0f0f0
    style T fill:#f0f0f0
    style U fill:#f0f0f0
```

## Component Descriptions

### Entry Point
- **main.jsx**: Application entry point that renders the App component

### Root Components
- **App.jsx**: Main application component that wraps the app with context providers and router
- **AuthProvider**: Context provider for authentication state
- **CartProvider**: Context provider for shopping cart state
- **RouterProvider**: React Router provider that manages routing

### Layout Components
- **RootLayout**: Main layout component that includes navigation and outlet for child routes
- **NavBarComponent**: Navigation bar component with search, cart, and profile functionality
- **Outlet**: React Router outlet for rendering child routes

### Route Components
- **ProtectedRoute**: Wrapper component that protects routes based on user roles
- **LoginComponent**: Login page component (not protected)
- **HomepageRoot**: Homepage component
- **InventoryPageRoot**: Inventory listing page component
- **CartComponent**: Shopping cart component
- **StudentRequestPageComponent**: Student request management page
- **AdminConsoleComponent**: Admin console component with conditional rendering

### Feature Components
- **CardComponentGrid**: Grid container for category cards
- **CardComponent**: Individual category card (Lab, Sports, Electronics, Music, Furniture)
- **EquipmentPage**: Equipment listing page with search and filters
- **TableComponent**: Table component for displaying equipment items
- **EditInventoryComponent**: Admin component for editing inventory
- **ApproveRequestComponent**: Admin component for approving/rejecting requests

## Context Providers
- **AuthContext**: Provides authentication state (user, login, logout)
- **CartContext**: Provides cart state (cartItems, addToCart, removeFromCart, clearCart)

## Routing Structure
- `/` → RootLayout (with NavBarComponent)
  - `/home` → HomepageRoot (protected)
  - `/inventory/labs` → InventoryPageRoot (protected)
  - `/inventory/sports` → InventoryPageRoot (protected)
  - `/inventory/electronics` → InventoryPageRoot (protected)
  - `/inventory/music` → InventoryPageRoot (protected)
  - `/inventory/furniture` → InventoryPageRoot (protected)
  - `/cart` → CartComponent (protected)
  - `/student/requests` → StudentRequestPageComponent (protected)
  - `/admin/console/edit` → AdminConsoleComponent with EditInventoryComponent (admin only)
  - `/admin/console/request` → AdminConsoleComponent with ApproveRequestComponent (admin only)
- `/login` → LoginComponent (public)

