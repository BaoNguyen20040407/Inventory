"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        // lưu token (nếu backend trả về)
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", data.username);
  
        router.push("/dashboard");
      } else {
        alert(data.message || "Sai tài khoản hoặc mật khẩu");
      }
    } catch (error) {
      alert("Không kết nối được server");
    }
  };

  return (
    <div className="login-container">
      <form
        className="login-card"
        onSubmit={handleLogin}
      >
        <h2>Đăng nhập</h2>

        <input
          type="text"
          placeholder="Tên đăng nhập"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button type="submit">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}