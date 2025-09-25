"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [supplierId, setSupplierId] = useState<number | "">("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [warehouseId, setWarehouseId] = useState<number | "">("");

  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [warehouse, setWarehouse] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu sản phẩm cần sửa
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        // lấy danh sách supplier và category
        const [supRes, catRes, warRes] = await Promise.all([
          fetch("http://localhost:3000/suppliers"),
          fetch("http://localhost:3000/categories"),
          fetch("http://localhost:3000/warehouse"),
        ]);

        setSuppliers(await supRes.json());
        setCategories(await catRes.json());
        setWarehouse(await warRes.json());

        // lấy thông tin sản phẩm
        const res = await fetch(`http://localhost:3000/products/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy sản phẩm");
        const data = await res.json();

        setName(data.name || "");
        setPrice(Number(data.price) || 0);
        setQuantity(Number(data.quantity) || 0);
        setSupplierId(data.supplier?.id || "");
        setCategoryId(data.category?.id || "");
        setWarehouseId(data.warehouse?.id || "");
      } catch (err) {
        console.error(err);
        alert("Lỗi khi tải dữ liệu sản phẩm");
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price,
          quantity,
          supplier: supplierId ? { id: supplierId } : null,
          category: categoryId ? { id: categoryId } : null,
          warehouse: warehouseId ? { id: warehouseId } : null,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Cập nhật thất bại: ${res.status} - ${errorText}`);
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi cập nhật");
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Đang tải...</p>;

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
          ✏️ Sửa Sản Phẩm
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
              placeholder="Giá"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
              className="form-input"
            />

            <input
              type="number"
              placeholder="Số lượng"
              value={quantity}
              readOnly
              className="form-input"
            />

            {/* Dropdown chọn loại sản phẩm */}
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="form-input"
            >
              <option value="">-- Chọn loại sản phẩm --</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            {/* Dropdown chọn nhà cung cấp */}
            <select
              value={supplierId}
              onChange={(e) => setSupplierId(Number(e.target.value))}
              className="form-input"
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
              {warehouse.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
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
