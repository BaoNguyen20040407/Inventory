import { useState, useEffect } from "react";

export interface StockMovement {
  id: number;       // MaNX
  quantity: number; // SoLuong
  productId: number; // MaSP
}

export function useStockMovements() {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);

  // 📌 Fetch danh sách nhập/xuất kho
  const fetchMovements = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/stock-movements");
      const data = await res.json();
      setMovements(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Lỗi fetch stock movements:", err);
      setMovements([]);
    } finally {
      setLoading(false);
    }
  };

  // 📌 Thêm phiếu nhập/xuất kho
  const addMovement = async (movement: Omit<StockMovement, "id">) => {
    try {
      const res = await fetch("http://localhost:3000/stock-movements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movement),
      });
      if (!res.ok) throw new Error("Thêm nhập/xuất kho thất bại");
      await fetchMovements();
    } catch (err) {
      console.error(err);
    }
  };

  // 📌 Xóa phiếu nhập/xuất kho
  const deleteMovement = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/stock-movements/${id}`, {
        method: "DELETE",
      });
      setMovements((prev) => prev.filter((m) => m.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovements();
  }, []);

  return { movements, loading, fetchMovements, addMovement, deleteMovement };
}
