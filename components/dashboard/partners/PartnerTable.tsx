"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface LogoItem {
  image: string;
  websiteUrl: string;
  displayOrder: number;
  isActive: boolean;
}

interface Partner {
  _id: string;
  heading: string;
  logos: LogoItem[];
  createdAt: string;
}

export default function PartnerTable() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPartners() {
    try {
      const res = await fetch("/api/partners");
      const data = await res.json();

      if (data.success) {
        setPartners(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPartners();
  }, []);

  async function deletePartner(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this partner section?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/partners/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        loadPartners();
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
      <div className="rounded-xl bg-white p-10 text-center shadow">
        Loading...
      </div>
    );
  }

  return (
    <div className="rounded-xl text-black bg-white p-6 shadow">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Partner Sections
        </h2>

        <Link
          href="/partners/new"
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          + Add Partner
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="px-4 py-3 text-left">
                Heading
              </th>

              <th className="px-4 py-3 text-center">
                Total Logos
              </th>

              <th className="px-4 py-3 text-center">
                Active Logos
              </th>

              <th className="px-4 py-3 text-center">
                Created
              </th>

              <th className="px-4 py-3 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {partners.map((partner) => {
              const activeLogos =
                partner.logos.filter(
                  (logo) => logo.isActive
                ).length;

              return (
                <tr
                  key={partner._id}
                  className="border-b"
                >
                  <td className="px-4 py-4">
                    {partner.heading}
                  </td>

                  <td className="px-4 py-4 text-center">
                    {partner.logos.length}
                  </td>

                  <td className="px-4 py-4 text-center">
                    {activeLogos}
                  </td>

                  <td className="px-4 py-4 text-center">
                    {new Date(
                      partner.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/partners/${partner._id}`}
                        className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          deletePartner(partner._id)
                        }
                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}

            {partners.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center text-gray-500"
                >
                  No Partner Section Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}