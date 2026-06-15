"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AppHeader from "@/app/components/layout/app_header";

export default function AddUserPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("EMPLOYEE");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res = await fetch(
        "http://localhost:3000/users",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            fullName,
            email,
            phone, 
            username,
            password,
            role,
            is_active: true,
          }),
        }
      );

      if (!res.ok) {
        const errorText =
          await res.text();

        throw new Error(
          `Tạo user thất bại: ${res.status} - ${errorText}`
        );
      }

      alert("Tạo tài khoản thành công");

      router.push("/user");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi tạo tài khoản");
    }
  };

  return (
    <div className="app-container">
      <AppHeader title="👤 Thêm người dùng" />

      <main className="right-panel">
        <div className="table-card">
          <form
            className="form"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Họ tên"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
              required
              className="form-input"
            />

            <input
              type="text"
              placeholder="Số điện thoại"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
              required
              className="form-input"
            />

            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="form-input"
            />

            <input
              type="text"
              placeholder="Tên đăng nhập"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
              }
              required
              className="form-input"
            />

            <input
              type="password"
              placeholder="Mật khẩu"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
              className="form-input"
            />

            <select
              value={role}
              onChange={(e) =>
                setRole(e.target.value)
              }
              className="form-input"
            >
              <option value="ADMIN">
                ADMIN
              </option>

              <option value="EMPLOYEE">
                EMPLOYEE
              </option>
            </select>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-green"
              >
                Lưu
              </button>

              <button
                type="button"
                className="btn btn-gray"
                onClick={() =>
                  router.push("/users")
                }
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