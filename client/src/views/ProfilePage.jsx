import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import baseUrl from '../api/baseUrl'
import Toastify  from 'toastify-js'

const API_URL = baseUrl

export default function ProfilePage() {
    const navigate = useNavigate()
    const [profile, setProfile] = useState(null)
    const [loading, setLoading] = useState(true)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        currentPassword: '',
        newPassword: ''
    })

    useEffect(() => {
        fetchProfile()
    }, [])

    const fetchProfile = async () => {
        try {
            const access_token = localStorage.getItem('access_token')
            if (!access_token) {
                navigate('/login')
                return
            }

            const { data } = await axios.get(`${baseUrl}/profile`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            setProfile(data)
            setFormData(prev => ({
                ...prev,
                username: data.username,
                email: data.email
            }))
            setLoading(false)
        } catch (error) {
            console.error('Error fetching profile:', error)
            if (error.response?.status === 401) {
                localStorage.removeItem('access_token')
                navigate('/login')
            }
            toast.error(error.response?.data?.message || 'Failed to load profile')
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const access_token = localStorage.getItem('access_token')
            await axios.put(`${baseUrl}/profile`, formData, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            Toastify({
                text: "Profile updated successfully",
                duration: 5000,
                newWindow: true,
                close: true,
                gravity: "bottom",
            }).showToast();
            setFormData(prev => ({
                ...prev,
                currentPassword: '',
                newPassword: ''
            }))
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to update profile')
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        )
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
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
                            disabled
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Current Password</label>
                        <input
                            type="password"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">New Password</label>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleChange}
                            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </div>
    )
}
