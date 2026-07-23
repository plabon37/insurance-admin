"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface StepItem {
  image: string;
  stepNumber: number;
  title: string;
  description: string;
  displayOrder: number;
  isActive: boolean;
}

interface WorkingProcess {
  badge: string;
  heading: string;
  description: string;
  backgroundImage: string;
  isActive: boolean;
  steps: StepItem[];
}

interface WorkingProcessFormProps {
  workingProcessId?: string;
}

export default function WorkingProcessForm({
  workingProcessId,
}: WorkingProcessFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<WorkingProcess>({
    badge: "",
    heading: "",
    description: "",
    backgroundImage: "",
    isActive: true,
    steps: [],
  });

  useEffect(() => {
    if (!workingProcessId) return;

    async function fetchWorkingProcess() {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/working-process/${workingProcessId}`
        );

        const data = await res.json();

        if (data.success) {
          setFormData(data.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkingProcess();
  }, [workingProcessId]);

  async function uploadImage(file: File) {
    const imageData = new FormData();

    imageData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: imageData,
    });

    const data = await res.json();

    return data.url;
  }

  async function handleBackgroundUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);

    try {
      const imageUrl = await uploadImage(file);

      setFormData((prev) => ({
        ...prev,
        backgroundImage: imageUrl,
      }));
    } finally {
      setLoading(false);
    }
  }

  async function handleStepImageUpload(
    index: number,
    file: File
  ) {
    setLoading(true);

    try {
      const imageUrl = await uploadImage(file);

      const updatedSteps = [...formData.steps];

      updatedSteps[index].image = imageUrl;

      setFormData((prev) => ({
        ...prev,
        steps: updatedSteps,
      }));
    } finally {
      setLoading(false);
    }
  }
    function addStep() {
    setFormData((prev) => ({
      ...prev,
      steps: [
        ...prev.steps,
        {
          image: "",
          stepNumber: prev.steps.length + 1,
          title: "",
          description: "",
          displayOrder: prev.steps.length + 1,
          isActive: true,
        },
      ],
    }));
  }

  function removeStep(index: number) {
    const updatedSteps = [...formData.steps];

    updatedSteps.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      steps: updatedSteps,
    }));
  }

  function handleStepChange(
    index: number,
    field: keyof StepItem,
    value: string | number | boolean
  ) {
    const updatedSteps = [...formData.steps];

    updatedSteps[index] = {
      ...updatedSteps[index],
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      steps: updatedSteps,
    }));
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(
        workingProcessId
          ? `/api/working-process/${workingProcessId}`
          : "/api/working-process",
        {
          method: workingProcessId ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          workingProcessId
            ? "Working Process Updated Successfully."
            : "Working Process Created Successfully."
        );

        router.push("/working-process");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }
  function duplicateStep(index: number) {
  const updatedSteps = [...formData.steps];

  const step = {
    ...updatedSteps[index],
    stepNumber: updatedSteps.length + 1,
    displayOrder: updatedSteps.length + 1,
  };

  updatedSteps.splice(index + 1, 0, step);

  setFormData((prev) => ({
    ...prev,
    steps: updatedSteps,
  }));
}
function moveStepUp(index: number) {
  if (index === 0) return;

  const updatedSteps = [...formData.steps];

  [updatedSteps[index - 1], updatedSteps[index]] = [
    updatedSteps[index],
    updatedSteps[index - 1],
  ];

  setFormData((prev) => ({
    ...prev,
    steps: updatedSteps,
  }));
}
function moveStepDown(index: number) {
  if (index === formData.steps.length - 1) return;

  const updatedSteps = [...formData.steps];

  [updatedSteps[index], updatedSteps[index + 1]] = [
    updatedSteps[index + 1],
    updatedSteps[index],
  ];

  setFormData((prev) => ({
    ...prev,
    steps: updatedSteps,
  }));
}
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-xl text-black bg-white p-6 shadow"
    >
      <div>
        <label className="mb-2 block font-medium">
          Badge
        </label>

        <input
          type="text"
          value={formData.badge}
          onChange={(e) =>
            setFormData({
              ...formData,
              badge: e.target.value,
            })
          }
          className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          placeholder="Enter badge text"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Heading
        </label>

        <input
          type="text"
          value={formData.heading}
          onChange={(e) =>
            setFormData({
              ...formData,
              heading: e.target.value,
            })
          }
          className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          placeholder="Enter heading"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          rows={4}
          value={formData.description}
          onChange={(e) =>
            setFormData({
              ...formData,
              description: e.target.value,
            })
          }
          className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          placeholder="Enter description"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Background Image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleBackgroundUpload}
          className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
        />

        {formData.backgroundImage && (
          <img
            src={formData.backgroundImage}
            alt="Background"
            className="mt-4 h-40 w-full rounded-lg object-cover"
          />
        )}
      </div>

      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={formData.isActive}
          onChange={(e) =>
            setFormData({
              ...formData,
              isActive: e.target.checked,
            })
          }
        />

        <span>Active Section</span>
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Working Steps
        </h2>

        <button
          type="button"
          onClick={addStep}
          className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
        >
          + Add Step
        </button>
      </div>
            {formData.steps.map((step, index) => (
        <div
          key={index}
          className="space-y-6 rounded-xl border p-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              Step {index + 1}
            </h3>
<div className="flex gap-2">
  <button
    type="button"
    onClick={() => moveStepUp(index)}
    className="rounded bg-gray-600 px-3 py-2 text-white"
  >
    ↑
  </button>

  <button
    type="button"
    onClick={() => moveStepDown(index)}
    className="rounded bg-gray-600 px-3 py-2 text-white"
  >
    ↓
  </button>

  <button
    type="button"
    onClick={() => duplicateStep(index)}
    className="rounded bg-green-600 px-3 py-2 text-white"
  >
    Duplicate
  </button>

  <button
    type="button"
    onClick={() => removeStep(index)}
    className="rounded bg-red-600 px-3 py-2 text-white"
  >
    Delete
  </button>
</div>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Step Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                  handleStepImageUpload(index, file);
                }
              }}
              className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-700"
            />

            {step.image && (
              <img
                src={step.image}
                alt={`Step ${index + 1}`}
                className="mt-4 h-32 w-32 rounded-full border object-cover"
              />
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="mb-2 block font-medium">
                Step Number
              </label>

              <input
                type="number"
                value={step.stepNumber}
                onChange={(e) =>
                  handleStepChange(
                    index,
                    "stepNumber",
                    Number(e.target.value)
                  )
                }
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Display Order
              </label>

              <input
                type="number"
                value={step.displayOrder}
                onChange={(e) =>
                  handleStepChange(
                    index,
                    "displayOrder",
                    Number(e.target.value)
                  )
                }
                className="w-full rounded-lg border p-3"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Step Title
            </label>

            <input
              type="text"
              value={step.title}
              onChange={(e) =>
                handleStepChange(
                  index,
                  "title",
                  e.target.value
                )
              }
              className="w-full rounded-lg border p-3"
              placeholder="Enter step title"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Step Description
            </label>

            <textarea
              rows={4}
              value={step.description}
              onChange={(e) =>
                handleStepChange(
                  index,
                  "description",
                  e.target.value
                )
              }
              className="w-full rounded-lg border p-3"
              placeholder="Enter step description"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={step.isActive}
              onChange={(e) =>
                handleStepChange(
                  index,
                  "isActive",
                  e.target.checked
                )
              }
            />

            <span>Active Step</span>
          </div>
        </div>
      ))}
            <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? "Saving..."
            : workingProcessId
            ? "Update Working Process"
            : "Create Working Process"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/working-process")}
          disabled={loading}
          className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}