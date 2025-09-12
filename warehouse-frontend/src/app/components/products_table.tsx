"use client";
import { useState } from "react";
import { Product } from "../hooks/useProducts";
import { useRouter } from "next/navigation";

interface Props {
  products: Product[];
  loading: boolean;
  onUpdateQuantity: (id: number, change: number) => void;
}

export default function ProductsTable({ products, loading, onUpdateQuantity }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  if (loading) return <p style={{ padding: 16, color: "#6b7280" }}>Loading...</p>;

  const filteredProducts = products.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
    (s.category?.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (s.supplier?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="table-wrapper">

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, gap: 12}}>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
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
          onClick={() => router.push("/products/add")}
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
            <th>Tên sản phẩm</th>
            <th>Số lượng</th>
            <th>Đơn giá</th>
            <th>Loại</th>
            <th>Nhà cung cấp</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: "center", padding: 20 }}>
                Không có sản phẩm
              </td>
            </tr>
          ) : (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.quantity}</td>
                <td>{Number(p.price).toLocaleString("vi-VN", { maximumFractionDigits: 0 })} VND</td>
                <td>{p.category?.name || "-"}</td>
                <td>{p.supplier?.name || "-"}</td>
                <td>
                <button 
                  className="btn-small btn-green"
                  onClick={() => router.push(`/products/${p.id}/edit`)}
                >
                  Sửa
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
