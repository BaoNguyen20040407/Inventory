"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AppHeader from "@/app/components/layout/app_header";

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
  const [unitId, setUnitId] = useState<number | "">("");

  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");

  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);

  const formatPrice = (value: number) =>
    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // LOAD DATA
  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const [supRes, catRes, warRes, unitRes] = await Promise.all([
          fetch("http://localhost:3000/suppliers"),
          fetch("http://localhost:3000/categories"),
          fetch("http://localhost:3000/warehouse"),
          fetch("http://localhost:3000/unit"),
        ]);

        setSuppliers(await supRes.json());
        setCategories(await catRes.json());
        setWarehouses(await warRes.json());
        setUnits(await unitRes.json());

        const res = await fetch(`http://localhost:3000/products/${id}`);
        const data = await res.json();

        setName(data.name || "");
        setPrice(Number(data.price) || 0);
        setQuantity(Number(data.quantity) || 0);

        setSupplierId(data.supplier?.id || "");
        setCategoryId(data.category?.id || "");
        setWarehouseId(data.warehouse?.id || "");
        setUnitId(data.unit?.id || "");

        setImageUrl(data.imageUrl || "");
        setPreview(data.imageUrl || "");
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // UPDATE
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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
        unit: unitId ? { id: unitId } : null,
        imageUrl: imageUrl,
      }),
    });

    if (res.ok) {
      router.push("/products");
      router.refresh();
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Đang tải...</p>;

  return (
    <div className="app-container">
      <AppHeader title="✏️ Sửa Sản Phẩm" />

      <main className="right-panel">
        <div className="table-card">

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "320px 1fr",
              gap: "24px",
            }}
          >

            {/* LEFT - IMAGE */}
            <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 10 }}>
              <h3>Hình ảnh sản phẩm</h3>

              <div
                style={{
                  width: "100%",
                  height: 280,
                  border: "2px dashed #ccc",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  marginBottom: 10,
                }}
              >
                {preview ? (
                  <img
                    src={preview}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                ) : (
                  <span>Chưa có ảnh</span>
                )}
              </div>

              <input
                id="product-image"
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  setImageFile(file);
                  setPreview(URL.createObjectURL(file));
                }}
              />

              <label
                htmlFor="product-image"
                className="btn btn-green"
                style={{
                  display: "block",
                  textAlign: "center",
                  cursor: "pointer",
                }}
              >
                📷 Đổi ảnh
              </label>
            </div>  

            {/* RIGHT - INFO */}
            <div style={{ display: "grid", gap: 12 }}>

              <h3>Thông tin sản phẩm</h3>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-input"
              />

              <input
                value={formatPrice(price)}
                onChange={(e) => {
                  const raw = e.target.value.replace(/\./g, "");
                  setPrice(Number(raw));
                }}
                className="form-input"
              />

              <input
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="form-input"
              />
              <select
                value={unitId}
                onChange={(e) => setUnitId(Number(e.target.value))}
                className="form-input"
                required
              >
                <option value="">
                  -- Chọn loại đơn vị tính --
                </option>
                {units.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>

              <select
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
              className="form-input"
              required
            >
              <option value="">
                -- Chọn loại sản phẩm --
              </option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={supplierId}
              onChange={(e) =>
                setSupplierId(Number(e.target.value))
              }
              className="form-input"
              required
            >
              <option value="">
                -- Chọn nhà cung cấp --
              </option>
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <select
              value={warehouseId}
              onChange={(e) =>
                setWarehouseId(Number(e.target.value))
              }
              className="form-input"
              required
            >
              <option value="">
                -- Chọn kho hàng --
              </option>
              {warehouses.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name}
                </option>
              ))}
            </select>

              <div className="form-actions">
                <button className="btn btn-green" type="submit">
                  Lưu
                </button>
                <button
                  type="button"
                  className="btn btn-gray"
                  onClick={() => router.push("/products")}
                >
                  Hủy
                </button>
              </div>

            </div>
          </form>

        </div>
      </main>
    </div>
  );
}