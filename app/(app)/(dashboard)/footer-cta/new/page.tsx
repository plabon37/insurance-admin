import FooterCTAForm from "@/components/dashboard/footer-cta/FooterCTAForm";

export default function NewFooterCTAPage() {
  return (
    <div className=" text-black space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Create Footer CTA
        </h1>

        <p className="mt-2 text-gray-500">
          Create a new Footer CTA section with menus, payment methods and social links.
        </p>
      </div>

      <FooterCTAForm />
    </div>
  );
}