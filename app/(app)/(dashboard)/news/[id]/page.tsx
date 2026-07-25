import NewsForm from "@/components/dashboard/news/NewsForm";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditNewsPage({
  params,
}: PageProps) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Edit News & Events
        </h1>

        <p className="mt-2 text-gray-600">
          Update your News & Events section.
        </p>
      </div>

      <NewsForm newsId={id} />
    </div>
  );
}