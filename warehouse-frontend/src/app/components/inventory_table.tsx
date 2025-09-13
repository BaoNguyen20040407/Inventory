"use client";
import { useRouter } from "next/navigation";
import { StockMovement } from "../hooks/useInventory";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
}

interface Props {
  movements: StockMovement[];
  products: Product[];
  loading: boolean;
}

export default function StockMovementsTable({ movements, loading, products }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  if (loading) {
    return <p style={{ padding: 16, color: "#6b7280" }}>Đang tải dữ liệu...</p>;
  }

  const filteredInventory = movements.filter((m) =>
    (m.product?.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (m.reason || "").toLowerCase().includes(search.toLowerCase()) ||
    (m.type || "").toLowerCase().includes(search.toLowerCase())
  );  
  
  return (
    <div className="table-wrapper">
      <div style={{display: "flex", justifyContent: "space-between", marginBottom: 12, gap: 12}}>
        <input
          type="text"
          placeholder="Tìm kiếm phiếu nhập/xuất..."
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
          onClick={() => router.push("/inventory/import")}
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
          <span style={{fontSize: "18px"}}>+</span> Nhập hàng
        </button>

        <button
          onClick={() => router.push("/inventory/export")}
          style={{
            backgroundColor: "red",
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
          <span style={{fontSize: "18px"}}>-</span> Xuất hàng
        </button>

        <button
          onClick={() => router.push("/inventory/stats")}
          style={{
            backgroundColor: "#2563eb",
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
          📊 Xem thống kê
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Mã phiếu</th>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Loại</th>
            <th>Lý do</th>
            <th>Ngày giờ</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: 20 }}>
                Chưa có dữ liệu nhập / xuất kho
              </td>
            </tr>
          ) : (
            filteredInventory.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.product?.name || "-"}</td>
                <td>{m.quantity}</td>
                <td>{m.type === "Import" ? "Nhập" : "Xuất"}</td>
                <td>{m.reason || "-"}</td>
                <td>{new Date(m.created).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
