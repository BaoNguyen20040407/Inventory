import { useState, useEffect } from "react";

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch loại sản phẩm
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Lỗi fetch categories:", err);
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  // Thêm loại sản phẩm
  const addCategory = async (category: Omit<Category, "id">) => {
    try {
      const res = await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      if (!res.ok) throw new Error("Thêm loại sản phẩm thất bại");
      await fetchCategories();
    } catch (err) {
      console.error(err);
    }
  };

  // Xóa loại sản phẩm
  const deleteCategory = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/categories/${id}`, {
        method: "DELETE",
      });
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, fetchCategories, addCategory, deleteCategory };
}
