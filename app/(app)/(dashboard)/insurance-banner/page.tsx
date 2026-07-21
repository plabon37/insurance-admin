import Link from "next/link";

import { connectToDB } from "@/lib/connectToDB";
import InsuranceBanner from "@/lib/models/InsuranceBanner";

import InsuranceBannerTable from "@/components/dashboard/insurance-banner/InsuranceBannerTable";

export default async function InsuranceBannerPage() {
  await connectToDB();

  const banners = await InsuranceBanner.find().sort({
    displayOrder: 1,
    createdAt: -1,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Insurance Banner
          </h1>

          <p className="text-gray-500">
            Manage Insurance Banner Section
          </p>
        </div>

        <Link
          href="/insurance-banner/new"
          className="rounded-lg bg-black px-5 py-3 text-white"
        >
          + Add Banner
        </Link>
      </div>

      <InsuranceBannerTable
        banners={JSON.parse(JSON.stringify(banners))}
      />
    </div>
  );
}