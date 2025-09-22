"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
}

interface Supplier {
  id: number;
  name: string;
}

interface Warehouse {
  id: number;
  name: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  const [categoryId, setCategoryId] = useState<number | "">("");
  const [supplierId, setSupplierId] = useState<number | "">("");
  const [warehouseId, setWarehouseId] = useState<number | "">("");

  // ✅ Fetch categories + suppliers + warehouse
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, supRes, warRes] = await Promise.all([
          fetch("http://localhost:3000/categories"),
          fetch("http://localhost:3000/suppliers"),
          fetch("http://localhost:3000/warehouse"),
        ]);

        if (catRes.ok) setCategories(await catRes.json());
        if (supRes.ok) setSuppliers(await supRes.json());
        if (warRes.ok) setWarehouses(await warRes.json())
      } catch (err) {
        console.error("Lỗi khi load dữ liệu:", err);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: Number(price),
          quantity: Number(quantity),
          category: categoryId ? { id: categoryId } : null,
          supplier: supplierId ? { id: supplierId } : null,
          warehouse: warehouseId ? { id: warehouseId }: null,
        }),
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Lưu sản phẩm thất bại: ${res.status} - ${errorText}`);
      }
  
      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi lưu sản phẩm");
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
          📦 Thêm Sản Phẩm
        </h1>
      </header>

      <main className="right-panel">
        <div className="table-card">
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Tên sản phẩm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
            />

            <input
                type="number"
                placeholder="Đơn giá"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="form-input"
            />

            <input
                type="number"
                placeholder="Số lượng"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="form-input"
            />

            {/* Dropdown Category */}
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="form-input"
              required
            >
              <option value="">-- Chọn loại sản phẩm --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Dropdown Supplier */}
                <select
                value={supplierId || ""}
                onChange={(e) => setSupplierId(Number(e.target.value))}
                className="form-input"
                required
                >
                <option value="">-- Chọn nhà cung cấp --</option>
                {suppliers.map((s) => (
                    <option key={s.id} value={s.id}>
                    {s.name}
                    </option>
                ))}
                </select>
            
            {/* Dropdown Warehouse */}
            <select
              value={warehouseId}
              onChange={(e) => setWarehouseId(Number(e.target.value))}
              className="form-input"
              required
            >
              <option value="">-- Chọn kho hàng --</option>
              {warehouses.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>


            <div className="form-actions">
              <button type="submit" className="btn btn-green">
                Lưu
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
