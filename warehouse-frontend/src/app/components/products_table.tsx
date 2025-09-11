"use client";
import { Product } from "../hooks/useProducts";

interface Props {
  products: Product[];
  loading: boolean;
  onUpdateQuantity: (id: number, change: number) => void;
}

export default function ProductsTable({ products, loading, onUpdateQuantity }: Props) {
  if (loading) return <p style={{ padding: 16, color: "#6b7280" }}>Loading...</p>;

  return (
    <div className="table-wrapper">
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
                  <button className="btn-small btn-green" onClick={() => onUpdateQuantity(p.id, 10)}>
                    Import +10
                  </button>
                  <button className="btn-small btn-red" onClick={() => onUpdateQuantity(p.id, -5)}>
                    Export -5
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
