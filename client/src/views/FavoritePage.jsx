import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../components/Card'
import { toast } from 'react-toastify'

const API_URL = import.meta.env.VITE_API_URL

export default function FavoritePage() {
    const [favorites, setFavorites] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchFavorites()
    }, [])

    const fetchFavorites = async () => {
        try {
            const access_token = localStorage.getItem('access_token')
            const { data } = await axios.get(`${API_URL}/favorites`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            setFavorites(data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching favorites:', error)
            toast.error('Failed to load favorites')
            setLoading(false)
        }
    }

    const handleRemoveFavorite = async (id) => {
        try {
            const access_token = localStorage.getItem('access_token')
            await axios.delete(`${API_URL}/favorites/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            })
            toast.success('Removed from favorites')
            fetchFavorites() // Refresh the list
        } catch (error) {
            console.error('Error removing favorite:', error)
            toast.error('Failed to remove from favorites')
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
            <h1 className="text-3xl font-bold mb-6">My Favorites</h1>
            {favorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((favorite) => (
                        <div key={favorite.id} className="relative">
                            <Card news={favorite.Article} />
                            <button
                                onClick={() => handleRemoveFavorite(favorite.id)}
                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-10">
                    <p className="text-gray-500">No favorites yet.</p>
                </div>
            )}
        </div>
    )
} 