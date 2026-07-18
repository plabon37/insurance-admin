import CategoryForm from "@/components/dashboard/category/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className=" text-black space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Add New Category
        </h1>

        <p className="mt-2 text-gray-500">
          Create a new insurance category that will be displayed on your website.
        </p>
      </div>

      {/* Form */}
      <CategoryForm />
    </div>
  );
}