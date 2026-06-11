"use client";

import { useState } from "react";

export default function AppHeader() {
  const [showAccount, setShowAccount] = useState(false);

  const username =
    typeof window !== "undefined"
      ? localStorage.getItem("username")
      : "";

  return (
    <header
      className="app-header"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
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
          color: "#fff",
        }}
      >
        📦 Warehouse Management
      </h1>

      <div>
        <button
          onClick={() => setShowAccount(!showAccount)}
          style={{
            background: "#fff",
            padding: "6px 12px",
            borderRadius: "8px",
          }}
        >
          👤 {username}
        </button>

        {showAccount && (
          <div className="account-dropdown">
            <button>👤 Thông tin tài khoản</button>
            <button>🔑 Đổi mật khẩu</button>

            <button
              style={{ color: "red" }}
              onClick={() => {
                localStorage.clear();
                window.location.href = "/login";
              }}
            >
              🚪 Đăng xuất
            </button>
          </div>
        )}
      </div>
    </header>
  );
}