"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { format } from "path";
import AppHeader from "@/app/components/layout/app_header";

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

interface Unit {
  id: number;
  name: string;
}

export default function AddProductPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState("0");

  const [categories, setCategories] = useState<Category[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);

  const [categoryId, setCategoryId] = useState<number | "">("");
  const [supplierId, setSupplierId] = useState<number | "">("");
  const [warehouseId, setWarehouseId] = useState<number | "">("");
  const [unitId, setUnitId] = useState<number | "">("");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  //Hàm format tiền
  const formatPrice = (value: number) =>
    value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // ✅ Fetch categories + suppliers + warehouse
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, supRes, warRes, unitRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/categories`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/suppliers`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/warehouse`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/unit`)
        ]);

        if (catRes.ok) setCategories(await catRes.json());
        if (supRes.ok) setSuppliers(await supRes.json());
        if (warRes.ok) setWarehouses(await warRes.json());
        if (unitRes.ok) setUnits(await unitRes.json());
      } catch (err) {
        console.error("Lỗi khi load dữ liệu:", err);
      }
    };
    fetchData();
  }, []);

  const uploadImage = async (file: File) => {
    console.log("📤 START UPLOAD IMAGE");
    console.log("FILE INFO:", {
      name: file.name,
      size: file.size,
      type: file.type,
    });
  
    const formData = new FormData();
    formData.append("file", file);
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image`, {
      method: "POST",
      body: formData,
    });
  
    console.log("📡 RESPONSE STATUS:", res.status);
  
    const text = await res.text();
    console.log("📦 RAW RESPONSE:", text);
  
    let data;
    try {
      data = JSON.parse(text);
      console.log("✅ PARSED RESPONSE:", data);
    } catch (err) {
      console.error("❌ JSON PARSE ERROR:", err);
    }
  
    if (!res.ok) {
      console.error("❌ UPLOAD FAILED:", data || text);
      throw new Error(data?.message || text || "Upload thất bại");
    }
  
    return data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      let imageUrl = "";
  
      // ✔ upload thật lên Cloudinary
      if (imageFile) {
        const uploadRes = await uploadImage(imageFile);
        imageUrl = uploadRes.url || uploadRes.secure_url;
      }
  
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          price: Number(price),
          quantity: Number(quantity),
          category: categoryId ? { id: categoryId } : null,
          supplier: supplierId ? { id: supplierId } : null,
          warehouse: warehouseId ? { id: warehouseId } : null,
          unit: unitId ? { id: unitId } : null,
          imageUrl: imageUrl || null,
        }),
      });
  
      const data = await res.text();
  
      if (!res.ok) {
        throw new Error(data);
      }
  
      router.push("/products");
      router.refresh();
    } catch (err) {
      console.error("❌ Lỗi lưu sản phẩm:", err);
      alert("Có lỗi khi lưu sản phẩm");
    }
  };

  return (
    <div className="app-container">
      <AppHeader title = "📦 Thêm Sản Phẩm"/>

      <main className="right-panel">
        <div className="table-card">
        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "320px 1fr",
            gap: "24px",
            alignItems: "start",
          }}
        >
          {/* CỘT TRÁI - HÌNH ẢNH */}
          <div
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              padding: "16px",
              background: "#fff",
            }}
          >
            <h3 style={{ marginBottom: "12px" }}>
              Hình ảnh sản phẩm
            </h3>

            <div
              style={{
                width: "100%",
                height: "280px",
                border: "2px dashed #ccc",
                borderRadius: "10px",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "12px",
              }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              ) : (
                <span>Chưa có hình ảnh</span>
              )}
            </div>

            <input
              id="product-image"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
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
              📷 Chọn ảnh
            </label>
          </div>

          {/* CỘT PHẢI - THÔNG TIN */}
          <div
            style={{
              display: "grid",
              gap: "12px",
            }}
          >
            <h3>Thông tin sản phẩm</h3>

            <input
              type="text"
              placeholder="Tên sản phẩm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="form-input"
            />

            <input
              type="text"
              placeholder="Giá"
              value={formatPrice(price)}
              onChange={(e) => {
                const raw = e.target.value.replace(/\./g, "");
                const num = Number(raw) || 0;
                setPrice(num);
              }}
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

            <select
              value={unitId}
              onChange={(e) => setUnitId(Number(e.target.value))}
              className="form-input"
              required
            >
              <option value="">
                -- Chọn loại đơn vị tính --
              </option>
              {units.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
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
              value={supplierId || ""}
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
              <button
                type="submit"
                className="btn btn-green"
              >
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
