"use client";
import { useProducts } from "../../hooks/useProducts";
import { Product } from "../../hooks/useProducts";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import AppHeader from "@/app/components/layout/app_header";
import Sidebar from "@/app/components/layout/sidebar";

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
      <AppHeader title = "📦 WAREHOUSE MANAGEMENT"/>
      

      <div className="app-grid">
        {/* LEFT PANEL */}
        <Sidebar active="warehouse" />

        {/* MAIN CONTENT */}
        <main style={{ flex: 1, padding: 0, overflowY: "auto", background: "#f4f6f8" }}>
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 24,
              }}
            >
              <h2 style={{ margin: 0, fontSize: "1.6rem", color: "#333" }}>
                🏭 Danh sách sản phẩm theo kho hàng
              </h2>

              <button
                type="button"
                onClick={() => router.push("/products")}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  fontWeight: "bold",
                  transition: "0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#007bff")}
              >
                ⬅ Quay về
              </button>
            </div>

            {Object.keys(grouped).length === 0 ? (
              <p style={{ fontSize: "1.1rem", color: "#777" }}>Không có sản phẩm nào</p>
            ) : (
              Object.keys(grouped).map((wh) => (
                <div
                  key={wh}
                  style={{
                    marginBottom: 40,
                    background: "#ffffff",
                    borderRadius: 12,
                    border: "1px solid #e0e0e0",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    transition: "0.2s ease-in-out",
                  }}
                >
                  <div
                    style={{
                      background: "#007bff",
                      color: "#fff",
                      padding: "12px 16px",
                      borderTopLeftRadius: 12,
                      borderTopRightRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <span style={{ fontSize: "1.4rem" }}>🏬</span>
                    <h3 style={{ margin: 0, fontSize: "1.2rem" }}>{wh}</h3>
                  </div>

                  <div
                    style={{
                      padding: 20,
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                      gap: 20,
                      background: "#fafafa",
                      borderBottomLeftRadius: 12,
                      borderBottomRightRadius: 12,
                    }}
                  >
                    {grouped[wh].map((p) => (
                      <div
                        key={p.id}
                        style={{
                          background: "#fff",
                          borderRadius: 10,
                          border: "1px solid #e5e5e5",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                          padding: 16,
                          transition: "transform 0.2s ease, box-shadow 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = "translateY(-4px)";
                          e.currentTarget.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)";
                        }}
                      >
                        <h4
                          style={{
                            margin: "0 0 8px 0",
                            fontSize: "1.1rem",
                            color: "#333",
                            fontWeight: 600,
                          }}
                        >
                          {p.name}
                        </h4>

                        <p style={{ margin: "4px 0", color: "#555" }}>🆔 <b>ID:</b> {p.id}</p>
                        <p style={{ margin: "4px 0", color: "#555" }}>📦 <b>Số lượng:</b> {p.quantity}</p>
                        <p style={{ margin: "4px 0", color: "#555" }}>
                          💲 <b>Giá:</b>{" "}
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
