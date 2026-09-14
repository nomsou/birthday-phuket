"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Upload, Trash2 } from "lucide-react";

type GalleryImage = {
  id: string;
  url: string;
  caption: string | null;
  order: number;
};

export default function AdminGalleryClient({
  initialImages,
}: {
  initialImages: GalleryImage[];
}) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages);
  const [uploading, setUploading] = useState(false);
  const [caption, setCaption] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("caption", caption);

    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setCaption("");
        router.refresh(); // Re-fetch server data to update list
      } else {
        alert("Upload failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error during upload.");
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this photo permanently?")) return;

    try {
      const res = await fetch(`/api/admin/gallery/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      } else {
        alert("Delete failed.");
      }
    } catch (err) {
      console.error(err);
      alert("Network error during delete.");
    }
  };

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      <div
        className="p-6 border-2 border-dashed flex flex-col sm:flex-row items-center gap-4"
        style={{ borderColor: "#E0DCD0" }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
          id="gallery-upload"
        />
        <label
          htmlFor="gallery-upload"
          className="flex items-center gap-2 px-6 py-3 text-xs tracking-[0.15em] uppercase cursor-pointer transition-all hover:bg-[#2C5F2D] hover:text-white"
          style={{ background: "#2C5F2D", color: "#F5F0E6" }}
        >
          <Upload size={14} />
          {uploading ? "Uploading..." : "Add Photo"}
        </label>
        <input
          type="text"
          placeholder="Optional caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="flex-1 w-full px-4 py-3 text-sm outline-none border bg-transparent"
          style={{ borderColor: "#E0DCD0", color: "#1A1A1A" }}
        />
      </div>

      {/* Image Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div
            key={img.id}
            className="group relative aspect-square rounded-lg overflow-hidden bg-[#E0DCD0]"
          >
            <img
              src={img.url}
              alt={img.caption || ""}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => handleDelete(img.id)}
              className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={12} />
            </button>
            {img.caption && (
              <div className="absolute inset-x-0 bottom-0 p-2 bg-black/50">
                <p className="text-[10px] text-white truncate">{img.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
