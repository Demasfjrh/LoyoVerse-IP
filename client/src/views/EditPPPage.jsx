import { useState, useEffect } from "react";
import axios from "axios";
import Toastify from "toastify-js";
import { useParams, useNavigate } from "react-router";
import baseUrl from "../api/baseUrl";

export default function EditPPPage() {
  const [imgUrl, setImgUrl] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [uploading, setUploading] = useState(false);

  const navigate = useNavigate();

  async function fetchUserProfile() {
    try {
      const { data } = await axios.get(`${baseUrl}/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setImgUrl(data.imgUrl);
    } catch (error) {
      console.log("Error fetching profile:", error);
    }
  }

  async function handleImageSelect(event) {
    const file = event.target.files[0];
    setImageUpload(file);
    if (file) {
      setImgUrl(URL.createObjectURL(file));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!imageUpload) {
      Toastify({
        text: "Please select an image to upload.",
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
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("imgUrl", imageUpload)

      const { data } = await axios.patch(
        `${baseUrl}/profile`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          },
        }
      );

      Toastify({
        text: `${data.message}`,
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

      setImgUrl(data.imgUrl);
      navigate("/");
    } catch (error) {
      console.error("Error uploading image:", error);

      const errorMessage =
        error.response?.data?.error || "Failed to upload image.";
        Toastify({
          text: errorMessage,
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
      setUploading(false);
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900">
      <div className="bg-gray-800 rounded-2xl shadow-2xl p-12 w-full max-w-xl">
        <h1 className="text-5xl font-bold text-center text-white mb-8">
          Update Profile Picture
        </h1>
        <img
          src={imgUrl || "https://static.vecteezy.com/system/resources/previews/000/512/576/original/vector-profile-glyph-black-icon.jpg"}
          alt="Profile"
          className="w-40 h-40 mx-auto rounded-full shadow-lg mb-6 object-cover border-4 border-gray-700"
        />
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block w-full">
         
            <input
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="mt-2 block text-center text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 rounded-md py-2 cursor-pointer"
            />
           
          </label>
          <button
            type="submit"
            className="btn btn-primary w-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-md transform hover:scale-105 text-lg py-3"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Save Image"}
          </button>
        </form>
        {uploading && (
          <div className="flex gap-2 items-center justify-center mt-4">
            <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full border-t-blue-600"></div>
            <p className="text-gray-400">Uploading...</p>
          </div>
        )}
      </div>
    </div>
  );
}
