"use client";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();
    setProducts(data);
  };

  const importProduct = async (id: number) => {
    await fetch(`http://localhost:3000/products/${id}/import`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: 10 }),
    });
    fetchProducts();
  };

  const exportProduct = async (id: number) => {
    await fetch(`http://localhost:3000/products/${id}/export`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: 5 }),
    });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">📦 Quản lý kho</h1>
      <table className="table-auto border-collapse border border-gray-400 w-full">
        <thead>
          <tr>
            <th className="border px-4 py-2">Mã SP</th>
            <th className="border px-4 py-2">Tên SP</th>
            <th className="border px-4 py-2">Số lượng</th>
            <th className="border px-4 py-2">Giá</th>
            <th className="border px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.id}>
              <td className="border px-4 py-2">{p.id}</td>
              <td className="border px-4 py-2">{p.name}</td>
              <td className="border px-4 py-2">{p.quantity}</td>
              <td className="border px-4 py-2">{p.price.toLocaleString()} đ</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => importProduct(p.id)}
                >
                  Nhập +10
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => exportProduct(p.id)}
                >
                  Xuất -5
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
