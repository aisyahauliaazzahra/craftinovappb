// src/pages/ProfilePage.js
import React, { useState, useEffect } from "react";
import Header from "../components/Header";

export default function ProfilePage({ 
  setCurrentView, 
  setShowPasswordModal, 
  companyInfo 
}) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [profilePic, setProfilePic] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("user_profile"));
    if (saved) {
      setName(saved.name || "");
      setEmail(saved.email || "");
      setAbout(saved.about || "");
      setProfilePic(saved.profilePic || "");
    }
  }, []);

  const handleSave = () => {
    const data = { name, email, about, profilePic };
    localStorage.setItem("user_profile", JSON.stringify(data));
    alert("Profil berhasil disimpan!");
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setProfilePic(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* HEADER */}
      <Header
        companyInfo={companyInfo}
        setCurrentView={setCurrentView}
        setShowPasswordModal={setShowPasswordModal}
        activeView="profile"
      />

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Profil Pengguna</h2>
          <p className="text-xl text-gray-600">Kelola informasi pribadi Anda</p>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-gradient-to-br from-teal-50 to-cyan-100 rounded-xl shadow-sm border p-8">

          {/* Profile Picture */}
          <div className="flex items-center mb-8">
            <img
              className="w-28 h-28 rounded-full object-cover border border-gray-300 mr-6"
              src={profilePic || "https://via.placeholder.com/150"}
              alt="Profile"
            />

            <div>
              <label className="text-sm text-teal-700 font-medium">
                Ganti Foto Profil
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePictureChange}
                className="block mt-2"
              />
            </div>
          </div>

          {/* FORM */}
          <div>
            <label className="font-semibold text-gray-700">Nama</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg mt-1 mb-4"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="font-semibold text-gray-700">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg mt-1 mb-4"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="font-semibold text-gray-700">Tentang Saya</label>
            <textarea
              className="w-full p-3 border rounded-lg mt-1 mb-6"
              rows="4"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>

            <button
              onClick={handleSave}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-semibold transition-all"
            >
              Simpan Profil
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
