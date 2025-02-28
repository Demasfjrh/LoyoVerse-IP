import { Link } from 'react-router-dom'

export default function Card({ news }) {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1">
            <Link to={`/news/${news.id}`}>
                <img 
                    src={news.imageUrl} 
                    alt={news.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x200?text=News+Image' // fallback image
                    }}
                />
                <div className="p-4">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                            {news.category}
                        </span>
                        <span className="text-gray-500 text-sm">
                            {new Date(news.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 line-clamp-2 hover:text-blue-600">
                        {news.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 mb-4">
                        {news.description}
                    </p>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <img 
                                src={news.author.avatar || 'https://via.placeholder.com/40?text=A'} 
                                alt={news.author.name}
                                className="w-8 h-8 rounded-full"
                            />
                            <span className="text-sm text-gray-600">{news.author.name}</span>
                        </div>
                        <span className="text-blue-600 hover:text-blue-800">Read more →</span>
                    </div>
                </div>
            </Link>
        </div>
    )
}
