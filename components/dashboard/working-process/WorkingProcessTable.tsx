"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface StepItem {
  image: string;
  stepNumber: number;
  title: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
}

interface WorkingProcess {
  _id: string;
  badge: string;
  heading: string;
  description: string;
  backgroundImage: string;
  isActive: boolean;
  steps: StepItem[];
}

export default function WorkingProcessTable() {
  const [workingProcesses, setWorkingProcesses] = useState<
    WorkingProcess[]
  >([]);

  const [loading, setLoading] = useState(true);

  async function fetchWorkingProcesses() {
    try {
      setLoading(true);

      const res = await fetch("/api/working-process");

      const data = await res.json();

      if (data.success) {
        setWorkingProcesses(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

 useEffect(() => {
  let ignore = false;

  async function loadData() {
    try {
      setLoading(true);

      const res = await fetch("/api/working-process");

      const data = await res.json();

      if (!ignore && data.success) {
        setWorkingProcesses(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      if (!ignore) {
        setLoading(false);
      }
    }
  }

  loadData();

  return () => {
    ignore = true;
  };
}, []);

  async function handleDelete(id: string) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this working process?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/working-process/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        fetchWorkingProcesses();
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Working Process
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your working process section.
          </p>
        </div>

        <Link
          href="/working-process/new"
          className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
        >
          + Create New
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl bg-white shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-4 text-left">
                Background
              </th>

              <th className="px-5 py-4 text-left">
                Badge
              </th>

              <th className="px-5 py-4 text-left">
                Heading
              </th>

              <th className="px-5 py-4 text-center">
                Steps
              </th>

              <th className="px-5 py-4 text-center">
                Status
              </th>

              <th className="px-5 py-4 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {workingProcesses.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-8 text-center text-gray-500"
                >
                  No Working Process Found.
                </td>
              </tr>
            ) : (
              workingProcesses.map((item) => (
                <tr
                  key={item._id}
                  className="border-t"
                >
                  <td className="px-5 py-4">
                    {item.backgroundImage ? (
                      <img
                        src={item.backgroundImage}
                        alt={item.heading}
                        className="h-16 w-24 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="flex h-16 w-24 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
                        No Image
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    {item.badge}
                  </td>

                  <td className="px-5 py-4 font-medium">
                    {item.heading}
                  </td>

                  <td className="px-5 py-4 text-center">
                    {item.steps.length}
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        item.isActive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.isActive
                        ? "Active"
                        : "Inactive"}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center gap-3">
                      <Link
                        href={`/working-process/edit/${item._id}`}
                        className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-600"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(item._id)
                        }
                        className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
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