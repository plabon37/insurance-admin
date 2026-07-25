"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface MenuItem {
  title: string;
  link: string;
  displayOrder: number;
  isActive: boolean;
}

interface PaymentMethod {
  image: string;
  name: string;
  link: string;
  displayOrder: number;
  isActive: boolean;
}

interface FooterCTA {
  _id: string;
  topText: string;
  heading: string;
  buttonText: string;
  officeTime: string;
  paymentTitle: string;
  isActive: boolean;
  menus: MenuItem[];
  paymentMethods: PaymentMethod[];
}

export default function FooterCTATable() {
  const [footerData, setFooterData] = useState<FooterCTA[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchFooterCTA() {
    try {
      setLoading(true);

      const res = await fetch("/api/footer-cta");

      const data = await res.json();

      if (data.success) {
        setFooterData(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
  async function loadFooterCTA() {
    try {
      setLoading(true);

      const res = await fetch("/api/footer-cta");
      const data = await res.json();

      if (data.success) {
        setFooterData(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  loadFooterCTA();
}, []);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Footer CTA?"
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/footer-cta/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        fetchFooterCTA();
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
        <h2 className="text-2xl font-bold">
          Footer CTA
        </h2>

        <Link
          href="/footer-cta/new"
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white"
        >
          + Create Footer CTA
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">Top Text</th>
              <th className="border p-3 text-left">Heading</th>
              <th className="border p-3 text-center">Menus</th>
              <th className="border p-3 text-center">Payments</th>
              <th className="border p-3 text-center">Status</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {footerData.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="p-8 text-center text-gray-500"
                >
                  No Footer CTA Found.
                </td>
              </tr>
            ) : (
              footerData.map((footer) => (
                <tr key={footer._id}>
                  <td className="border p-3">
                    {footer.topText}
                  </td>

                  <td className="border p-3">
                    {footer.heading}
                  </td>

                  <td className="border p-3 text-center">
                    {footer.menus.length}
                  </td>

                  <td className="border p-3 text-center">
                    {footer.paymentMethods.length}
                  </td>

                  <td className="border p-3 text-center">
                    <span
                      className={`rounded px-3 py-1 text-sm font-semibold ${
                        footer.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {footer.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td className="border p-3">
                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/footer-cta/${footer._id}`}
                        className="rounded bg-yellow-500 px-4 py-2 text-white"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(footer._id)
                        }
                        className="rounded bg-red-600 px-4 py-2 text-white"
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