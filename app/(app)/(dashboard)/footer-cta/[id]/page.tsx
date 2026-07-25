import FooterCTAForm from "@/components/dashboard/footer-cta/FooterCTAForm";

interface FooterCTAEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function FooterCTAEditPage({
  params,
}: FooterCTAEditPageProps) {
  const { id } = await params;

  return (
    <div className=" text-black space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Footer CTA
        </h1>

        <p className="mt-2 text-gray-500">
          Update Footer CTA content, footer menus, payment methods and social links.
        </p>
      </div>

      <FooterCTAForm footerId={id} />
    </div>
  );
}