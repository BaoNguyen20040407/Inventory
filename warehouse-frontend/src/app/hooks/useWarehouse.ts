import { useState, useEffect } from "react";

export interface Warehouse {
    id: number;
    name: string; 
    address: string,
    manager: string,
}

export function useWarehouse() {
    const [warehouse, setWarehouse] = useState<Warehouse[]>([]);
    const [loading, setLoading] = useState(true);

    //Fetch kho
    const fetchWarehouse = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:3000/warehouse");
            const data = await res.json();
            setWarehouse(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Lỗi fetch warehouse: ", err),
            setWarehouse([]);
        } finally {
            setLoading(false);
        }
    }

    // Thêm loại sản phẩm
  const addCategory = async (category: Omit<Warehouse, "id">) => {
    try {
      const res = await fetch("http://localhost:3000/warehouse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });
      if (!res.ok) throw new Error("Thêm loại sản phẩm thất bại");
      await fetchWarehouse();
    } catch (err) {
      console.error(err);
    }
  };

  // Xóa loại sản phẩm
  const deleteCategory = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/warehouse/${id}`, {
        method: "DELETE",
      });
      setWarehouse((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchWarehouse();
  }, []);

  return { warehouse, loading, fetchWarehouse, addCategory, deleteCategory };

}