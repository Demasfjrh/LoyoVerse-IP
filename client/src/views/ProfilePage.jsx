import { useState, useEffect } from "react";
import axios from "axios";
import baseUrl from "../api/baseUrl";
import { Link } from "react-router";

export default function Profile() {
  const [profile, setProfile] = useState({
    imgUrl: "",
    username: "",
    email: "",
  });

  async function fetchUserProfile() {
    try {
      const { data } = await axios.get(`${baseUrl}/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setProfile({
        imgUrl: data.imgUrl || "",
        username: data.UserName || "",
        email: data.email || "",
      });
    } catch (error) {
      console.log("Error fetching profile:", error);
    }
  }

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900">
      <div className="w-150 h-120 rounded-lg border-2 border-indigo-500 bg-gray-800 p-6 text-center shadow-xl">
        <figure className="mx-auto mb-4 flex h-50 w-50 items-center justify-center rounded-full bg-indigo-500">
          <img
            src={profile.imgUrl || 'https://static.vecteezy.com/system/resources/previews/000/512/576/original/vector-profile-glyph-black-icon.jpg'}
            alt="Profile"
            className="h-full w-full rounded-full object-cover border-4 border-gray-700"
          />
        </figure>
        <h2 className="mt-4 text-2xl font-bold text-indigo-400">Username: {profile.username}</h2>
        <p className="text-gray-400">Email:</p>
        <p className="text-gray-400">{profile.email}</p>
        <div className="mt-10">
        <Link to={'/editProfile'} className="rounded-full bg-indigo-600 px-6 py-2 text-white text-lg font-semibold hover:bg-indigo-700 transition-all">
          Edit Profile
        </Link>
        </div>
      </div>
    </div>
  );
}
