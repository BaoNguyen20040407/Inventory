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
  const [activeView, setActiveView] = useState<"bar" | "pie" | null>(null);

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

  return (
    <div className="app-container" style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar bên trái */}
      <aside style={{ width: 220, background: "#f5f5f5", padding: 16, borderRight: "1px solid #ddd" }}>
        <h3 style={{ marginBottom: 20, textAlign: "center" }}>Chọn loại thống kê</h3>
        <div 
          style={{ padding: 12, marginBottom: 10, cursor: "pointer", borderRadius: 8, background: activeView === "bar" ? "#007bff" : "#fff", color: activeView === "bar" ? "#fff" : "#000", textAlign: "center" }}
          onClick={() => setActiveView("bar")}
        >
          Số lượng phiếu nhập / xuất theo ngày
        </div>
        <div 
          style={{ padding: 12, cursor: "pointer", borderRadius: 8, background: activeView === "pie" ? "#007bff" : "#fff", color: activeView === "pie" ? "#fff" : "#000", textAlign: "center" }}
          onClick={() => setActiveView("pie")}
        >
          Tổng sản phẩm nhập / xuất theo sản phẩm
        </div>
      </aside>

      {/* Nội dung bên phải */}
      <main style={{ flex: 1, padding: 24 }}>
        <header className="app-header" style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
          <div className="logo">
            <img 
              src="https://static.vecteezy.com/system/resources/previews/004/891/075/non_2x/the-initials-w-logo-is-simple-and-modern8868-free-vector.jpg" 
              alt="Logo" 
              style={{ width: "40px", height: "40px", objectFit: "contain", marginRight: 5, marginLeft: 7 }}
            />
          </div>
          <h1 style={{ fontSize: "1.6rem", margin: 0 }}>📊 Thống kê</h1>
        </header>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
    <h2 style={{ fontSize: 22, fontWeight: "bold", margin: 0 }}>📦 Thống kê nhập / xuất kho</h2>
    <button 
      type="button"
      className="btn btn-gray"
      onClick={() => router.push("/")}
      style={{ padding: "6px 14px", borderRadius: "6px", cursor: "pointer", backgroundColor: "#008cffff", color: "#ffffffff" }}
    >
      Quay về
    </button>
  </div>

        {/* Biểu đồ cột */}
        {activeView === "bar" && (
          <div style={{ height: 440, background: "white", borderRadius: 12, padding: 16 }}>
            <h3 style={{ marginBottom: 12 }}>Số lượng phiếu nhập / xuất theo ngày</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="nhập" fill="#82ca9d" />
                <Bar dataKey="xuất" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Biểu đồ tròn */}
        {activeView === "pie" && (
          <div style={{ height: 440, background: "white", borderRadius: 12, padding: 16 }}>
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
      </main>
    </div>
  );
}
