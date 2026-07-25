import NewsTable from "@/components/dashboard/news/NewsTable";

export default function NewsPage() {
  return (
    <div className=" text-black space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          News & Events
        </h1>

        <p className="mt-2 text-gray-600">
          Manage your News & Events section.
        </p>
      </div>

      <NewsTable />
    </div>
  );
}