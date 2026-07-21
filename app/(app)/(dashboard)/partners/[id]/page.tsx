import PartnerForm from "@/components/dashboard/partners/PartnerForm";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditPartnerPage({
  params,
}: PageProps) {
  const { id } = await params;

  return (
    <div className="text-blackspace-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Partner Section
        </h1>

        <p className="mt-2 text-gray-600">
          Update the partner section information and manage partner logos.
        </p>
      </div>

      <PartnerForm partnerId={id} />
    </div>
  );
}