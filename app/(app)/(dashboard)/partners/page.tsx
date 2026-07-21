import PartnerTable from "@/components/dashboard/partners/PartnerTable";

export default function PartnersPage() {
  return (
    <div className="text-black space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Partners</h1>

          <p className="mt-2 text-gray-600">
            Manage your trusted partner section and partner logos.
          </p>
        </div>
      </div>

      <PartnerTable />
    </div>
  );
}