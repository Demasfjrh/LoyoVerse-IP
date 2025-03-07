import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { GoogleLogin } from '@react-oauth/google'
import Toastify from 'toastify-js'
import axios from 'axios'
import baseUrl from '../api/baseUrl'

export default function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            // console.log('Masuk handlesubmit');
            
            const { data } = await axios.post(`${baseUrl}/login`, {
                email,
                password
            })
            // console.log(data,'<><>@@');
            
            localStorage.setItem('access_token', data.token)
    
            Toastify({
                text: "success login",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                },
            }).showToast();
            navigate('/')
        } catch (error) {
            Toastify({
                text: 'login error',
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background:'linear-gradient(90deg, rgba(255,207,0,1) 0%, rgba(255,0,0,1) 68%)',
                    color: "white",
                },
            }).showToast();
        }
    }

    async function googleLogin(codeResponse) {
        try {
            const { data } = await axios.post(`${baseUrl}/google-login`, null, {
                headers: { token: codeResponse.credential },
            })
            localStorage.setItem('access_token', data.access_token)
            Toastify({
                text: 'login google success',
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", 
                position: "right", 
                stopOnFocus: true, 
                style: {
                    background:'linear-gradient(90deg, rgba(0,255,186,1) 0%, rgba(0,80,255,1) 100%);',
                    color: "white",
                },
            }).showToast();
            navigate('/')
        } catch (error) {
            Toastify({
                text: 'login google error',
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "bottom", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true, // Prevents dismissing of toast on hover
                style: {
                    background:'linear-gradient(90deg, rgba(255,207,0,1) 0%, rgba(255,0,0,1) 68%)',
                    color: "white",
                },
            }).showToast();
        }
    }

    
    useEffect(() => {
        if (localStorage.access_token) {
        Toastify({
            text: "You already logged in",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
            background: "#F87171",
            color: "#000000",
            },
        }).showToast();
        navigate("/");
        }
    }, [navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-6">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">Welcome Back</h2>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Sign in to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:outline-none transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:outline-none transition duration-200 ease-in-out shadow-sm hover:shadow-md"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none font-semibold transition duration-200 ease-in-out shadow-md hover:shadow-lg"
                    >
                        Sign In
                    </button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                            Or sign in with
                        </span>
                    </div>
                </div>

                <div className="flex justify-center">
                    <GoogleLogin onSuccess={googleLogin} />
                </div>
            </div>
        </div>
    )
}
