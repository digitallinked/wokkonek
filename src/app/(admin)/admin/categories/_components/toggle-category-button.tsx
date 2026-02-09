"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toggleCategory } from "@/lib/actions/admin";

export function ToggleCategoryButton({
  categoryId,
  isActive,
}: {
  categoryId: string;
  isActive: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleToggle() {
    setLoading(true);
    const result = await toggleCategory(categoryId, !isActive);

    if (result.error) {
      alert(result.error);
    }

    setLoading(false);
    router.refresh();
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`text-xs font-medium px-3 py-1 rounded-md transition-colors disabled:opacity-50 ${
        isActive
          ? "text-danger hover:bg-danger-light"
          : "text-success hover:bg-success-light"
      }`}
    >
      {loading ? "..." : isActive ? "Disable" : "Enable"}
    </button>
  );
}
