"use client";

import { useActionState, useEffect, useState } from "react";
import { createJob, type CreateJobState } from "@/lib/actions/jobs";
import { createClient } from "@/lib/supabase/client";

type Category = { id: string; name: string; slug: string; icon: string | null };
type Province = { id: string; name: string; code: string };
type District = { id: string; name: string };

export function JobPostingForm({
  categories,
  provinces,
}: {
  categories: Category[];
  provinces: Province[];
}) {
  const [state, formAction, pending] = useActionState<CreateJobState, FormData>(
    createJob,
    {}
  );
  const [step, setStep] = useState(1);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [districts, setDistricts] = useState<District[]>([]);
  const [loadingDistricts, setLoadingDistricts] = useState(false);

  useEffect(() => {
    if (!selectedProvince) {
      setDistricts([]);
      return;
    }

    setLoadingDistricts(true);
    const supabase = createClient();
    supabase
      .from("districts")
      .select("id, name")
      .eq("province_id", selectedProvince)
      .order("name")
      .then(({ data }) => {
        setDistricts(data ?? []);
        setLoadingDistricts(false);
      });
  }, [selectedProvince]);

  return (
    <form action={formAction}>
      {state.message && (
        <div className="mb-4 rounded-md bg-danger-light border border-danger/20 px-4 py-3 text-sm text-danger">
          {state.message}
        </div>
      )}

      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
                step >= s
                  ? "bg-primary text-white"
                  : "bg-surface text-text-muted"
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`h-0.5 w-8 ${
                  step > s ? "bg-primary" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
        <span className="ml-2 text-sm text-text-secondary">
          {step === 1 && "Describe your job"}
          {step === 2 && "Location & category"}
          {step === 3 && "Set your budget"}
        </span>
      </div>

      {/* Step 1: Describe */}
      <div className={step === 1 ? "block" : "hidden"}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-text"
            >
              Job title
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              className="mt-1 block w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="e.g. Paint my house exterior"
            />
            {state.errors?.title && (
              <p className="mt-1 text-sm text-danger">
                {state.errors.title[0]}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-text"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={5}
              required
              className="mt-1 block w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              placeholder="Describe the job in detail. Include size, materials needed, timeframe, etc."
            />
            {state.errors?.description && (
              <p className="mt-1 text-sm text-danger">
                {state.errors.description[0]}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="rounded-md bg-primary px-6 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* Step 2: Category & Location */}
      <div className={step === 2 ? "block" : "hidden"}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="category_id"
              className="block text-sm font-medium text-text"
            >
              Category
            </label>
            <select
              id="category_id"
              name="category_id"
              required
              className="mt-1 block w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.icon} {cat.name}
                </option>
              ))}
            </select>
            {state.errors?.category_id && (
              <p className="mt-1 text-sm text-danger">
                {state.errors.category_id[0]}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="province_id"
              className="block text-sm font-medium text-text"
            >
              Province
            </label>
            <select
              id="province_id"
              name="province_id"
              required
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              className="mt-1 block w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">Select a province</option>
              {provinces.map((prov) => (
                <option key={prov.id} value={prov.id}>
                  {prov.name}
                </option>
              ))}
            </select>
            {state.errors?.province_id && (
              <p className="mt-1 text-sm text-danger">
                {state.errors.province_id[0]}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="district_id"
              className="block text-sm font-medium text-text"
            >
              District{" "}
              <span className="text-text-muted">(optional)</span>
            </label>
            <select
              id="district_id"
              name="district_id"
              disabled={!selectedProvince || loadingDistricts}
              className="mt-1 block w-full rounded-md border border-border bg-bg px-3 py-2 text-sm text-text focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
            >
              <option value="">
                {loadingDistricts
                  ? "Loading districts..."
                  : "Select a district"}
              </option>
              {districts.map((dist) => (
                <option key={dist.id} value={dist.id}>
                  {dist.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="rounded-md border border-border px-6 py-2 text-sm font-medium text-text-secondary hover:bg-surface transition-colors"
          >
            Back
          </button>
          <button
            type="button"
            onClick={() => setStep(3)}
            className="rounded-md bg-primary px-6 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* Step 3: Budget */}
      <div className={step === 3 ? "block" : "hidden"}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="fixed_price"
              className="block text-sm font-medium text-text"
            >
              Your budget (PGK)
            </label>
            <div className="mt-1 relative">
              <span className="absolute left-3 top-2 text-sm text-text-muted">
                K
              </span>
              <input
                id="fixed_price"
                name="fixed_price"
                type="number"
                step="0.01"
                min="1"
                required
                className="block w-full rounded-md border border-border bg-bg pl-8 pr-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="0.00"
              />
            </div>
            {state.errors?.fixed_price && (
              <p className="mt-1 text-sm text-danger">
                {state.errors.fixed_price[0]}
              </p>
            )}
            <p className="mt-2 text-xs text-text-muted">
              A 25% commission will apply. Taskers will see your listed price.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-between">
          <button
            type="button"
            onClick={() => setStep(2)}
            className="rounded-md border border-border px-6 py-2 text-sm font-medium text-text-secondary hover:bg-surface transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={pending}
            className="rounded-md bg-primary px-8 py-2 text-sm font-semibold text-white hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {pending ? "Publishing..." : "Publish Job"}
          </button>
        </div>
      </div>
    </form>
  );
}
