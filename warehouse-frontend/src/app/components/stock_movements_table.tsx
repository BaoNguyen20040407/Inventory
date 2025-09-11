"use client";
import { StockMovement } from "../hooks/useStockMovements";

interface Props {
  movements: StockMovement[];
  loading: boolean;
}

export default function StockMovementsTable({ movements, loading }: Props) {
  if (loading) {
    return <p style={{ padding: 16, color: "#6b7280" }}>Đang tải dữ liệu...</p>;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Mã NX</th>
            <th>Số lượng</th>
            <th>Mã sản phẩm</th>
          </tr>
        </thead>
        <tbody>
          {movements.length === 0 ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center", padding: 20 }}>
                Chưa có dữ liệu nhập / xuất kho
              </td>
            </tr>
          ) : (
            movements.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.quantity}</td>
                <td>{m.id}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
