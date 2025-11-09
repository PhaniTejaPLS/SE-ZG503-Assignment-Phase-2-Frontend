/**
 * NavBarComponent - Main navigation bar component for the University Inventory application
 * 
 * Features:
 * - Displays logo and application title
 * - Search functionality
 * - Shopping cart access
 * - User profile modal with role-based actions
 * - Admin console access (for admin users)
 * - User authentication and logout
 */
import { useAuth } from '../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import './nav-bar.component.css';

export function NavBarComponent() {
    // Get current user information and logout function from authentication context
    const { user, logout } = useAuth();

    // React Router hook for programmatic navigation
    const navigate = useNavigate();

    /**
     * Handles user logout
     * Logs out the current user and redirects to the login page
     */
    const handleLogout = () => {
        logout();
        navigate('/login');
    }

    /**
     * Navigates to the student requests page
     * Displays all requests made by the current student user
     */
    const handleMyRequests = () => {
        navigate('/student/requests');
    }

    /**
     * Navigates to the admin inventory editing console
     * Only accessible to users with admin role
     */
    const redirectToAdminConsoleEditInventory = () => {
        navigate('/admin/console/edit')
    }

    /**
     * Navigates to the admin request approval console
     * Only accessible to users with admin role
     */
    const redirectToAdminConsoleApproveReq = () => {
        navigate('/admin/console/request')
    }

    return (
        <>
            {/* Main Navigation Bar Container */}
            <div className="nav-bar-parent">
                {/* Left Section: Logo and Application Title */}
                <div className="nav-bar-logo-root">
                    <div className="nav-bar-logo">
                        <span>
                            <img
                                src='/logo.svg'
                                width="60"
                                height="60"
                                alt="University Inventory Logo"
                            />
                        </span>
                    </div>
                    <div className="nav-bar-logo-header">
                        <h3>University Inventory</h3>
                    </div>
                </div>

                {/* Right Section: Search, Cart, and Profile */}
                <div className="nav-bar-searchbar-root">
                    {/* Search Bar */}
                    <div className="nav-bar-searchbar">
                        <form className="d-flex" role="search">
                            <input 
                                className="form-control" 
                                type="search" 
                                placeholder="Search" 
                                aria-label="Search" 
                            />
                            <button 
                                className="btn btn-outline-light button-border" 
                                type="submit"
                            >
                                <i className="bi bi-search"></i>
                            </button>
                        </form>
                    </div>

                    {/* Shopping Cart Button */}
                    <div className="button-cart">
                        <button 
                            className="btn btn-outline-light button-border"
                            onClick={() => navigate('/cart')}
                        >
                            <i className="bi bi-cart"></i>
                        </button>
                    </div>

                    {/* Profile Icon Button - Opens Profile Modal */}
                    <button 
                        className="btn btn-dark nav-bar-profile-icon"
                        data-bs-toggle="modal"
                        data-bs-target="#profileModal"
                        onClick={{}}
                    >
                        <i className="bi bi-person-circle profileicon"></i>
                    </button>
                </div>
            </div>

            {/* Profile Modal - Displays user information and action buttons */}
            <div 
                className="modal fade" 
                id="profileModal" 
                tabindex="-1" 
                aria-labelledby="exampleModalLabel" 
                aria-hidden="true"
            >
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        {/* Modal Header */}
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Profile</h1>
                            <button 
                                type="button" 
                                class="btn-close" 
                                data-bs-dismiss="modal" 
                                aria-label="Close"
                            ></button>
                        </div>

                        {/* Modal Body - User Information and Actions */}
                        <div class="modal-body">
                            {/* User Profile Icon (SVG) */}
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                width="50" 
                                height="50" 
                                fill="currentColor" 
                                class="bi bi-person-circle" 
                                viewBox="0 0 16 16"
                            >
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
                            </svg>
                            <br />
                            <br />

                            {/* User Email Display */}
                            <h4>{user.email}</h4>
                            <br />
                            <br />

                            {/* User Role Display */}
                            <p><strong>Role:</strong> {user.role}</p>
                            <br />

                            {/* My Requests Button - Available to all users */}
                            <button 
                                type="button" 
                                className="btn btn-outline-light"
                                data-bs-dismiss="modal"
                                onClick={handleMyRequests}
                            >
                                My Requests
                            </button>

                            {/* Admin-Only Actions - Only visible when user role is 'admin' */}
                            {user.role === 'admin' && (
                                <>
                                    {/* Edit Inventory Button - Admin only */}
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-light admin-console-button"
                                        data-bs-dismiss="modal"
                                        onClick={redirectToAdminConsoleEditInventory}
                                    >
                                        Edit Inventory
                                    </button>

                                    {/* Approve Requests Button - Admin only */}
                                    <button 
                                        type="button" 
                                        className="btn btn-outline-light admin-console-button"
                                        data-bs-dismiss="modal"
                                        onClick={redirectToAdminConsoleApproveReq}
                                    >
                                        Approve Requests
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Modal Footer - Logout Button */}
                        <div className="modal-footer">
                            <button 
                                className="btn btn-outline-danger" 
                                data-bs-dismiss="modal"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBarComponent;