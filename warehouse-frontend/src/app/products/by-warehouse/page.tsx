"use client";
import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../hooks/useProducts";
import { useState } from "react";
import { useRouter } from "next/navigation"; 

export default function ProductsByWarehouse() {
  const { products, loading } = useProducts();
  const [activeView, setActiveView] = useState("warehouse");
  const router = useRouter();

  if (loading) return <p style={{ padding: 16 }}>Đang tải...</p>;

  // Gom nhóm sản phẩm theo kho hàng
  const grouped = products.reduce((acc: Record<string, Product[]>, p) => {
    const wh = p.warehouse?.name || "Chưa có kho";
    if (!acc[wh]) acc[wh] = [];
    acc[wh].push(p);
    return acc;
  }, {});

  return (
    <div
      className="app-container"
      style={{ display: "flex", flexDirection: "column", height: "100vh" }}
    >
      {/* HEADER */}
      <header className="app-header">
        <div className="logo">
          <img
            src="https://static.vecteezy.com/system/resources/previews/004/891/075/non_2x/the-initials-w-logo-is-simple-and-modern8868-free-vector.jpg"
            alt="Logo"
            style={{ width: "40px", height: "40px", objectFit: "contain" }}
          />
        </div>
        <h1 style={{ fontSize: "1.6rem", margin: 0, color: "#ffffff" }}>
          📦 Warehouse Management
        </h1>
      </header>

      <div className="app-grid">
        {/* LEFT PANEL */}
        <aside className="left-panel">
          <div
            className={`panel-section ${
              activeView === "suppliers" ? "active" : ""
            }`}
            onClick={() => setActiveView("suppliers")}
          >
            <h3>Nhà cung cấp</h3>
          </div>
          <div
            className={`panel-section ${
              activeView === "categories" ? "active" : ""
            }`}
            onClick={() => setActiveView("categories")}
          >
            <h3>Loại sản phẩm</h3>
          </div>
          <div
            className={`panel-section ${
              activeView === "unit" ? "active" : ""
            }`}
            onClick={() => setActiveView("unit")}
          >
            <h3>Đơn vị tính</h3>
          </div>
          <div
            className={`panel-section ${
              activeView === "warehouse" ? "active" : ""
            }`}
            onClick={() => setActiveView("warehouse")}
          >
            <h3>Kho hàng</h3>
          </div>
          <div
            className={`panel-section ${
              activeView === "products" ? "active" : ""
            }`}
            onClick={() => setActiveView("products")}
          >
            <h3>Sản phẩm</h3>
          </div>
          <div
            className={`panel-section ${
              activeView === "inventory" ? "active" : ""
            }`}
            onClick={() => setActiveView("inventory")}
          >
            <h3>Nhập / Xuất kho</h3>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main style={{ flex: 1, padding: 20, overflowY: "auto" }}>
        <div
            style={{
                background: "#fff",
                padding: 20,
                borderRadius: 8,
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            }}
            >
            <div
                style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 16,
                }}
            >
                <h2 style={{ margin: 0 }}>Sản phẩm theo kho hàng</h2>

                <button
                type="button"
                onClick={() => router.push("/")}
                style={{
                    padding: "6px 14px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    backgroundColor: "#007bff",
                    color: "#fff",
                    border: "none",
                    fontWeight: "bold",
                }}
                >
                ⬅ Quay về
                </button>
            </div>

            {Object.keys(grouped).length === 0 ? (
              <p>Không có sản phẩm nào</p>
            ) : (
              Object.keys(grouped).map((wh) => (
                <div
                  key={wh}
                  style={{
                    marginBottom: 32,
                    border: "1px solid #ddd",
                    borderRadius: 8,
                    padding: 16,
                    background: "#f9f9f9",
                  }}
                >
                  <h3 style={{ marginBottom: 16 }}>🏬 {wh}</h3>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                      gap: 16,
                    }}
                  >
                    {grouped[wh].map((p) => (
                      <div
                        key={p.id}
                        style={{
                          background: "#fff",
                          padding: 12,
                          border: "1px solid #ddd",
                          borderRadius: 6,
                          boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
                        }}
                      >
                        <h4 style={{ margin: "0 0 8px 0" }}>{p.name}</h4>
                        <p style={{ margin: "4px 0" }}>🆔 ID: {p.id}</p>
                        <p style={{ margin: "4px 0" }}>📦 SL: {p.quantity}</p>
                        <p style={{ margin: "4px 0" }}>
                          💲{" "}
                          {Number(p.price).toLocaleString("vi-VN", {
                            maximumFractionDigits: 0,
                          })}{" "}
                          VND
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
