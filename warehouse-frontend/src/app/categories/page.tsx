"use client";

import AppLayout from "../components/layout/app_layout";
import CategoriesTable from "../components/categories_table";
import { useCategories } from "../hooks/useCategories";

export default function CategoriesPage() {
  const categoryHook = useCategories();

  const handleDelete = (id: number) => {
    console.log("delete category:", id);
    // TODO: call API delete
  };

  return (
    <AppLayout active="categories">
      <CategoriesTable
        categories={categoryHook.categories}
        loading={categoryHook.loading}
        onDelete={handleDelete}
      />
    </AppLayout>
  );
}