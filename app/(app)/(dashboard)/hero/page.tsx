import Link from "next/link";
import HeroTable from "@/components/dashboard/hero/HeroTable";

export default function HeroPage() {
  return (
    <div className=" text-blackspace-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl text-black font-bold">
            Hero Management
          </h1>

          <p className="text-gray-500">
            Manage homepage hero section.
          </p>
        </div>

        <Link
          href="/hero/new"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          + Add Hero
        </Link>
      </div>

      <HeroTable />
    </div>
  );
}