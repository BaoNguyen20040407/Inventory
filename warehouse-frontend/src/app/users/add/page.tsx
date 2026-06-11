"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddUserPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
      <header className="app-header">
        <div className="logo">
          <img
            src="https://static.vecteezy.com/system/resources/previews/004/891/075/non_2x/the-initials-w-logo-is-simple-and-modern8868-free-vector.jpg"
            alt="Logo"
            style={{
              width: "40px",
              height: "40px",
              objectFit: "contain",
            }}
          />
        </div>

        <h1
          style={{
            fontSize: "1.6rem",
            margin: 0,
            color: "#ffffff",
          }}
        >
          👤 Thêm người dùng
        </h1>
      </header>

      <main className="right-panel">
        <div className="table-card">
          <form
            className="form"
            onSubmit={handleSubmit}
          >
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
                  router.push("/user")
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