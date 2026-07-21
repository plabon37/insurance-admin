import PartnerForm from "@/components/dashboard/partners/PartnerForm";

export default function NewPartnerPage() {
  return (
    <div className="text-blackspace-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Add New Partner Section
        </h1>

        <p className="mt-2 text-gray-600">
          Create a new partners section and add multiple partner logos.
        </p>
      </div>

      <PartnerForm />
    </div>
  );
}