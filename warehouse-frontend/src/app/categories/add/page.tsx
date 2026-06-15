"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/app/components/layout/app_header";

export default function AddCategoryPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Lưu loại sản phẩm thất bại: ${res.status} - ${errorText}`);
      }

      router.push("/categories");
      router.refresh(); // ✅ reload data
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi lưu");
    }
  };

  return (
    <div className="app-container">
      <AppHeader title ="📦 Thêm Loại sản phẩm"/>

      <main className="right-panel">
        <div className="table-card">
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Tên loại sản phẩm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
            />
            <input
              type="text"
              placeholder="Mô tả"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-input"
            />

            <div className="form-actions">
              <button type="submit" className="btn btn-green">
                Lưu
              </button>
              <button
                type="button"
                className="btn btn-gray"
                onClick={() => router.push("/categories")}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
