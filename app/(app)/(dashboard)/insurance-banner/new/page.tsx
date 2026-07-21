import InsuranceBannerForm from "@/components/dashboard/insurance-banner/InsuranceBannerForm";

export default function NewInsuranceBannerPage() {
  return (
    <div className="max-w-5xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          Create Insurance Banner
        </h1>

        <p className="mt-2 text-gray-500">
          Add a new Insurance Banner for your website.
        </p>
      </div>

      <InsuranceBannerForm />
    </div>
  );
}