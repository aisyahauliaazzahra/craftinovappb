// src/pages/ProfilePage.js
import React from "react";
import Header from "../components/Header";

export default function ProfilePage({ 
  setCurrentView, 
  setShowPasswordModal, 
  companyInfo 
}) {

  const info = {
    name: "CraftInova",
    tagline: "Temukan ketenangan lewat kreativitas",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
      {/* HEADER */}
      <Header
        companyInfo={companyInfo || info}
        setCurrentView={setCurrentView}
        setShowPasswordModal={setShowPasswordModal}
        activeView="profile"
      />

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* TITLE */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-teal-800 mb-4">
            Tentang CraftInova
          </h2>
          <p className="text-gray-600 text-lg">
            Website kreatif untuk mengekspresikan diri dan menemukan ketenangan
          </p>
        </div>

        {/* ABOUT CARD */}
        <div className="bg-white rounded-2xl shadow-md border p-10 leading-relaxed text-gray-700">

          {/* FOTO PEMBUAT */}
          <div className="flex flex-col items-center mb-10">
            <img
              src="/logocraftinova.png"   
              alt="Foto Pembuat"
              className="w-44 h-44 rounded-full object-cover shadow-md border"
            />
            <p className="text-sm text-gray-500 mt-3 italic">
              Aisyah Aulia Azzahra Putri
            </p>

            {/* LINKEDIN */}
            <a
              href="https://www.linkedin.com/in/aisyah-aulia-azzahra-putri-588887311/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-teal-700 hover:text-teal-900 transition font-semibold"
            >
              <span className="text-xl">🔗</span> 
              <span>LinkedIn: Aisyah Aulia Azzahra Putri</span>
            </a>
          </div>

          <h3 className="text-2xl font-semibold text-teal-700 mb-4">
            👤 Pembuat Website
          </h3>
          <p className="text-lg mb-6 text-gray-700">
            Website <strong>CraftInova</strong> dibuat oleh:
            <br />
            <span className="font-bold text-teal-700">
              Aisyah Aulia Azzahra Putri
            </span>
            <br />
            NIM: <strong>21120123120041</strong>
          </p>

          <h3 className="text-2xl font-semibold text-teal-700 mb-4">
            💡 Teknologi yang Digunakan
          </h3>
          <ul className="list-disc pl-6 text-lg space-y-2 mb-6">
            <li>Dibangun menggunakan bahasa <strong>JavaScript</strong>.</li>
            <li>Dilengkapi fitur <strong>PWA (Progressive Web App)</strong>.</li>
            <li>Backend & database menggunakan <strong>Supabase</strong>.</li>
          </ul>

          <h3 className="text-2xl font-semibold text-teal-700 mb-4">
            🗂️ Fungsi Supabase di CraftInova
          </h3>
          <ul className="list-disc pl-6 text-lg space-y-2">
            <li>Menyimpan jawaban user dari kuisioner.</li>
            <li>Menyimpan hasil karya yang diupload user.</li>
            <li>Digunakan sebagai API utama untuk pengelolaan data.</li>
          </ul>

          <p className="text-lg mt-6">
            CraftInova hadir sebagai platform kreatif yang mendorong relaksasi,
            eksplorasi seni, dan pengalaman yang mudah diakses untuk semua orang.
          </p>
        </div>
      </div>
    </div>
  );
}
