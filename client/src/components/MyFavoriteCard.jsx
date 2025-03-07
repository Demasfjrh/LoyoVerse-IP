import React from 'react';
import { useNavigate } from 'react-router';

export default function MyFavoriteCard({ news }) {
  const navigate = useNavigate();

  // Pastikan news tidak null atau undefined
  if (!news) {
    return null;
  }

  return (
    <div
      className="cursor-pointer group overflow-hidden p-5 duration-700 hover:duration-700 relative bg-gray-800 rounded-xl w-full sm:w-80 h-auto shadow-lg transform hover:scale-105 transition">
      {/* Animasi Lingkaran */}
      <div className="bg-transparent group-hover:scale-150 absolute shadow-green-800 shadow-inner rounded-full transition-all ease-in-out duration-700 w-24 h-24 -top-12 -left-12"></div>
      <div className="bg-transparent group-hover:scale-150 absolute shadow-blue-800 shadow-inner rounded-full transition-all ease-in-out duration-700 w-24 h-24 top-44 left-14"></div>
      <div className="bg-transparent group-hover:scale-150 absolute shadow-yellow-800 shadow-inner rounded-full transition-all ease-in-out duration-700 w-24 h-24 top-24 left-56"></div>
      
      {/* Gambar Artikel */}
      <div className="w-full h-52 overflow-hidden rounded-lg">
        <img
          src={news.imgUrl}
          alt={news.title}
          className="w-full h-full object-cover transition duration-500 ease-in-out group-hover:scale-110"
        />
      </div>
      
      {/* Konten */}
      <div className="shadow-xl shadow-neutral-900 p-4 bg-gray-700 bg-opacity-70 rounded-xl flex flex-col gap-3 mt-4">
        <h2 className="text-green-300 font-bold text-lg">{news.title}</h2>
        <p className="text-gray-300 text-sm">
          {news.description.length > 100
            ? news.description.substring(0, 100) + '...'
            : news.description}
        </p>
        <button
          className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded-lg transition hover:scale-105"
          onClick={() => navigate(`/article/${news.id}`)}>
          Read More →
        </button>
      </div>
    </div>
  );
}