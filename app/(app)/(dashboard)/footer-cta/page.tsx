import FooterCTATable from "@/components/dashboard/footer-cta/FooterCTATable";

export default function FooterCTAPage() {
  return (
    <div className=" text-black space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Footer CTA
        </h1>

        <p className="mt-2 text-gray-500">
          Manage Footer CTA content, footer menus and payment methods.
        </p>
      </div>

      <FooterCTATable />
    </div>
  );
}