"use client";
import { useRouter } from "next/navigation";
import { Category } from "../hooks/useCategories";
import { useState } from "react";

interface Props {
  categories: Category[];
  loading: boolean;
  onDelete: (id: number) => void;
}

export default function CategoriesTable({ categories, loading, onDelete }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  if (loading) return <p style={{ padding: 16, color: "#6b7280" }}>Loading...</p>;

  const filteredCategories = categories.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
    (s.description || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if(confirm("Bạn có chắc chắn muốn xóa loại sản phẩm này không?")) {
      onDelete(id);
      alert("Xóa thành công");
    }
  }

  return (
    <div className="table-wrapper">
      <div style={{display: "flex", justifyContent: "space-between", marginBottom: 12, gap: 12}}>
        <input
          type="text"
          placeholder="Tìm kiếm loại sản phẩm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />
        
        <button
          onClick={() => router.push("/categories/add")}
          style={{
            backgroundColor: "green",
            color: "white",
            fontWeight: "bold",
            padding: "8px 14px",
            borderRadius: "6px",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
          }}
        >
          <span style={{fontSize: "18px"}}>+</span> Thêm
        </button>

      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên loại</th>
            <th>Mô tả</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredCategories.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: 20 }}>
                Không có loại sản phẩm
              </td>
            </tr>
          ) : (
            filteredCategories.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.description || "-"}</td>
                <td>
                  <button
                    className="btn-small btn-green"
                    onClick={() => router.push(`/categories/${c.id}/edit`)}
                    >
                      Sửa
                  </button>
                  <button
                    className="btn-small btn-red"
                    onClick={() => handleDelete(c.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
