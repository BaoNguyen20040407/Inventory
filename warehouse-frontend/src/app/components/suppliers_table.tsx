"use client";
import { Supplier } from "../hooks/useSuppliers";

interface Props {
  suppliers: Supplier[];
  loading: boolean;
}

export default function SuppliersTable({ suppliers, loading }: Props) {
  if (loading) return <p style={{ padding: 16, color: "#6b7280" }}>Loading...</p>;

  return (
    <div className="table-wrapper">
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
          {suppliers.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: "center", padding: 20 }}>
                Không có nhà cung cấp
              </td>
            </tr>
          ) : (
            suppliers.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.address || "-"}</td>
                <td>{s.phone || "-"}</td>
                <td>
                  <button className="btn-small btn-green">Sửa</button>
                  <button className="btn-small btn-red">Xóa</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
