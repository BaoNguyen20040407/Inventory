"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/app/components/layout/app_header";


export default function ProfilePage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setUsername(
      localStorage.getItem("username") || ""
    );
  
    setFullName(
      localStorage.getItem("fullName") || ""
    );
  
    setRole(
      localStorage.getItem("role") || ""
    );

    setPhone(
        localStorage.getItem("phone") || ""
    );

    setEmail(
        localStorage.getItem("email") || ""
    );

    setIsActive(
        localStorage.getItem("isActive") === "true"
      );
  }, []);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      // TODO: API cập nhật tài khoản

      alert("Cập nhật thành công");
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra");
    }
  };

  return (
    <div className="app-container">
      <AppHeader title="👤 Thông Tin Tài Khoản" />

      <main className="right-panel">
        <div className="table-card">
          <form onSubmit={handleSubmit}>
          <div className="profile-grid">

            <label>Họ và tên</label>
                <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="form-input"
                />

            <label>Tên đăng nhập</label>
                <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                />

            <label>Số điện thoại</label>
                <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="form-input"
                />

            <label>Email</label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                />

            <label>Vai trò</label>
                <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="form-input"
                >
                <option value="ADMIN">Quản trị viên</option>
                <option value="EMPLOYEE">Nhân viên</option>
                </select>

            <label>Trạng thái</label>
                <select
                value={isActive ? "ACTIVE" : "LOCKED"}
                onChange={(e) =>
                    setIsActive(e.target.value === "ACTIVE")
                }
                className="form-input"
                >
                <option value="ACTIVE">Hoạt động</option>
                <option value="LOCKED">Khóa</option>
                </select>

            </div>

            <div className="form-actions mt-6">
              <button
                type="button"
                className="btn btn-gray"
                onClick={() =>
                  router.back()
                }
              >
                Quay về
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}