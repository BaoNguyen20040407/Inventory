"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/app/components/layout/app_header";

export default function AddUnitPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/unit`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description: description || null }),
          });
    
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Lưu đơn vị tính thất bại: ${res.status} - ${errorText}`);
          }
    
          router.push("/unit");
          router.refresh(); // ✅ reload data
        } catch (err) {
          console.error(err);
          alert("Có lỗi khi lưu");
        }
      };
    
    return(
        <div className="app-container">
            <AppHeader title = "📦 Thêm Đơn vị tính"/>
            <main className="right-panel">
                <div className="table-card">
                    <form className="form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Tên đơn vị tính"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="form-input"
                        />
                        <input
                            type="text"
                            placeholder="Mô tả"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="form-input"
                        />

                        <div className="form-actions">
                            <button type="submit" className="btn btn-green">
                                Lưu
                            </button>
                            <button
                                type="button"
                                className="btn btn-gray"
                                onClick={() => router.push("/unit")}
                            >
                                Hủy    
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    )
}