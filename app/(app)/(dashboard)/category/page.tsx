import Link from "next/link";
import { Plus } from "lucide-react";

import CategoryTable from "@/components/dashboard/category/CategoryTable";

export default function CategoryPage() {
  return (
    <div className=" text-black space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Category Management
          </h1>

          <p className="mt-1 text-gray-500">
            Manage all insurance categories.
          </p>
        </div>

        <Link
          href="/category/new"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Category
        </Link>

      </div>

      {/* Table */}

      <CategoryTable />

    </div>
  );
}