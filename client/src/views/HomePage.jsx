import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../components/Card';
import { useNavigate } from 'react-router';
import baseUrl from '../api/baseUrl';
import RecomendationNews from '../components/RecomendationNews';
import Loading from '../assets/21.svg'

export default function HomePage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');

  const navigate = useNavigate();

  // Fetch recommendations
  async function fetchRecommendations() {
    try {
      setLoading(true);
      const { data } = await axios.get(`${baseUrl}/recomendation`);
      setRecommendations(data.recommendations);
    } catch (error) {
      console.error('Error fetching recommendations:', error.message);
    } finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchRecommendations();
  }, []);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchArticles(search);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-gray-200 space-y-6 mt-10">
      <h1 className="text-4xl font-bold text-green-400">🌿 Berita Terkini</h1>

      {/* Search Form */}
      <form
        onSubmit={handleSearch}
        className="w-full max-w-lg flex bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <input
          type="text"
          placeholder="Cari berita..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-grow p-3 bg-gray-700 text-gray-200 placeholder-gray-400 outline-none"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-500 text-white px-6 py-2 font-semibold transition">
          🔍 Cari
        </button>
      </form>

<hr />
        <h1>Recomended News</h1>
      {/* Recommendations */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          <section className="flex justify-center items-center min-h-[400px]">
          <img
            src={Loading}
            alt="loading"
          />
        </section>
        ) : (
          recommendations.map((recom, ind) => (
            <RecomendationNews
              key={ind}
              recom={recom}
            />
          ))
        )}
      </div>
      <hr />
      <h1>Other</h1>
      {/* Articles List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card />
      </div>
    </div>
  );
}
