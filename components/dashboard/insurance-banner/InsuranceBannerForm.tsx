"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface InsuranceBanner {
  _id?: string;
  badge: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  email: string;
  image: string;
  displayOrder: number;
  isActive: boolean;
}

interface Props {
  banner?: InsuranceBanner | null;
}

export default function InsuranceBannerForm({ banner }: Props) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    badge: "",
    title: "",
    description: "",
    buttonText: "",
    buttonLink: "",
    email: "",
    image: "",
    displayOrder: 1,
    isActive: true,
  });

  useEffect(() => {
    if (!banner) return;

    setFormData({
      badge: banner.badge,
      title: banner.title,
      description: banner.description,
      buttonText: banner.buttonText,
      buttonLink: banner.buttonLink,
      email: banner.email,
      image: banner.image,
      displayOrder: banner.displayOrder,
      isActive: banner.isActive,
    });
  }, [banner]);

async function handleImageUpload(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0];

  if (!file) return;

  const form = new FormData();
  form.append("file", file);

  setLoading(true);

  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    if (data.success) {
      setFormData((prev) => ({
        ...prev,
        image: data.url,
      }));
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
    alert("Image upload failed");
  } finally {
    setLoading(false);
  }
}
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;

      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "displayOrder"
          ? Number(value)
          : value,
    }));
  };

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const url = banner
        ? `/api/insurance-banner/${banner._id}`
        : "/api/insurance-banner";

      const method = banner ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        return;
      }

      alert(result.message);

      router.push("/insurance-banner");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl text-black bg-white p-6 shadow"
    >
      <div>
        <label className="mb-2 block font-medium">
          Badge
        </label>

        <input
          type="text"
          name="badge"
          value={formData.badge}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Title
        </label>

        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Button Text
        </label>

        <input
          type="text"
          name="buttonText"
          value={formData.buttonText}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Button Link
        </label>

        <input
          type="text"
          name="buttonLink"
          value={formData.buttonLink}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
          required
        />
      </div>

      <div>
  <label className="mb-2 block font-medium">
    Banner Image
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={handleImageUpload}
    className="w-full rounded-lg border p-3"
  />

  {formData.image && (
    <img
      src={formData.image}
      alt="Preview"
      className="mt-4 h-40 w-72 rounded-lg border object-cover"
    />
  )}
</div>

      <div>
        <label className="mb-2 block font-medium">
          Display Order
        </label>

        <input
          type="number"
          name="displayOrder"
          value={formData.displayOrder}
          onChange={handleChange}
          className="w-full rounded-lg border p-3"
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="isActive"
          checked={formData.isActive}
          onChange={handleChange}
        />

        <label>Active</label>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-black px-6 py-3 text-white disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : banner
          ? "Update Banner"
          : "Create Banner"}
      </button>
    </form>
  );
}