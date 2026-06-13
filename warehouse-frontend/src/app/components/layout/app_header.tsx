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
        position: "relative",
      }}
    >
      {/* LOGO */}
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

      {/* TITLE */}
      <h1
        style={{
          fontSize: "1.6rem",
          margin: 0,
          color: "#fff",
        }}
      >
        📦 Warehouse Management
      </h1>

      {/* ACCOUNT */}
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setShowAccount(!showAccount)}
          style={{
            background: "#fff",
            padding: "6px 12px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          👤 {username}
        </button>

        {showAccount && (
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "110%",
              background: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              width: "180px",
              zIndex: 999,
              overflow: "hidden",
            }}
          >
            <button style={btnStyle}>👤 Thông tin tài khoản</button>
            <button 
              style={btnStyle}
              onClick={() => {
                window.location.href = "/change-password";
              }}
              >🔑 Đổi mật khẩu</button>

            <button
              style={{ ...btnStyle, color: "red" }}
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

const btnStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px",
  textAlign: "left",
  background: "white",
  border: "none",
  cursor: "pointer",
};