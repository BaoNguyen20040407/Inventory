import { useState, useEffect } from "react";
import { Product } from './useProducts';

export interface StockMovement {
  id: number;
  quantity: number;
  type: "Import" | "Export";
  reason?: string;
  created: string;
  product: Product; // Thêm dòng này
}

export function useStockMovements() {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);

  // 📌 Fetch danh sách nhập/xuất kho
  const fetchMovements = async () => {
    try {
      setLoading(true);
  
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/inventory`
      );
  
      const data = await res.json();
      setMovements(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Lỗi fetch stock movements:", err);
      setMovements([]);
    } finally {
      setLoading(false);
    }
  };

  // Thêm phiếu nhập/xuất kho
  const addMovement = async (
    movement: Omit<StockMovement, "id" | "created">
  ) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/inventory`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(movement),
        }
      );
  
      if (!res.ok) throw new Error("Thêm nhập/xuất kho thất bại");
  
      await fetchMovements();
    } catch (err) {
      console.error(err);
    }
  };
  

  // 📌 Xóa phiếu nhập/xuất kho
  const deleteMovement = async (id: number) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory/${id}`, {
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
