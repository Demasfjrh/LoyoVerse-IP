import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router';
import Toastify from 'toastify-js';
import baseUrl from '../api/baseUrl';

export default function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const navigate = useNavigate();
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetchArticle();
    checkIfFavorited();
  }, [id]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_token');
      const { data } = await axios.get(`${baseUrl}/article/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setArticle(data);
    } catch (error) {
      Toastify({
        text: "error loading article",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background:'linear-gradient(90deg, rgba(255,207,0,1) 0%, rgba(255,0,0,1) 68%)',
            color:'white'
        },
    }).showToast();
    } finally {
      setLoading(false);
    }
  };

  const checkIfFavorited = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const { data } = await axios.get(`${baseUrl}/favorites`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const isAlreadyFavorite = data.some(fav => fav.ArticleId === Number(id));
      setIsFavorited(isAlreadyFavorite);
    } catch (error) {
      console.error('Error checking favorites', error);
    }
  };

  const handleAddToFavorite = async () => {
    if (!article || isFavorited) return;
    try {
      const token = localStorage.getItem('access_token');
      await axios.post(
        `${baseUrl}/favorites`,
        { ArticleId: article.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Toastify({
        text: "success add to favorite",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
      setIsFavorited(true);
    } catch (error) {
      if (error.response && error.response.data.name === 'AlreadyFavorite') {
        Toastify({
          text: "Article alredy in favorite",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
              background:'linear-gradient(90deg, rgba(255,207,0,1) 0%, rgba(255,0,0,1) 68%)',
              color:'white'
          },
      }).showToast();
        setIsFavorited(true);
      } else {
        Toastify({
          text: "Failed to add to Favorite",
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
              background:'linear-gradient(90deg, rgba(255,207,0,1) 0%, rgba(255,0,0,1) 68%)',
              color:'white'
          },
      }).showToast();
      }
    }
  };

  const handleTextToSpeech = () => {
    // Cek apakah browser mendukung Web Speech API
    if ('speechSynthesis' in window) {
      const synth = window.speechSynthesis;

      // Jika sedang berbicara, hentikan
      if (isSpeaking) {
        synth.cancel();
        setIsSpeaking(false);
        return;
      }

      // Gabungkan judul dan deskripsi artikel
      const textToSpeak = `${article.title}. ${article.description}`;

      // Buat objek utterance
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      // Pilih bahasa sesuai kebutuhan (misalnya Indonesia)
      utterance.lang = 'id-ID'; // Bahasa Indonesia
      
      // Event listener untuk status berbicara
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);

      // Simpan referensi untuk keperluan pembatalan
      speechSynthesisRef.current = utterance;

      // Mulai berbicara
      synth.speak(utterance);
    } else {
      Toastify({
        text: "Text-To-Speach didn't allowed in your browser",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
    }).showToast();
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!article) return <p>Article not found</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-900 text-gray-200 flex justify-center items-center">
      <div className="max-w-4xl w-full bg-gray-800 shadow-lg rounded-xl overflow-hidden flex flex-col md:flex-row">
        {article.imgUrl && (
          <div className="w-full md:w-1/2">
            <img src={article.imgUrl} alt={article.title} className="w-full h-64 md:h-full object-cover" />
          </div>
        )}
        <div className="p-6 flex flex-col justify-center w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4 text-green-300">{article.title}</h1>
          <p className="text-gray-400 mb-4">{article.description}</p>
          
          <div className="flex space-x-4">
            <button
              onClick={handleAddToFavorite}
              disabled={isFavorited}
              className={`
                ${isFavorited 
                  ? 'bg-gray-500 cursor-not-allowed' 
                  : 'bg-green-600 hover:bg-green-500'
                } 
                text-white font-semibold py-2 px-4 rounded-lg transition
              `}
            >
              {isFavorited ? '✅ Sudah di Favorit' : '🌿 Tambah ke Favorit'}
            </button>

            <button
              onClick={handleTextToSpeech}
              className={`
                ${isSpeaking 
                  ? 'bg-red-500 hover:bg-red-400' 
                  : 'bg-blue-600 hover:bg-blue-500'
                }
                text-white font-semibold py-2 px-4 rounded-lg transition
              `}
            >
              {isSpeaking ? '🔇 Hentikan' : '🔊 Baca Artikel'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}