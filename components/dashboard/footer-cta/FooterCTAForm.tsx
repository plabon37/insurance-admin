"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface MenuItem {
  title: string;
  link: string;
  displayOrder: number;
  isActive: boolean;
}

interface PaymentMethod {
  image: string;
  name: string;
  link: string;
  displayOrder: number;
  isActive: boolean;
}

interface FooterCTA {
  topText: string;
  heading: string;
  buttonText: string;
  buttonLink: string;
  officeTime: string;
  paymentTitle: string;

  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;

  isActive: boolean;

  menus: MenuItem[];
  paymentMethods: PaymentMethod[];
}

interface FooterCTAFormProps {
  footerId?: string;
}

export default function FooterCTAForm({
  footerId,
}: FooterCTAFormProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] =
    useState<FooterCTA>({
      topText: "",
      heading: "",
      buttonText: "",
      buttonLink: "",
      officeTime: "",
      paymentTitle: "",

      facebook: "",
      twitter: "",
      instagram: "",
      linkedin: "",

      isActive: true,

      menus: [],

      paymentMethods: [],
    });

  useEffect(() => {
    if (!footerId) return;

    async function fetchFooter() {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/footer-cta/${footerId}`
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

    fetchFooter();
  }, [footerId]);

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

  async function handlePaymentImageUpload(
    index: number,
    file: File
  ) {
    setLoading(true);

    try {
      const imageUrl = await uploadImage(file);

      const updated = [...formData.paymentMethods];

      updated[index].image = imageUrl;

      setFormData((prev) => ({
        ...prev,
        paymentMethods: updated,
      }));
    } finally {
      setLoading(false);
    }
  }
    function addMenu() {
    setFormData((prev) => ({
      ...prev,
      menus: [
        ...prev.menus,
        {
          title: "",
          link: "",
          displayOrder: prev.menus.length + 1,
          isActive: true,
        },
      ],
    }));
  }

  function removeMenu(index: number) {
    const updated = [...formData.menus];

    updated.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      menus: updated,
    }));
  }

  function duplicateMenu(index: number) {
    const updated = [...formData.menus];

    updated.splice(index + 1, 0, {
      ...updated[index],
      displayOrder: updated.length + 1,
    });

    setFormData((prev) => ({
      ...prev,
      menus: updated,
    }));
  }

  function moveMenuUp(index: number) {
    if (index === 0) return;

    const updated = [...formData.menus];

    [updated[index], updated[index - 1]] = [
      updated[index - 1],
      updated[index],
    ];

    setFormData((prev) => ({
      ...prev,
      menus: updated,
    }));
  }

  function moveMenuDown(index: number) {
    if (index === formData.menus.length - 1)
      return;

    const updated = [...formData.menus];

    [updated[index], updated[index + 1]] = [
      updated[index + 1],
      updated[index],
    ];

    setFormData((prev) => ({
      ...prev,
      menus: updated,
    }));
  }

  function handleMenuChange(
    index: number,
    field: keyof MenuItem,
    value: string | number | boolean
  ) {
    const updated = [...formData.menus];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      menus: updated,
    }));
  }

  function addPaymentMethod() {
    setFormData((prev) => ({
      ...prev,
      paymentMethods: [
        ...prev.paymentMethods,
        {
          image: "",
          name: "",
          link: "#",
          displayOrder:
            prev.paymentMethods.length + 1,
          isActive: true,
        },
      ],
    }));
  }

  function removePaymentMethod(index: number) {
    const updated = [...formData.paymentMethods];

    updated.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      paymentMethods: updated,
    }));
  }

  function duplicatePaymentMethod(
    index: number
  ) {
    const updated = [...formData.paymentMethods];

    updated.splice(index + 1, 0, {
      ...updated[index],
      displayOrder: updated.length + 1,
    });

    setFormData((prev) => ({
      ...prev,
      paymentMethods: updated,
    }));
  }

  function movePaymentUp(index: number) {
    if (index === 0) return;

    const updated = [...formData.paymentMethods];

    [updated[index], updated[index - 1]] = [
      updated[index - 1],
      updated[index],
    ];

    setFormData((prev) => ({
      ...prev,
      paymentMethods: updated,
    }));
  }

  function movePaymentDown(index: number) {
    if (
      index ===
      formData.paymentMethods.length - 1
    )
      return;

    const updated = [...formData.paymentMethods];

    [updated[index], updated[index + 1]] = [
      updated[index + 1],
      updated[index],
    ];

    setFormData((prev) => ({
      ...prev,
      paymentMethods: updated,
    }));
  }

  function handlePaymentChange(
    index: number,
    field: keyof PaymentMethod,
    value: string | number | boolean
  ) {
    const updated = [...formData.paymentMethods];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      paymentMethods: updated,
    }));
  }
    async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await fetch(
        footerId
          ? `/api/footer-cta/${footerId}`
          : "/api/footer-cta",
        {
          method: footerId ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert(
          footerId
            ? "Footer CTA updated successfully."
            : "Footer CTA created successfully."
        );

        router.push("/dashboard/footer-cta");
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

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 rounded-xl bg-white p-6 shadow"
    >
      <div className="grid gap-6 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Top Text
          </label>

          <input
            type="text"
            value={formData.topText}
            onChange={(e) =>
              setFormData({
                ...formData,
                topText: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
            placeholder="Are You Ready?"
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
            className="w-full rounded-lg border p-3"
            placeholder="Get Your Insurance Now!"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Button Text
          </label>

          <input
            type="text"
            value={formData.buttonText}
            onChange={(e) =>
              setFormData({
                ...formData,
                buttonText: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
            placeholder="Buy Now"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Button Link
          </label>

          <input
            type="text"
            value={formData.buttonLink}
            onChange={(e) =>
              setFormData({
                ...formData,
                buttonLink: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
            placeholder="/contact"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Office Time
          </label>

          <input
            type="text"
            value={formData.officeTime}
            onChange={(e) =>
              setFormData({
                ...formData,
                officeTime: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
            placeholder="Sunday - Thursday : 10 AM - 6 PM"
            required
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Payment Title
          </label>

          <input
            type="text"
            value={formData.paymentTitle}
            onChange={(e) =>
              setFormData({
                ...formData,
                paymentTitle: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
            placeholder="Payment Channels"
            required
          />
        </div>

      </div>

      <div>
        <h2 className="mb-4 text-xl font-bold">
          Social Links
        </h2>

        <div className="grid gap-6 md:grid-cols-2">

          <input
            type="text"
            value={formData.facebook}
            placeholder="Facebook URL"
            onChange={(e) =>
              setFormData({
                ...formData,
                facebook: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />

          <input
            type="text"
            value={formData.twitter}
            placeholder="Twitter URL"
            onChange={(e) =>
              setFormData({
                ...formData,
                twitter: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />

          <input
            type="text"
            value={formData.instagram}
            placeholder="Instagram URL"
            onChange={(e) =>
              setFormData({
                ...formData,
                instagram: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />

          <input
            type="text"
            value={formData.linkedin}
            placeholder="LinkedIn URL"
            onChange={(e) =>
              setFormData({
                ...formData,
                linkedin: e.target.value,
              })
            }
            className="rounded-lg border p-3"
          />

        </div>
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

        <span>Active Footer CTA</span>
      </div>
            {/* Footer Menus */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Footer Menus</h2>

          <button
            type="button"
            onClick={addMenu}
            className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white"
          >
            + Add Menu
          </button>
        </div>

        {formData.menus.map((menu, index) => (
          <div
            key={index}
            className="space-y-4 rounded-xl border p-5"
          >
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => moveMenuUp(index)}
                className="rounded bg-gray-700 px-3 py-2 text-white"
              >
                ↑
              </button>

              <button
                type="button"
                onClick={() => moveMenuDown(index)}
                className="rounded bg-gray-700 px-3 py-2 text-white"
              >
                ↓
              </button>

              <button
                type="button"
                onClick={() => duplicateMenu(index)}
                className="rounded bg-green-600 px-3 py-2 text-white"
              >
                Duplicate
              </button>

              <button
                type="button"
                onClick={() => removeMenu(index)}
                className="rounded bg-red-600 px-3 py-2 text-white"
              >
                Delete
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Menu Title"
                value={menu.title}
                onChange={(e) =>
                  handleMenuChange(
                    index,
                    "title",
                    e.target.value
                  )
                }
                className="rounded-lg border p-3"
              />

              <input
                type="text"
                placeholder="Menu Link"
                value={menu.link}
                onChange={(e) =>
                  handleMenuChange(
                    index,
                    "link",
                    e.target.value
                  )
                }
                className="rounded-lg border p-3"
              />

              <input
                type="number"
                value={menu.displayOrder}
                onChange={(e) =>
                  handleMenuChange(
                    index,
                    "displayOrder",
                    Number(e.target.value)
                  )
                }
                className="rounded-lg border p-3"
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={menu.isActive}
                  onChange={(e) =>
                    handleMenuChange(
                      index,
                      "isActive",
                      e.target.checked
                    )
                  }
                />
                Active
              </label>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Methods */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">
            Payment Methods
          </h2>

          <button
            type="button"
            onClick={addPaymentMethod}
            className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white"
          >
            + Add Payment
          </button>
        </div>

        {formData.paymentMethods.map(
          (payment, index) => (
            <div
              key={index}
              className="space-y-5 rounded-xl border p-5"
            >
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    movePaymentUp(index)
                  }
                  className="rounded bg-gray-700 px-3 py-2 text-white"
                >
                  ↑
                </button>

                <button
                  type="button"
                  onClick={() =>
                    movePaymentDown(index)
                  }
                  className="rounded bg-gray-700 px-3 py-2 text-white"
                >
                  ↓
                </button>

                <button
                  type="button"
                  onClick={() =>
                    duplicatePaymentMethod(index)
                  }
                  className="rounded bg-green-600 px-3 py-2 text-white"
                >
                  Duplicate
                </button>

                <button
                  type="button"
                  onClick={() =>
                    removePaymentMethod(index)
                  }
                  className="rounded bg-red-600 px-3 py-2 text-white"
                >
                  Delete
                </button>
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file =
                    e.target.files?.[0];

                  if (file) {
                    handlePaymentImageUpload(
                      index,
                      file
                    );
                  }
                }}
              />

              {payment.image && (
                <img
                  src={payment.image}
                  alt={payment.name}
                  className="h-16 rounded border"
                />
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  placeholder="Payment Name"
                  value={payment.name}
                  onChange={(e) =>
                    handlePaymentChange(
                      index,
                      "name",
                      e.target.value
                    )
                  }
                  className="rounded-lg border p-3"
                />

                <input
                  type="text"
                  placeholder="Payment Link"
                  value={payment.link}
                  onChange={(e) =>
                    handlePaymentChange(
                      index,
                      "link",
                      e.target.value
                    )
                  }
                  className="rounded-lg border p-3"
                />

                <input
                  type="number"
                  value={payment.displayOrder}
                  onChange={(e) =>
                    handlePaymentChange(
                      index,
                      "displayOrder",
                      Number(e.target.value)
                    )
                  }
                  className="rounded-lg border p-3"
                />

                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={payment.isActive}
                    onChange={(e) =>
                      handlePaymentChange(
                        index,
                        "isActive",
                        e.target.checked
                      )
                    }
                  />
                  Active
                </label>
              </div>
            </div>
          )
        )}
      </div>

      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white"
        >
          {loading
            ? "Saving..."
            : footerId
            ? "Update Footer CTA"
            : "Create Footer CTA"}
        </button>

        <button
          type="button"
          onClick={() =>
            router.push("/dashboard/footer-cta")
          }
          className="rounded-lg border px-6 py-3"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}