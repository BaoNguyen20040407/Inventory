"use client";
import { useRouter } from "next/navigation";
import { StockMovement } from "../hooks/useInventory";
import { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface Product {
  id: number;
  name: string;
}

interface Props {
  movements: StockMovement[];
  products: Product[];
  loading: boolean;
}

export default function StockMovementsTable({ movements, loading, products }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  if (loading) {
    return <p style={{ padding: 16, color: "#6b7280" }}>Đang tải dữ liệu...</p>;
  }

  const filteredInventory = movements.filter((m) => {
    const term = search.toLowerCase();
  
    // Chuyển ngày giờ phiếu thành string "dd/mm/yyyy"
    const dateStr = new Date(m.created).toLocaleDateString("vi-VN");
  
    // Kiểm tra text search bình thường
    const matchesText =
      (m.product?.name || "").toLowerCase().includes(term) ||
      (m.reason || "").toLowerCase().includes(term) ||
      dateStr.includes(term);
  
    // Kiểm tra loại phiếu: nếu search là "nhập" hoặc "xuất" thì so với type
    const matchesType =
      term === "nhập" ? m.type === "Import" :
      term === "xuất" ? m.type === "Export" :
      false;
  
    // Nếu search trống thì trả về tất cả
    if (!term) return true;
  
    return matchesText || matchesType;
  });  

  //Xuất phiếu PDF
  const exportToPDF = async (element: HTMLElement, filename: string) => {
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
  
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const imgWidth = pageWidth - 20;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(filename);
  };
  
  
  const exportToExcel = () => {
    if (filteredInventory.length === 0) return;
  
    // Chuyển dữ liệu thành dạng mảng object phù hợp Excel
    const data = filteredInventory.map((m) => ({
      "Mã phiếu": m.id,
      "Sản phẩm": m.product?.name || "-",
      "Số lượng": m.quantity,
      "Loại": m.type === "Import" ? "Nhập" : "Xuất",
      "Lý do": m.reason || "-",
      "Ngày giờ": new Date(m.created).toLocaleString(),
    }));
  
    // Tạo worksheet
    const ws = XLSX.utils.json_to_sheet(data);
  
    // Tạo workbook và thêm worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "StockMovements");
  
    // Xuất file Excel
    const wbout = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([wbout], { type: "application/octet-stream" }), "StockMovements.xlsx");
  };
  
  
  return (
    <div className="table-wrapper">
      <div style={{display: "flex", justifyContent: "space-between", marginBottom: 12, gap: 12}}>
        <input
          type="text"
          placeholder="Tìm kiếm phiếu nhập/xuất..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />
        
        <button
          onClick={() => router.push("/inventory/import")}
          style={{
            backgroundColor: "green",
            color: "white",
            fontWeight: "bold",
            padding: "8px 14px",
            borderRadius: "6px",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
          }}
        >
          <span style={{fontSize: "18px"}}>+</span> Nhập hàng
        </button>

        <button
          onClick={() => router.push("/inventory/export")}
          style={{
            backgroundColor: "red",
            color: "white",
            fontWeight: "bold",
            padding: "8px 14px",
            borderRadius: "6px",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
          }}
        >
          <span style={{fontSize: "18px"}}>-</span> Xuất hàng
        </button>

        <button
          onClick={() => router.push("/inventory/stats")}
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            fontWeight: "bold",
            padding: "8px 14px",
            borderRadius: "6px",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
          }}
        >
          📊 Xem thống kê
        </button>

        <button
          onClick={exportToExcel}
          style={{
            backgroundColor: "#f59e0b",
            color: "white",
            fontWeight: "bold",
            padding: "8px 14px",
            borderRadius: "6px",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
          }}
        >
          📥 Xuất Excel
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Mã phiếu</th>
            <th>Sản phẩm</th>
            <th>Số lượng</th>
            <th>Loại</th>
            <th>Lý do</th>
            <th>Ngày giờ</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredInventory.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: 20 }}>
                Chưa có dữ liệu nhập / xuất kho
              </td>
            </tr>
          ) : (
            filteredInventory.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.product?.name || "-"}</td>
                <td>{m.quantity}</td>
                <td>{m.type === "Import" ? "Nhập" : "Xuất"}</td>
                <td>{m.reason || "-"}</td>
                <td>{new Date(m.created).toLocaleString()}</td>
                <td>
                <button
                  onClick={async () => {
                    // Tạo div ẩn chứa layout phiếu
                    const temp = document.createElement("div");
                    temp.style.padding = "24px";
                    temp.style.background = "white";
                    temp.style.width = "600px"; // để PDF có layout đẹp
                    
                    temp.innerHTML = `
                      <div style="text-align:center; margin-bottom:20px;">
                        <h2 style="margin:0;">CÔNG TY TNHH ABC</h2>
                        <p style="margin:0;">Địa chỉ: 75/1 Nghĩa Hòa, phường Tân Hòa, Thành phố Hồ Chí Minh</p>
                        <hr style="margin-top:10px;"/>
                      </div>

                      <h3 style="text-align:center; margin:20px 0;">
                        PHIẾU ${m.type === "Import" ? "NHẬP" : "XUẤT"} KHO
                      </h3>

                      <p><b>Ngày lập phiếu:</b> ${new Date(m.created).toLocaleString("vi-VN")}</p>

                      <table style="width:100%; border-collapse:collapse; margin:20px 0;">
                        <thead>
                          <tr>
                            <th style="border:1px solid #000; padding:8px; text-align:center;">STT</th>
                            <th style="border:1px solid #000; padding:8px; text-align:center;">Tên sản phẩm</th>
                            <th style="border:1px solid #000; padding:8px; text-align:center;">Số lượng</th>
                            <th style="border:1px solid #000; padding:8px; text-align:center;">Lý do</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td style="border:1px solid #000; padding:8px; text-align:center;">1</td>
                            <td style="border:1px solid #000; padding:8px;">${m.product?.name || "-"}</td>
                            <td style="border:1px solid #000; padding:8px; text-align:right;">${m.quantity}</td>
                            <td style="border:1px solid #000; padding:8px;">${m.reason || "-"}</td>
                          </tr>
                        </tbody>
                      </table>

                      <div style="display:flex; justify-content:space-between; margin-top:40px; text-align:center;">
                        <div style="width:30%;">
                          <b>Người lập phiếu</b><br/>
                          (Ký, ghi rõ họ tên)
                        </div>
                        <div style="width:30%;">
                          <b>Thủ kho</b><br/>
                          (Ký, ghi rõ họ tên)
                        </div>
                        <div style="width:30%;">
                          <b>Người duyệt</b><br/>
                          (Ký, ghi rõ họ tên)
                        </div>
                      </div>
                    `;

                    document.body.appendChild(temp);

                    await exportToPDF(temp, `Phieu_${m.id}.pdf`);

                    document.body.removeChild(temp);
                  }}
                  style={{
                    background: "#f59e0b",
                    color: "white",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Xuất PDF
                </button>
              </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}