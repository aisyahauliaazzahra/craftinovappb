import React, { useEffect, useRef, useState } from 'react';
import Header from '../components/Header';

const AboutPage = ({ setCurrentView, setShowPasswordModal, companyInfo }) => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  // Animasi muncul saat scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const products = {
    training: [
      { 
        name: 'Training Kit 1', 
        link: 'https://id.shp.ee/VYS4ps1',
        image: '/bookmarksss.jpg' // Ganti dengan path gambar Anda
      },
      { 
        name: 'Training Kit 2', 
        link: 'https://id.shp.ee/VYS4ps1',
        image: '/minipouch.jpg'
      },
      { 
        name: 'Training Kit 3', 
        link: 'https://id.shp.ee/VYS4ps1',
        image: '/cablestrap.jpg'
      },
    ],
    middle: [
      { 
        name: 'Middle Kit', 
        link: 'https://id.shp.ee/VYS4ps1',
        image: '/middle.jpg'
      }
    ],
    advance: [
      { 
        name: 'Advance Kit', 
        link: 'https://id.shp.ee/VYS4ps1',
        image: '/advence.jpg'
      }
    ],
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white shadow-md rounded-2xl overflow-hidden transition-all transform hover:scale-105 hover:shadow-[0_0_20px_rgba(13,148,136,0.2)] duration-300 flex flex-col">
      <div className="relative h-48 w-full bg-gradient-to-br from-teal-100 to-cyan-100">
        <img 
          src={product.image || '/advence.png'} 
          alt={product.name} 
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback jika gambar tidak ditemukan
            e.target.src = '/advence.png';
          }}
        />
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between text-center">
        <h5 className="text-lg font-semibold text-gray-800 mb-3">{product.name}</h5>
        <button
          onClick={() => window.open(product.link, '_blank')}
          className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-2 px-5 rounded-full font-semibold hover:from-teal-600 hover:to-cyan-700 transition-all transform hover:scale-105 shadow-sm"
        >
          Beli Sekarang
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-cyan-50">
      <Header
        companyInfo={companyInfo}
        setCurrentView={setCurrentView}
        setShowPasswordModal={setShowPasswordModal}
        activeView="about"
      />

      <div className="max-w-6xl mx-auto px-6 py-12">
      
        {/* Section Produk */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-center text-gray-800 mb-10">
            ✨ Pilihan Kit Craftinova ✨
          </h3>

          {/* Training Section */}
          <div className="mb-16">
            <h4 className="text-2xl font-semibold text-gray-700 mb-6 text-center">
              🎒 Training Kits
            </h4>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {products.training.map((p, i) => (
                <ProductCard key={i} product={p} />
              ))}
            </div>
          </div>

          {/* Middle & Advance Section */}
          <div className="mb-12">
            <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
              {/* Middle Section */}
              <div className="text-center">
                <h4 className="text-2xl font-semibold text-gray-700 mb-6">
                  🪄 Middle Kit
                </h4>
                {products.middle.map((p, i) => (
                  <div key={i} className="max-w-sm mx-auto">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>

              {/* Advance Section */}
              <div className="text-center">
                <h4 className="text-2xl font-semibold text-gray-700 mb-6">
                  ⚡ Advance Kit
                </h4>
                {products.advance.map((p, i) => (
                  <div key={i} className="max-w-sm mx-auto">
                    <ProductCard product={p} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 flex justify-center">
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-10 text-center shadow-md max-w-xl border border-teal-100">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Ingin Mencoba Kit Craftinova?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Dapatkan kit DIY art therapy dan rasakan manfaatnya langsung ✨
            </p>
            <button
              onClick={() => window.open('https://id.shp.ee/VYS4ps1', '_blank')}
              className="bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-3 px-8 rounded-xl font-semibold hover:from-teal-600 hover:to-cyan-700 transform hover:scale-105 transition-all"
            >
              Kunjungi Toko Kami
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;