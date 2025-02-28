import { useState, useEffect } from "react";
import { Link } from "react-router"; // Perbaikan import
import axios from "axios";
import baseUrl from "../api/baseUrl";

export default function RecommendationNews() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const { data } = await axios.get(`${baseUrl}/recommendation`, {
        headers: { Authorization: `Bearer ${access_token}` }, // Tambahkan Auth jika perlu
      });

      console.log("Fetched data:", data); // Debugging log

      if (data.text) {
        const parsedData = JSON.parse(data.text); // API mengembalikan JSON dalam bentuk string
        console.log("Parsed recommendations:", parsedData);

        const flattenedArticles = [];
        Object.entries(parsedData).forEach(([category, articles]) => {
          articles.forEach((article) => {
            flattenedArticles.push({
              ...article,
              category, // Tambahkan kategori ke setiap artikel
            });
          });
        });

        setRecommendations(flattenedArticles);
      } else {
        setRecommendations([]);
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
      setError("Failed to fetch recommendations");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4">Recommended For You</h2>
      <div className="space-y-4">
        {recommendations.length === 0 ? (
          <p>No recommendations available.</p>
        ) : (
          recommendations.map((news, index) => (
            <Link
              key={index}
              to={`/news/${index}`} // Menggunakan index karena API Gemini tidak mengembalikan ID
              className="flex space-x-4 group hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
              <img
                src={news.imageUrl || "https://th.bing.com/th/id/OIP.MuEz5UBKmB1iTJic6Fg0iQHaEK?w=319&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7"} // Pastikan ada default image
                alt={news.title}
                className="w-20 h-20 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-medium line-clamp-2 group-hover:text-blue-600">
                  {news.title}
                </h3>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-sm text-gray-500">{new Date().toLocaleDateString()}</span>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                    {news.category}
                  </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
