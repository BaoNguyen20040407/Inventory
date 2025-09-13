"use client";
import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";
import { StockMovement } from "../../hooks/useInventory";
import { useRouter } from "next/navigation";

const COLORS = ["#82ca9d", "#8884d8", "#ff8042", "#ffbb28"];

export default function InventoryStatsPage() {
  const router = useRouter();
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<"bar" | "pie" | "stock" | null>(null);

  useEffect(() => {
    const loadMovements = async () => {
      try {
        const res = await fetch("http://localhost:3000/inventory/movements");
        if (res.ok) {
          const data = await res.json();
          console.log("📊 Movements API data:", data);
          setMovements(data);
        } else {
          console.error("❌ Fetch movements failed:", res.status);
        }
      } catch (err) {
        console.error("❌ Fetch movements error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMovements();
  }, []);

  if (loading) {
    return <p style={{ padding: 20 }}>Đang tải thống kê...</p>;
  }

  // Gom dữ liệu phiếu nhập/xuất theo ngày
  const byDate: Record<string, { Import: number; Export: number }> = {};
  movements.forEach((m) => {
    const day = new Date(m.created).toLocaleDateString("vi-VN");
    if (!byDate[day]) byDate[day] = { Import: 0, Export: 0 };
    byDate[day][m.type] += 1;
  });

  const chartData = Object.keys(byDate).map((d) => ({
    date: d,
    nhập: byDate[d].Import,
    xuất: byDate[d].Export,
  }));

  // Gom tổng sản phẩm nhập/xuất theo tên sản phẩm
  const byProduct: Record<string, number> = {};
  movements.forEach((m) => {
    const key = `${m.product?.name || "Khác"} (${m.type === "Import" ? "Nhập" : "Xuất"})`;
    byProduct[key] = (byProduct[key] || 0) + m.quantity;
  });

  const pieData = Object.keys(byProduct).map((k) => ({
    name: k,
    value: byProduct[k],
  }));

  // 👉 Tính tồn kho hiện tại theo sản phẩm
  const stockByProduct: Record<string, number> = {};
  movements.forEach((m) => {
    const name = m.product?.name || "Khác";
    if (!stockByProduct[name]) stockByProduct[name] = 0;
    stockByProduct[name] += m.type === "Import" ? m.quantity : -m.quantity;
  });

  const stockData = Object.keys(stockByProduct).map((k) => ({
    name: k,
    tồn: stockByProduct[k],
  }));

  return (
    <div className="app-container">
      {/* Header */}
      <header className="app-header" style={{ display: "flex", alignItems: "center" }}>
        <div className="logo">
          <img
            src="https://static.vecteezy.com/system/resources/previews/004/891/075/non_2x/the-initials-w-logo-is-simple-and-modern8868-free-vector.jpg"
            alt="Logo"
            style={{ width: "40px", height: "40px", objectFit: "contain", marginRight: 8 }}
          />
        </div>
        <h1 style={{ fontSize: "1.6rem", margin: 0, color: "#ffffff" }}>📊 Thống kê</h1>
      </header>

      <div className="app-grid">
        {/* LEFT menu */}
        <aside className="left-panel">
          <div
            className={`panel-section ${activeView === "bar" ? "active" : ""}`}
            onClick={() => setActiveView("bar")}
          >
            <h3>Số lượng phiếu nhập / xuất theo ngày</h3>
          </div>
          <div
            className={`panel-section ${activeView === "pie" ? "active" : ""}`}
            onClick={() => setActiveView("pie")}
          >
            <h3>Tổng sản phẩm nhập / xuất theo sản phẩm</h3>
          </div>
          <div
            className={`panel-section ${activeView === "stock" ? "active" : ""}`}
            onClick={() => setActiveView("stock")}
          >
            <h3>Tồn kho hiện tại theo sản phẩm</h3>
          </div>
        </aside>

        {/* RIGHT content */}
        <main className="right-panel">
          <div className="table-card">
            {/* Tiêu đề + quay về */}
            <div style={{ display: "flex", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 22, fontWeight: "bold", margin: 0 }}>
                📦 Thống kê nhập / xuất kho
              </h2>
              <button
                type="button"
                onClick={() => router.push("/")}
                style={{
                  marginLeft: "auto",
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

            {activeView === "bar" && (
              <div style={{ height: 440 }}>
                <h3 style={{ marginBottom: 12 }}>Số lượng phiếu nhập / xuất theo ngày</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <XAxis dataKey="date" tick={{ dy: 5 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                    <Bar dataKey="nhập" fill="#82ca9d" />
                    <Bar dataKey="xuất" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {activeView === "pie" && (
              <div style={{ height: 440 }}>
                <h3 style={{ marginBottom: 12 }}>Tổng sản phẩm nhập / xuất theo sản phẩm</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} dataKey="value" nameKey="name" label>
                      {pieData.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {activeView === "stock" && (
              <div style={{ height: 440 }}>
                <h3 style={{ marginBottom: 12 }}>Tồn kho hiện tại theo sản phẩm</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stockData}>
                    <XAxis dataKey="name" tick={{ dy: 5 }} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="tồn" fill="#ff8042" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}