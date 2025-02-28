import { Link, useNavigate, useLocation } from 'react-router'
import baseUrl from '../api/baseUrl'
import Toastify  from 'toastify-js'

export default function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const isLoggedIn = localStorage.getItem('access_token')

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        Toastify({
            text: "Logged out successfully",
            duration: 5000,
            newWindow: true,
            close: true,
            gravity: "bottom",
        }).showToast();
        navigate('/login')
    }

    return (
        <nav className="bg-white shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex-shrink-0 flex items-center">
                            <span className="text-2xl font-bold text-blue-600">NewsApp</span>
                        </Link>
                    </div>

                    <div className="flex items-center space-x-4">
                        <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium`}>
                            Home
                        </Link>
                        {isLoggedIn ? (
                            <>
                                <Link 
                                    to="/profile" 
                                    className={`px-3 py-2 rounded-md text-sm font-medium`}
                                >
                                    Profile
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:text-red-800"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className={`px-3 py-2 rounded-md text-sm font-medium`}
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/register" 
                                    className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    )
}
