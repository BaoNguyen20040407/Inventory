"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditSupplierPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);

  // Lấy dữ liệu NCC cần sửa
  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/suppliers/${id}`);
        if (!res.ok) throw new Error("Không tìm thấy nhà cung cấp");
        const data = await res.json();
        setName(data.name || "");
        setAddress(data.address || "");
        setPhone(data.phone || "");
      } catch (err) {
        console.error(err);
        alert("Lỗi khi tải dữ liệu NCC");
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
      const res = await fetch(`http://localhost:3000/suppliers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, address, phone }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Cập nhật thất bại: ${res.status} - ${errorText}`);
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi cập nhật");
    }
  };

  if (loading) return <p style={{ padding: 20 }}>Đang tải...</p>;

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">
          <img
            src="https://static.vecteezy.com/system/resources/previews/004/891/075/non_2x/the-initials-w-logo-is-simple-and-modern8868-free-vector.jpg"
            alt="Logo"
            style={{ width: "40px", height: "40px", objectFit: "contain" }}
          />
        </div>
        <h1 style={{ fontSize: "1.6rem", margin: 0, color: "#ffffff" }}>
          ✏️ Sửa Nhà Cung Cấp
        </h1>
      </header>

      <main className="right-panel">
        <div className="table-card">
          <form className="form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Tên nhà cung cấp"
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
              className="form-input"
            />
            <input
              type="text"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
  );
}
