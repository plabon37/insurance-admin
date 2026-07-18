"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";

export default function CategoryTable() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    async function fetchCategories() {
      try {
        const res = await fetch("/api/category");

        const data = await res.json();

        if (!ignore && data.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchCategories();

    return () => {
      ignore = true;
    };
  }, []);
  async function handleDelete(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/category/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();
if (data.success) {
  setCategories((prev) =>
    prev.filter((item) => item._id !== id)
  );
} else {
  alert(data.message);
}
    } catch (error) {
      console.error(error);
      alert("Failed to delete category.");
    }
  }
    if (loading) {
    return (
      <div className="rounded-xl bg-white p-8 shadow">
        <div className="animate-pulse space-y-4">
          <div className="h-10 rounded bg-gray-200" />
          <div className="h-10 rounded bg-gray-200" />
          <div className="h-10 rounded bg-gray-200" />
          <div className="h-10 rounded bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white shadow">

      {/* Header */}

      <div className="flex items-center justify-between border-b p-6">

        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Categories
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage all insurance categories
          </p>
        </div>

        <Link
          href="/category/new"
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Category
        </Link>

      </div>

      {/* Empty */}

      {categories.length === 0 ? (
        <div className="py-20 text-center text-gray-500">
          No categories found.
        </div>
      ) : (
        <div className="overflow-x-auto">

          <table className="min-w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Image
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Title
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Slug
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Order
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 text-center text-sm font-semibold">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {categories.map((category) => (
                <tr
                  key={category._id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <Image
                      src={category.image}
                      alt={category.title}
                      width={70}
                      height={70}
                      className="rounded-lg border object-cover"
                    />
                  </td>

                  <td className="px-6 py-4 font-medium">
                    {category.title}
                  </td>

                  <td className="px-6 py-4 text-gray-500">
                    {category.slug}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {category.displayOrder}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        category.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {category.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4">

                    <div className="flex justify-center gap-3">

                      <Link
                        href={`/category/${category._id}`}
                        className="rounded-lg bg-yellow-100 p-2 text-yellow-700 transition hover:bg-yellow-200"
                      >
                        <Pencil size={18} />
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(category._id)
                        }
                        className="rounded-lg bg-red-100 p-2 text-red-700 transition hover:bg-red-200"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        </div>
      )}
    </div>
  );
}