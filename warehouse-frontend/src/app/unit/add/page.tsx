"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUnitPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const res = await fetch("http://localhost:3000/unit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description: description || null }),
          });
    
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Lưu đơn vị tính thất bại: ${res.status} - ${errorText}`);
          }
    
          router.push("/");
          router.refresh(); // ✅ reload data
        } catch (err) {
          console.error(err);
          alert("Có lỗi khi lưu");
        }
      };
    
    return(
        <div className="app-container">
            <header className="app-header">
                <div className="logo">
                    <img 
                        src="https://static.vecteezy.com/system/resources/previews/004/891/075/non_2x/the-initials-w-logo-is-simple-and-modern8868-free-vector.jpg"
                        alt="Logo"
                        style={{ 
                            width: "40px", 
                            height: "40px", 
                            objectFit: "contain"
                        }}
                    />
                </div>
                <h1 style={{ fontSize: "1.6rem", margin: 0, color: "#ffffff"}}>📦 Thêm Đơn vị tính</h1>
            </header>

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
                                onClick={() => router.push("/")}
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