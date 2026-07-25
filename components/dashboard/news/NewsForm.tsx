"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface NewsItem {
  image: string;
  date: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  displayOrder: number;
  isActive: boolean;
}

interface News {
  badge: string;
  heading: string;
  description: string;
  isActive: boolean;
  newsItems: NewsItem[];
}

interface NewsFormProps {
  newsId?: string;
}

export default function NewsForm({
  newsId,
}: NewsFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<News>({
    badge: "",
    heading: "",
    description: "",
    isActive: true,
    newsItems: [],
  });

  useEffect(() => {
    if (!newsId) return;

    async function fetchNews() {
      try {
        setLoading(true);

        const res = await fetch(`/api/news/${newsId}`);

        const data = await res.json();

        if (data.success) {
          setFormData(data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, [newsId]);

  async function uploadImage(file: File) {
    const imageData = new FormData();

    imageData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: imageData,
    });

    const data = await res.json();

    return data.url;
  }

  async function handleImageUpload(
    index: number,
    file: File
  ) {
    setLoading(true);

    try {
      const imageUrl = await uploadImage(file);

      const updatedItems = [...formData.newsItems];

      updatedItems[index].image = imageUrl;

      setFormData((prev) => ({
        ...prev,
        newsItems: updatedItems,
      }));
    } finally {
      setLoading(false);
    }
  }

  function addNewsItem() {
    setFormData((prev) => ({
      ...prev,
      newsItems: [
        ...prev.newsItems,
        {
          image: "",
          date: "",
          title: "",
          description: "",
          buttonText: "Read More",
          buttonLink: "#",
          displayOrder: prev.newsItems.length + 1,
          isActive: true,
        },
      ],
    }));
  }

  function removeNewsItem(index: number) {
    const updatedItems = [...formData.newsItems];

    updatedItems.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      newsItems: updatedItems,
    }));
  }

  function duplicateNewsItem(index: number) {
    const updatedItems = [...formData.newsItems];

    const item = {
      ...updatedItems[index],
      displayOrder: updatedItems.length + 1,
    };

    updatedItems.splice(index + 1, 0, item);

    setFormData((prev) => ({
      ...prev,
      newsItems: updatedItems,
    }));
  }

  function moveUp(index: number) {
    if (index === 0) return;

    const updatedItems = [...formData.newsItems];

    [updatedItems[index - 1], updatedItems[index]] = [
      updatedItems[index],
      updatedItems[index - 1],
    ];

    setFormData((prev) => ({
      ...prev,
      newsItems: updatedItems,
    }));
  }

  function moveDown(index: number) {
    if (index === formData.newsItems.length - 1) return;

    const updatedItems = [...formData.newsItems];

    [updatedItems[index], updatedItems[index + 1]] = [
      updatedItems[index + 1],
      updatedItems[index],
    ];

    setFormData((prev) => ({
      ...prev,
      newsItems: updatedItems,
    }));
  }
    function handleNewsChange(
    index: number,
    field: keyof NewsItem,
    value: string | number | boolean
  ) {
    const updatedItems = [...formData.newsItems];

    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      newsItems: updatedItems,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(
        newsId ? `/api/news/${newsId}` : "/api/news",
        {
          method: newsId ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          newsId
            ? "News updated successfully."
            : "News created successfully."
        );

        router.push("/news");
      } else {
        alert(data.message);
      }
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
      className="space-y-8 rounded-xl bg-white p-6 text-black shadow"
    >
      <div>
        <label className="mb-2 block font-medium">
          Badge
        </label>

        <input
          type="text"
          value={formData.badge}
          onChange={(e) =>
            setFormData({
              ...formData,
              badge: e.target.value,
            })
          }
          className="w-full rounded-lg border p-3"
          placeholder="Enter badge"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Heading
        </label>

        <input
          type="text"
          value={formData.heading}
          onChange={(e) =>
            setFormData({
              ...formData,
              heading: e.target.value,
            })
          }
          className="w-full rounded-lg border p-3"
          placeholder="Enter heading"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
          className="w-full rounded-lg border p-3"
          placeholder="Enter description"
          required
        />
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={formData.isActive}
          onChange={(e) =>
            setFormData({
              ...formData,
              isActive: e.target.checked,
            })
          }
        />

        <span>Active Section</span>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          News Items
        </h2>

        <button
          type="button"
          onClick={addNewsItem}
          className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
        >
          + Add News
        </button>
      </div>
            {formData.newsItems.map((item, index) => (
        <div
          key={index}
          className="space-y-6 rounded-xl border p-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold">
              News {index + 1}
            </h3>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => moveUp(index)}
                className="rounded bg-gray-600 px-3 py-2 text-white"
              >
                ↑
              </button>

              <button
                type="button"
                onClick={() => moveDown(index)}
                className="rounded bg-gray-600 px-3 py-2 text-white"
              >
                ↓
              </button>

              <button
                type="button"
                onClick={() => duplicateNewsItem(index)}
                className="rounded bg-green-600 px-3 py-2 text-white"
              >
                Duplicate
              </button>

              <button
                type="button"
                onClick={() => removeNewsItem(index)}
                className="rounded bg-red-600 px-3 py-2 text-white"
              >
                Delete
              </button>
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              News Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  handleImageUpload(index, file);
                }
              }}
            />

            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="mt-4 h-40 w-full rounded-lg object-cover"
              />
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">
                Date
              </label>

              <input
                type="date"
                value={item.date}
                onChange={(e) =>
                  handleNewsChange(
                    index,
                    "date",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Display Order
              </label>

              <input
                type="number"
                value={item.displayOrder}
                onChange={(e) =>
                  handleNewsChange(
                    index,
                    "displayOrder",
                    Number(e.target.value)
                  )
                }
                className="w-full rounded-lg border p-3"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Title
            </label>

            <input
              type="text"
              value={item.title}
              onChange={(e) =>
                handleNewsChange(
                  index,
                  "title",
                  e.target.value
                )
              }
              className="w-full rounded-lg border p-3"
              placeholder="Enter news title"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Description
            </label>

            <textarea
              rows={4}
              value={item.description}
              onChange={(e) =>
                handleNewsChange(
                  index,
                  "description",
                  e.target.value
                )
              }
              className="w-full rounded-lg border p-3"
              placeholder="Enter description"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">
                Button Text
              </label>

              <input
                type="text"
                value={item.buttonText}
                onChange={(e) =>
                  handleNewsChange(
                    index,
                    "buttonText",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Button Link
              </label>

              <input
                type="text"
                value={item.buttonLink}
                onChange={(e) =>
                  handleNewsChange(
                    index,
                    "buttonLink",
                    e.target.value
                  )
                }
                className="w-full rounded-lg border p-3"
                placeholder="/news/example"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={item.isActive}
              onChange={(e) =>
                handleNewsChange(
                  index,
                  "isActive",
                  e.target.checked
                )
              }
            />

            <span>Active News</span>
          </div>
        </div>
      ))}
            <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : newsId
            ? "Update News"
            : "Create News"}
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => router.push("/news")}
          className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}