"use client";

import AppLayout from "../components/layout/app_layout";
import CategoriesTable from "../components/categories_table";
import { useCategories } from "../hooks/useCategories";

export default function CategoriesPage() {
  const { categories, loading, deleteCategory } = useCategories();

  return (
    <AppLayout active="categories">
      <CategoriesTable
        categories={categories}
        loading={loading}
        onDelete={deleteCategory}
      />
    </AppLayout>
  );
}