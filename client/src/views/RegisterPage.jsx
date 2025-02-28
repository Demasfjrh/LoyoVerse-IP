import { useState } from 'react'
import { useNavigate } from 'react-router'
import baseUrl from '../api/baseUrl'
import Toastify from 'toastify-js'
import axios from 'axios'

const API_URL = baseUrl

export default function RegisterPage() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    })
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await axios.post(`${API_URL}/register`, formData)
            
            Toastify({
                text: "Registration successful! Please login.",
                duration: 5000,
                newWindow: true,
                close: true,
                gravity: "bottom",
            }).showToast();
            navigate('/login')
        } catch (err) {
            Toastify({
                text: err.response?.data?.message || 'Registration failed',
                duration: 5000,
                newWindow: true,
                close: true,
                gravity: "bottom",
            }).showToast();
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-md w-full p-6">
                <h2 className="text-3xl font-bold text-center mb-6">Create Account</h2>
                {error && (
                    <div className="bg-red-50 text-red-500 p-3 rounded mb-4">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    )
}
