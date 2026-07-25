"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
  _id: string;
  badge: string;
  heading: string;
  description: string;
  isActive: boolean;
  newsItems: NewsItem[];
}

export default function NewsTable() {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchNews() {
    try {
      setLoading(true);

      const res = await fetch("/api/news");

      const data = await res.json();

      if (data.success) {
        setNews(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  async function fetchNews() {
    try {
      setLoading(true);

      const res = await fetch("/api/news");
      const data = await res.json();

      if (data.success) {
        setNews(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  fetchNews();
}, []);
  async function handleDelete(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this news section?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        fetchNews();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow">
        Loading...
      </div>
    );
  }
    return (
    <div className="rounded-xl bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-black">
          News & Events
        </h2>

        <Link
          href="/news/new"
          className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white transition hover:bg-blue-700"
        >
          + Create News
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-3 text-left">
                Badge
              </th>

              <th className="border px-4 py-3 text-left">
                Heading
              </th>

              <th className="border px-4 py-3 text-center">
                News Items
              </th>

              <th className="border px-4 py-3 text-center">
                Status
              </th>

              <th className="border px-4 py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {news.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-gray-500"
                >
                  No News Found
                </td>
              </tr>
            ) : (
              news.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-gray-50"
                >
                  <td className="border px-4 py-3">
                    {item.badge}
                  </td>

                  <td className="border px-4 py-3 font-medium">
                    {item.heading}
                  </td>

                  <td className="border px-4 py-3 text-center">
                    {item.newsItems.length}
                  </td>

                  <td className="border px-4 py-3 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        item.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="border px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <Link
                        href={`/news/${item._id}`}
                        className="rounded bg-yellow-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-yellow-600"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}