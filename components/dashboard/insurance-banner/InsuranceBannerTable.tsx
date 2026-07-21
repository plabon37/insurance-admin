"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface InsuranceBanner {
  _id: string;
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
  banners: InsuranceBanner[];
}

export default function InsuranceBannerTable({
  banners,
}: Props) {
  const router = useRouter();

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this banner?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/insurance-banner/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (result.success) {
        alert(result.message);
        router.refresh();
      } else {
        alert(result.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  }

  return (
    <div className="overflow-x-auto text-black rounded-xl bg-white shadow">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Email</th>
            <th className="px-4 py-3 text-center">Order</th>
            <th className="px-4 py-3 text-center">Status</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {banners.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="py-8 text-center text-gray-500"
              >
                No Insurance Banner Found
              </td>
            </tr>
          ) : (
            banners.map((banner) => (
              <tr
                key={banner._id}
                className="border-t"
              >
                <td className="px-4 py-3">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="h-16 w-24 rounded object-cover"
                  />
                </td>

                <td className="px-4 py-3">
                  <div className="font-semibold">
                    {banner.title}
                  </div>

                  <div className="text-sm text-gray-500">
                    {banner.badge}
                  </div>
                </td>

                <td className="px-4 py-3">
                  {banner.email}
                </td>

                <td className="px-4 py-3 text-center">
                  {banner.displayOrder}
                </td>

                <td className="px-4 py-3 text-center">
                  {banner.isActive ? (
                    <span className="rounded bg-green-100 px-3 py-1 text-sm text-green-700">
                      Active
                    </span>
                  ) : (
                    <span className="rounded bg-red-100 px-3 py-1 text-sm text-red-700">
                      Inactive
                    </span>
                  )}
                </td>

                <td className="px-4 py-3">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/insurance-banner/${banner._id}`}
                      className="rounded bg-blue-600 px-3 py-2 text-white"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() =>
                        handleDelete(banner._id)
                      }
                      className="rounded bg-red-600 px-3 py-2 text-white"
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
  );
}