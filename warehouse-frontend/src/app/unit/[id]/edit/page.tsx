"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AppHeader from "@/app/components/layout/app_header";

export default function EditUnitPage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string; 

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);

    //Lấy dữ liệu đơn vị tính cần sửa
    useEffect(() => {
        if (!id) return;
        const fetchData = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/unit/${id}`);
                if (!res.ok) throw new Error("Không tìm thấy đơn vị tính");
                const data = await res.json();
                setName(data.name || "");
                setDescription(data.description || "");
            } catch (err) {
                console.error(err);
                alert("Lỗi khi tải dữ liệu đơn vị tính");
                router.push("/")
            } finally {
                setLoading(false)
            }
        };
        fetchData();
    }, [id, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/unit/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, description: description || null }),
          });
    
          if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Cập nhật đơn vị tính thất bại: ${res.status} - ${errorText}`);
          }
    
          router.push("/unit");
          router.refresh(); 
        } catch (err) {
          console.error(err);
          alert("Có lỗi cập nhật");
        }
      };
    
    if (loading) return <p style={{ padding: 20 }}>Đang tải...</p>;
    
    return(
        <div className="app-container">
            <AppHeader title = "✏️ Sửa Đơn vị tính"/>

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