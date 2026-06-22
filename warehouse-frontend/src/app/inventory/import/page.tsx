"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/app/components/layout/app_header";

interface Product {
  id: number;
  name: string;
}

export default function ImportStockPage() {
  const router = useRouter();
  const [productId, setProductId] = useState<number | "">("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  // ✅ Fetch sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`);
        if (res.ok) setProducts(await res.json());
      } catch (err) {
        console.error("Lỗi khi load sản phẩm:", err);
      }
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/inventory`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          quantity: Number(quantity),
          type: "Import",
          reason,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error("Thêm phiếu nhập thất bại: ${res.status} - ${errorText}");
      }

      router.push("/inventory");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi lưu phiếu nhập");
    }
  };

  return (
    <div className="app-container">
     <AppHeader title ="➕ Phiếu nhập hàng"/>
      
      <main className="right-panel">
        <div className="table-card">
          <form className="form" onSubmit={handleSubmit}>
            <select
              value={productId}
              onChange={(e) => setProductId(Number(e.target.value))}
              className="form-input"
              required
            >
              <option value="">-- Chọn sản phẩm --</option>
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Số lượng nhập"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
              className="form-input"
            />

            <input
              type="text"
              placeholder="Lý do nhập (tùy chọn)"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="form-input"
            />

            <div className="form-actions">
              <button type="submit" className="btn btn-green">
                Lưu phiếu nhập
              </button>
              <button
                type="button"
                className="btn btn-gray"
                onClick={() => router.push("/inventory")}
              >
                Hủy
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
