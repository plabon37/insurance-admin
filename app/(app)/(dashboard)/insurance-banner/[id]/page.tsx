import { notFound } from "next/navigation";

import { connectToDB } from "@/lib/connectToDB";
import InsuranceBanner from "@/lib/models/InsuranceBanner";

import InsuranceBannerForm from "@/components/dashboard/insurance-banner/InsuranceBannerForm";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditInsuranceBannerPage({
  params,
}: Props) {
  await connectToDB();

  const { id } = await params;

  const banner = await InsuranceBanner.findById(id).lean();

  if (!banner) {
    notFound();
  }

  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Edit Insurance Banner
        </h1>

        <p className="mt-2 text-gray-500">
          Update your Insurance Banner information.
        </p>
      </div>

      <InsuranceBannerForm
        banner={JSON.parse(JSON.stringify(banner))}
      />
    </div>
  );
}