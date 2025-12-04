import React from "react";

const GalleryDetailModal = ({ post, onClose }) => {
  if (!post) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50">
      <div className="bg-white rounded-2xl p-6 md:p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-lg">

        {/* HEADER */}
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-teal-800">
            Detail Karya
          </h2>

          <button
            onClick={onClose}
            className="text-teal-500 hover:text-teal-700 text-3xl leading-none"
          >
            ×
          </button>
        </div>

        {/* IMAGE */}
        <img
          src={post.image_url}
          alt={post.caption}
          className="w-full rounded-xl mb-6 shadow-md object-cover max-h-96"
        />

        {/* CAPTION */}
        <p className="text-gray-700 text-lg mb-4 leading-relaxed">
          {post.caption}
        </p>

        {/* META DATA */}
        <p className="text-sm text-gray-500">
          Diunggah pada: {new Date(post.created_at).toLocaleString()}
        </p>

      </div>
    </div>
  );
};

export default GalleryDetailModal;
