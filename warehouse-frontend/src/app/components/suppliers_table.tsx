"use client";
import { useState } from "react";
import { Supplier } from "../hooks/useSuppliers";
import { useRouter } from "next/navigation";

interface Props {
  suppliers: Supplier[];
  loading: boolean;
  deleteSupplier: (id: number) => void;
}

export default function SuppliersTable({ suppliers, loading, deleteSupplier }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  if (loading) return <p style={{ padding: 16, color: "#6b7280" }}>Loading...</p>;

  const filteredSuppliers = suppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
    (s.address || "").toLowerCase().includes(search.toLowerCase()) ||
    (s.phone || "").toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if(confirm("Bạn có chắc muốn xóa nhà cung cấp này không?")) {
      deleteSupplier(id);
      alert("Xóa thành công");
    }
  };

  return (
    <div className="table-wrapper">
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, gap: 12}}>
        <input
          type="text"
          placeholder="Tìm kiếm nhà cung cấp..."
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
          onClick={() => router.push("/suppliers/add")}
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
          <span style={{ fontSize: "18px" }}>+</span> Thêm
        </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên NCC</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredSuppliers.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: 20 }}>
                Không có nhà cung cấp
              </td>
            </tr>
          ) : (
            filteredSuppliers.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.address || "-"}</td>
                <td>{s.phone || "-"}</td>
                <td>
                <button 
                  className="btn-small btn-green"
                  onClick={() => router.push(`/suppliers/${s.id}/edit`)}
                >
                  Sửa
                </button>
                <button 
                  className="btn-small btn-red"
                  onClick={() => handleDelete(s.id)}
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
