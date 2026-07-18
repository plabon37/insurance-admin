"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [preview, setPreview] = useState("");

  const [formData, setFormData] = useState({
    badge: "",
    title: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    videoText: "",
    videoUrl: "",
    backgroundImage: "",
    isActive: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));

    try {
      setUploading(true);

      const body = new FormData();
      body.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body,
      });

      const data = await res.json();

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          backgroundImage: data.url,
        }));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/hero", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        alert("Hero Added Successfully");
        router.push("/hero");
        router.refresh();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl bg-white p-6 shadow"
    >
            <div>
        <label className="mb-2 block font-medium text-black">
          Badge
        </label>

        <input
          type="text"
          name="badge"
          value={formData.badge}
          onChange={handleChange}
          placeholder="Enter Badge"
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-black">
          Hero Title
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter Hero Title"
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium text-black">
          Description
        </label>

        <textarea
          rows={5}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter Description"
          className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black placeholder:text-gray-500 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="mb-2 block font-medium text-black">
            Button Text
          </label>

          <input
            type="text"
            name="buttonText"
            value={formData.buttonText}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-black">
            Button Link
          </label>

          <input
            type="text"
            name="buttonLink"
            value={formData.buttonLink}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div>
          <label className="mb-2 block font-medium text-black">
            Video Text
          </label>

          <input
            type="text"
            name="videoText"
            value={formData.videoText}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium text-black">
            Video URL
          </label>

          <input
            type="text"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 bg-white p-3 text-black"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block font-medium text-black">
          Background Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full rounded-lg border border-gray-300 p-3 text-black file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-white hover:file:bg-blue-700"
        />

        {uploading && (
          <p className="mt-2 text-blue-600">
            Uploading image...
          </p>
        )}

        {preview && (
          <div className="mt-4">
            <Image
              src={preview}
              alt="Preview"
              width={600}
              height={300}
              className="h-56 w-full rounded-lg border object-cover"
              unoptimized
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={formData.isActive}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              isActive: e.target.checked,
            }))
          }
        />

        <label className="text-black">
          Active Hero
        </label>
      </div>
            <button
        type="submit"
        disabled={loading || uploading}
        className="w-full rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {uploading
          ? "Uploading Image..."
          : loading
          ? "Saving Hero..."
          : "Save Hero"}
      </button>
    </form>
  );
}