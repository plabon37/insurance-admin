import WorkingProcessForm from "@/components/dashboard/working-process/WorkingProcessForm";

interface EditWorkingProcessPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditWorkingProcessPage({
  params,
}: EditWorkingProcessPageProps) {
  const { id } = await params;

  return (
    <div className="text-black space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Edit Working Process
        </h1>

        <p className="mt-2 text-gray-500">
          Update the working process section.
        </p>
      </div>

      <WorkingProcessForm workingProcessId={id} />
    </div>
  );
}