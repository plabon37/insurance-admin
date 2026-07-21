"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface LogoItem {
  image: string;
  websiteUrl: string;
  displayOrder: number;
  isActive: boolean;
}

interface PartnerFormProps {
  partnerId?: string;
}

export default function PartnerForm({
  partnerId,
}: PartnerFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  const [heading, setHeading] = useState("");

  const [logos, setLogos] = useState<LogoItem[]>([
    {
      image: "",
      websiteUrl: "",
      displayOrder: 1,
      isActive: true,
    },
  ]);

  useEffect(() => {
    if (!partnerId) return;

    async function loadPartner() {
      try {
        setFetching(true);

        const res = await fetch(`/api/partners/${partnerId}`);
        const data = await res.json();

        if (data.success) {
          setHeading(data.data.heading);

          if (data.data.logos?.length) {
            setLogos(data.data.logos);
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        setFetching(false);
      }
    }

    loadPartner();
  }, [partnerId]);

  async function handleImageUpload(
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        const updated = [...logos];

        updated[index].image = data.url;

        setLogos(updated);
      }
    } catch (error) {
      console.error(error);
    }
  }
    function addLogo() {
    setLogos((prev) => [
      ...prev,
      {
        image: "",
        websiteUrl: "",
        displayOrder: prev.length + 1,
        isActive: true,
      },
    ]);
  }

  function removeLogo(index: number) {
    const updated = logos.filter((_, i) => i !== index);
    setLogos(updated);
  }

  function handleLogoChange(
    index: number,
    field: keyof LogoItem,
    value: string | number | boolean
  ) {
    const updated = [...logos];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setLogos(updated);
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        heading,
        logos,
      };

      const response = await fetch(
        partnerId
          ? `/api/partners/${partnerId}`
          : "/api/partners",
        {
          method: partnerId ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(
          partnerId
            ? "Partner updated successfully."
            : "Partner created successfully."
        );

        router.push("/partners");
        router.refresh();
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

  if (fetching) {
    return (
      <div className="flex h-40 items-center justify-center text-lg font-medium">
        Loading...
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-xl text-black bg-white p-6 shadow"
    >
      <div>
        <label className="mb-2 block font-semibold">
          Heading
        </label>

        <input
          type="text"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="w-full rounded-lg border p-3 outline-none"
          placeholder="OUR GENUINE TRUSTED PARTNERS & CLIENTS"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">
          Partner Logos
        </h2>

        <button
          type="button"
          onClick={addLogo}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white"
        >
          + Add Logo
        </button>
      </div>
            <div className="space-y-6">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="rounded-xl border p-6 space-y-5"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">
                Logo #{index + 1}
              </h3>

              {logos.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeLogo(index)}
                  className="rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Logo Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  handleImageUpload(index, e)
                }
                className="w-full rounded-lg border p-3"
              />

              {logo.image && (
                <img
                  src={logo.image}
                  alt="Logo Preview"
                  className="mt-4 h-20 w-auto rounded-lg border object-contain"
                />
              )}
            </div>

            <div>
              <label className="mb-2 block font-medium">
                Website URL
              </label>

              <input
                type="url"
                value={logo.websiteUrl}
                onChange={(e) =>
                  handleLogoChange(
                    index,
                    "websiteUrl",
                    e.target.value
                  )
                }
                placeholder="https://example.com"
                className="w-full rounded-lg border p-3"
              />
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block font-medium">
                  Display Order
                </label>

                <input
                  type="number"
                  min={1}
                  value={logo.displayOrder}
                  onChange={(e) =>
                    handleLogoChange(
                      index,
                      "displayOrder",
                      Number(e.target.value)
                    )
                  }
                  className="w-full rounded-lg border p-3"
                />
              </div>

              <div className="flex items-center gap-3 pt-8">
                <input
                  type="checkbox"
                  checked={logo.isActive}
                  onChange={(e) =>
                    handleLogoChange(
                      index,
                      "isActive",
                      e.target.checked
                    )
                  }
                  className="h-5 w-5"
                />

                <label className="font-medium">
                  Active
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
            <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? partnerId
              ? "Updating..."
              : "Creating..."
            : partnerId
            ? "Update Partner"
            : "Create Partner"}
        </button>

        <button
          type="button"
          onClick={() => router.push("/partners")}
          className="rounded-lg border border-gray-300 px-6 py-3 font-semibold transition hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}