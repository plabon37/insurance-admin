import { notFound } from "next/navigation";

import CategoryForm from "@/components/dashboard/category/CategoryForm";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditCategoryPage({
  params,
}: PageProps) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/category/${id}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  if (!data.success) {
    notFound();
  }

  return (
    <div className=" text-black space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Category
        </h1>

        <p className="mt-2 text-gray-500">
          Update category information.
        </p>
      </div>

      <CategoryForm category={data.data} />
    </div>
  );
}