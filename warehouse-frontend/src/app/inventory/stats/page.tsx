"use client";
import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { StockMovement } from "../../hooks/useInventory";

const COLORS = ["#82ca9d", "#8884d8", "#ff8042", "#ffbb28"];

export default function InventoryStatsPage() {
  const [movements, setMovements] = useState<StockMovement[]>([]);
  const [loading, setLoading] = useState(true);
  

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
    <div style={{ padding: 24 }}>
      <h2 style={{ fontSize: 22, fontWeight: "bold", marginBottom: 20 }}>📊 Thống kê nhập / xuất kho</h2>

      {/* Biểu đồ cột */}
      <div style={{ height: 400, marginBottom: 40, background: "white", borderRadius: 12, padding: 16 }}>
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

      {/* Biểu đồ tròn */}
      <div style={{ height: 400, background: "white", borderRadius: 12, padding: 16 }}>
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
    </div>
  );
}
