"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

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
        const res = await fetch("http://localhost:3000/products");
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
      const res = await fetch("http://localhost:3000/inventory", {
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
        throw new Error(`Thêm phiếu nhập thất bại: ${res.status} - ${errorText}`);
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi lưu phiếu nhập");
    }
  };

  return (
    <div className="app-container">
     <header className="app-header">
      <div className="logo">
          <img
            src="https://static.vecteezy.com/system/resources/previews/004/891/075/non_2x/the-initials-w-logo-is-simple-and-modern8868-free-vector.jpg"
            alt="Logo"
            style={{ width: "40px", height: "40px", objectFit: "contain" }}
          />
        </div>
        <h1 style={{ fontSize: "1.6rem", margin: 0, color: "#ffffff" }}>
            ➕ Phiếu Nhập Hàng
        </h1>
      </header>

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
                onClick={() => router.push("/")}
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
