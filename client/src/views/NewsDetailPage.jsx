import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Toastify from "toastify-js";

const API_URL = import.meta.env.VITE_API_URL;

export default function NewsDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchNewsDetail();
    checkIfFavorite();
  }, [id]);

  const fetchNewsDetail = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/article/${id}`);
      setNews(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching news detail:", error);
      if (error.response?.status === 404) {
        navigate("/404");
      }
      setLoading(false);
    }
  };

  const checkIfFavorite = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) return;

      const { data } = await axios.get(`${API_URL}/favorites`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setIsFavorite(data.some((fav) => fav.ArticleId === parseInt(id)));
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  const handleFavorite = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      if (!access_token) {
        Toastify.error("Please login to add favorites");
        navigate("/login");
        return;
      }

      if (isFavorite) {
        // Find the favorite id first
        const { data } = await axios.get(`${API_URL}/favorites`, {
          headers: { Authorization: `Bearer ${access_token}` },
        });
        const favorite = data.find((fav) => fav.ArticleId === parseInt(id));
        
        if (favorite) {
          await axios.delete(`${API_URL}/favorites/${favorite.id}`, {
            headers: { Authorization: `Bearer ${access_token}` },
          });
          Toastify.success("Removed from favorites");
          setIsFavorite(false);
        }
      } else {
        await axios.post(
          `${API_URL}/favorites`, 
          { ArticleId: id },
          { headers: { Authorization: `Bearer ${access_token}` } }
        );
        Toastify.success("Added to favorites");
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error updating favorite:", error);
      Toastify.error(error.response?.data?.message || "Failed to update favorites");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!news) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto">
        <div className="relative">
          <img
            src={news.imageUrl}
            alt={news.title}
            className="w-full h-[400px] object-cover rounded-lg shadow-lg mb-8"
          />
          <button
            onClick={handleFavorite}
            className={`absolute top-4 right-4 p-3 rounded-full ${
              isFavorite 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-700'
            } shadow-lg hover:transform hover:scale-105 transition-all`}
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill={isFavorite ? "currentColor" : "none"}
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
          </button>
        </div>
        <h1 className="text-4xl font-bold mb-4">{news.title}</h1>
        <div className="flex items-center text-gray-600 mb-8">
          <span>{new Date(news.createdAt).toLocaleDateString()}</span>
          <span className="mx-2">•</span>
          <span>{news.author}</span>
          <span className="mx-2">•</span>
          <span>{news.category}</span>
        </div>
        <div className="prose max-w-none">
          {news.content}
        </div>
      </article>
    </div>
  );
}
