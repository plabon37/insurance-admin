"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Category {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  displayOrder: number;
  isActive: boolean;
}

interface CategoryFormProps {
  category?: Category | null;
}

export default function CategoryForm({
  category,
}: CategoryFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");

  const [buttonText, setButtonText] = useState("Learn More");
  const [buttonLink, setButtonLink] = useState("#");

  const [displayOrder, setDisplayOrder] = useState(0);

  const [isActive, setIsActive] = useState(true);

  const [image, setImage] = useState("");

  const [uploading, setUploading] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
  if (!category) return;

  // eslint-disable-next-line react-hooks/set-state-in-effect
  setTitle(category.title ?? "");
  setSlug(category.slug ?? "");
  setDescription(category.description ?? "");
  setButtonText(category.buttonText ?? "Learn More");
  setButtonLink(category.buttonLink ?? "#");
  setDisplayOrder(category.displayOrder ?? 0);
  setImage(category.image ?? "");
  setIsActive(category.isActive ?? true);
}, [category]);

  useEffect(() => {
    if (category) return;

    const generatedSlug = title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSlug(generatedSlug);
  }, [title, category]);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const formData = new FormData();

    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        setImage(data.url);
      } else {
        alert("Image upload failed");
      }
    } catch (error) {
      console.error(error);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const payload = {
        title,
        slug,
        description,
        image,
        buttonText,
        buttonLink,
        displayOrder: Number(displayOrder),
        isActive,
      };

      const url = category
        ? `/api/category/${category._id}`
        : "/api/category";

      const method = category ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!data.success) {
        alert(data.message || "Something went wrong");
        return;
      }

      alert(
        category
          ? "Category updated successfully!"
          : "Category created successfully!"
      );

      router.push("/category");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
    return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl bg-white p-6 shadow"
    >
      {/* Title */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Title
        </label>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter category title"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          required
        />
      </div>

      {/* Slug */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Slug
        </label>

        <input
          type="text"
          value={slug}
          readOnly
          className="w-full rounded-lg border bg-gray-100 px-4 py-3"
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Description
        </label>

        <textarea
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          required
        />
      </div>

      {/* Image */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Category Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full rounded-lg border p-3"
        />

        {uploading && (
          <p className="mt-2 text-blue-600">
            Uploading image...
          </p>
        )}

        {image && (
          <div className="mt-4">
            <Image
              src={image}
              alt="Preview"
              width={220}
              height={140}
              className="rounded-lg border object-cover"
            />
          </div>
        )}
      </div>

      {/* Button Text & Link */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Button Text
          </label>

          <input
            type="text"
            value={buttonText}
            onChange={(e) => setButtonText(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Button Link
          </label>

          <input
            type="text"
            value={buttonLink}
            onChange={(e) => setButtonLink(e.target.value)}
            className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>
      </div>

      {/* Display Order */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Display Order
        </label>

        <input
          type="number"
          value={displayOrder}
          onChange={(e) =>
            setDisplayOrder(Number(e.target.value))
          }
          className="w-full rounded-lg border px-4 py-3 outline-none focus:border-blue-500"
        />
      </div>

      {/* Active */}
      <div className="flex items-center gap-3">
        <input
          id="active"
          type="checkbox"
          checked={isActive}
          onChange={(e) => setIsActive(e.target.checked)}
          className="h-5 w-5"
        />

        <label
          htmlFor="active"
          className="font-medium text-gray-700"
        >
          Active Category
        </label>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-4 border-t pt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-lg border px-6 py-3 font-medium transition hover:bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading || uploading}
          className="rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading
            ? "Saving..."
            : category
            ? "Update Category"
            : "Create Category"}
        </button>
      </div>
    </form>
  );
}