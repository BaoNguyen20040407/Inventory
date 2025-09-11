"use client";
import { useState, useEffect } from "react";

export interface Supplier {
  id: number;
  name: string;
  address?: string;
  phone?: string;
}

export function useSuppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch danh sách NCC
  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/suppliers");
      const data = await res.json();
      setSuppliers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Lỗi fetch suppliers:", err);
      setSuppliers([]);
    } finally {
      setLoading(false);
    }
  };

  // Thêm nhà cung cấp
  const addSupplier = async (supplier: Omit<Supplier, "id">) => {
    try {
      const res = await fetch("http://localhost:3000/suppliers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(supplier),
      });
      if (!res.ok) throw new Error("Thêm nhà cung cấp thất bại");
      await fetchSuppliers();
    } catch (err) {
      console.error(err);
    }
  };

  // Xóa nhà cung cấp
  const deleteSupplier = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/suppliers/${id}`, {
        method: "DELETE",
      });
      setSuppliers((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return { suppliers, loading, fetchSuppliers, addSupplier, deleteSupplier };
}
