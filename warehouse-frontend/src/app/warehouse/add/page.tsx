"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/app/components/layout/app_header";

export default function AddWarehousePage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [manager, setManager] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const res = await fetch("http://localhost:3000/warehouse", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, address, manager }),
          });
    
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Lưu nhà cung cấp thất bại: ${res.status} - ${errorText}`);
          }
    
          router.push("/warehouse");
          router.refresh(); // ✅ reload data
        } catch (err) {
          console.error(err);
          alert("Có lỗi khi lưu");
        }
      };
    
      return(
        <div className="app-container">
            <AppHeader title = "📦 Thêm Kho hàng"/>

            <main className="right-panel">
                <div className="table-card">
                    <form className="form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Tên kho"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="form-input"
                        />
                        <input
                            type="text"
                            placeholder="Địa chỉ"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            className="form-input"
                        />
                        <input
                            type="text"
                            placeholder="Quản lý"
                            value={manager}
                            onChange={(e) => setManager(e.target.value)}
                            required
                            className="form-input"    
                        />

                        <div className="form-actions">
                            <button type="submit" className="btn btn-green">
                                Lưu
                            </button>
                            <button
                                type="button"
                                className="btn btn-gray"
                                onClick={() => router.push("/warehouse")}>
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
      );
}