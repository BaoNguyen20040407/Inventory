"use client"
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AppHeader from "@/app/components/layout/app_header";

export default function EditWarehousePage() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [manager, setManager] = useState("");
    const [loading, setLoading] = useState(true);

    // Lấy dữ liệu NCC cần sửa
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/warehouse/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy kho hàng");
        const data = await res.json();
        setName(data.name || "");
        setAddress(data.address || "");
        setManager(data.manager || "")
      } catch (err) {
        console.error(err);
        alert("Lỗi khi tải dữ liệu kho hàng");
        router.push("/");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:3000/warehouse/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, address, manager }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Cập nhật thất bại: ${res.status} - ${errorText}`);
      }

      router.push("/warehouse");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi cập nhật");
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Đang tải...</p>;

  return(
    <div className="app-container">
        <AppHeader title = "✏️ Sửa Kho hàng"/>

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
  )
}