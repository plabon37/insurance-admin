import WorkingProcessForm from "@/components/dashboard/working-process/WorkingProcessForm";

export default function NewWorkingProcessPage() {
  return (
    <div className="text-black space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Create Working Process
        </h1>

        <p className="mt-2 text-gray-500">
          Add a new working process section.
        </p>
      </div>

      <WorkingProcessForm />
    </div>
  );
}