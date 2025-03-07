import { Link, useNavigate, useLocation } from 'react-router'
import Toastify from 'toastify-js'

export default function Navbar() {
    const navigate = useNavigate()
    const location = useLocation()
    const isLoggedIn = localStorage.getItem('access_token')

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        Toastify({
            text: "Logged out successfully",
            duration: 3000,
            close: true,
            gravity: "bottom",
            position: "right",
            style: {
                background: "#A3B18A", // Warna hijau natural
                color: "#fff",
                borderRadius: "8px",
                boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)",
                fontWeight: "500",
                padding: "10px 20px",
            }
        }).showToast()
        navigate('/login')
    }

    return (
        <nav className="fixed z-10 top-0 w-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 shadow-sm">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-center h-14">
                    {/* Logo */}
                    <Link to="/" className="text-lg font-bold text-gray-800 dark:text-gray-200">
                        NewsApp
                    </Link>

                    {/* Menu */}
                    <div className="flex items-center space-x-6">
                        <Link 
                            to="/" 
                            className={`text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 transition ${location.pathname === '/' ? 'font-bold' : ''}`}
                        >
                            Home
                        </Link>


                        {isLoggedIn ? (
                            <>
                                <Link 
                                    to="/myFavorite" 
                                    className={`text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 transition ${location.pathname === '/profile' ? 'font-bold' : ''}`}
                                >
                                    my favorite
                                </Link>
                                <Link 
                                    to="/profile" 
                                    className={`text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 transition ${location.pathname === '/profile' ? 'font-bold' : ''}`}
                                >
                                    Profile
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/login" 
                                    className={`text-gray-700 dark:text-gray-300 hover:text-green-700 dark:hover:text-green-400 transition ${location.pathname === '/login' ? 'font-bold' : ''}`}
                                >
                                    Login
                                </Link>

                                <Link 
                                    to="/register" 
                                    className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition"
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
