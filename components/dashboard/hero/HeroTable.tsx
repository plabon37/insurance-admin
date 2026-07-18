"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Hero {
  _id: string;
  badge: string;
  title: string;
  description: string;
  backgroundImage: string;
  isActive: boolean;
}

export default function HeroTable() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState("");

 useEffect(() => {
  let ignore = false;

  async function loadHeroes() {
    try {
      const res = await fetch("/api/hero");
      const data = await res.json();

      if (!ignore && data.success) {
        setHeroes(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (!ignore) {
        setLoading(false);
      }
    }
  }

  loadHeroes();

  return () => {
    ignore = true;
  };
}, []);

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this Hero?"
    );

    if (!confirmDelete) return;

    try {
      setDeleting(id);

      const res = await fetch(`/api/hero/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setHeroes((prev) => prev.filter((hero) => hero._id !== id));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    } finally {
      setDeleting("");
    }
  };

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-10 text-center shadow">
        Loading...
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-white shadow">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-4 text-left text-black">
              Image
            </th>

            <th className="px-6 py-4 text-left text-black">
              Badge
            </th>

            <th className="px-6 py-4 text-left text-black">
              Title
            </th>

            <th className="px-6 py-4 text-center text-black">
              Status
            </th>

            <th className="px-6 py-4 text-center text-black">
              Action
            </th>
          </tr>
        </thead>

        <tbody>
                      {heroes.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-6 py-10 text-center text-gray-500"
              >
                No Hero Found
              </td>
            </tr>
          ) : (
            heroes.map((hero) => (
              <tr
                key={hero._id}
                className="border-t hover:bg-gray-50"
              >
                <td className="px-6 py-4">
                  {hero.backgroundImage ? (
                    <Image
                      src={hero.backgroundImage}
                      alt={hero.title}
                      width={120}
                      height={70}
                      className="h-16 w-28 rounded-lg border object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-28 items-center justify-center rounded-lg border bg-gray-100 text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                </td>

                <td className="px-6 py-4 font-medium text-black">
                  {hero.badge || "-"}
                </td>

                <td className="px-6 py-4">
                  <div className="font-semibold text-black">
                    {hero.title}
                  </div>

                  <div className="mt-1 max-w-sm truncate text-sm text-gray-500">
                    {hero.description}
                  </div>
                </td>

                <td className="px-6 py-4 text-center">
                  {hero.isActive ? (
                    <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                      Inactive
                    </span>
                  )}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center justify-center gap-3">
                    <Link
                      href={`/hero/${hero._id}`}
                      className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(hero._id)}
                      disabled={deleting === hero._id}
                      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deleting === hero._id
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
                  </tbody>
      </table>
    </div>
  );
}