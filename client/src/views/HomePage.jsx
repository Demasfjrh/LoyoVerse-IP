import { useState, useEffect } from 'react'
import axios from 'axios'
import Card from '../components/Card'
import RecomendationNews from '../components/RecomendationNews'
import baseUrl from '../api/baseUrl'


export default function HomePage() {
    const [news, setNews] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    // Fetch news when page changes
    useEffect(() => {
        const fetchNews = async () => {
            try {
                const { data } = await axios.get(`${baseUrl}/articles`)
                
                console.log(data,'<<<');
                
                setHasMore(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching news:', error)
                setLoading(false)
            }
        }

        fetchNews()
    }, [page]) // Only re-run when page changes

    const loadMore = () => {
        if (hasMore && !loading) {
            setPage(prev => prev + 1)
        }
    }

    useEffect(()=>{
        console.log(news,'<<<<<');
        
    })

    // Render loading state
    if (loading && page === 1) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-[#f8fafc] dark:bg-[#0f172a]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
        )
    }

    // Render main content
    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] transition-colors duration-200">
            <div className="container mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {news.map((item) => (
                                <Card key={item.id} news={item} />
                            ))}
                        </div>
                        {hasMore && (
                            <div className="mt-8 text-center">
                                <button
                                    onClick={loadMore}
                                    className="px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-lg shadow-indigo-500/30 transition-all duration-200 ease-in-out hover:shadow-indigo-500/40"
                                    disabled={loading}
                                >
                                    {loading ? 'Loading...' : 'Load More'}
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="lg:col-span-1">
                        <RecomendationNews />
                    </div>
                </div>
            </div>
        </div>
    )
}
