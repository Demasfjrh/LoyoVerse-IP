// src/pages/FavoritePage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/Card';
import Toastify from 'toastify-js';
import { fetchFavoritesAsync, removeFavoriteAsync } from '../features/favorite/favorite-slicer';
import MyFavoriteCard from '../components/MyFavoriteCard';

export default function FavoritePage() {
  const dispatch = useDispatch();
  const { favorites, loading, error } = useSelector(state => state.favorites);

  console.log(error, '<<<');

  useEffect(() => {
    dispatch(fetchFavoritesAsync());
  }, [dispatch]);

  // Handle error
  useEffect(() => {
    if (error) {
      Toastify({
        text: error.message,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom",
        position: "right",
        stopOnFocus: true,
        style: {
          background: 'linear-gradient(90deg, rgba(255,207,0,1) 0%, rgba(255,0,0,1) 68%)',
          color: 'white'
        },
      }).showToast();
    }
  }, [error]);

  const handleRemoveFavorite = (favoriteId) => {
    dispatch(removeFavoriteAsync(favoriteId))
      .then(() => {
        Toastify({
          text: "success Remove from favorite",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
          style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
          },
        }).showToast();
      })
      .catch(() => {
        Toastify({
          text: "failed remove ",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom",
          position: "right",
          stopOnFocus: true,
          style: {
            background: 'linear-gradient(90deg, rgba(255,207,0,1) 0%, rgba(255,0,0,1) 68%)',
            color: 'white'
          },
        }).showToast();
      });
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen dark:bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 dark:border-green-300"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-gray-200 mt-13">
      <h1 className="text-3xl font-bold mb-6 dark:text-gray-100">My Favorites</h1>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="relative">

              <MyFavoriteCard news={favorite.Article} />
              <button
                onClick={() => handleRemoveFavorite(favorite.id)}
                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition dark:bg-red-700 dark:hover:bg-red-800"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-500 dark:text-gray-400">No favorites yet.</p>
        </div>
      )}
    </div>
  );
}