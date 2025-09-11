"use client";
import { Category } from "../hooks/useCategories";

interface Props {
  categories: Category[];
  loading: boolean;
  onDelete: (id: number) => void;
}

export default function CategoriesTable({ categories, loading, onDelete }: Props) {
  if (loading) return <p style={{ padding: 16, color: "#6b7280" }}>Loading...</p>;

  return (
    <div className="table-wrapper">
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
          {categories.length === 0 ? (
            <tr>
              <td colSpan={4} style={{ textAlign: "center", padding: 20 }}>
                Không có loại sản phẩm
              </td>
            </tr>
          ) : (
            categories.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.name}</td>
                <td>{c.description || "-"}</td>
                <td>
                  <button
                    className="btn-small btn-red"
                    onClick={() => onDelete(c.id)}
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
