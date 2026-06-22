"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ChangePasswordPage() {
  const router = useRouter();

  const [oldPassword, setOldPassword] =
    useState("");

  const [newPassword, setNewPassword] =
    useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      newPassword !== confirmPassword
    ) {
      alert(
        "Mật khẩu xác nhận không khớp"
      );
      return;
    }

    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        alert(
          data.message ||
            "Đổi mật khẩu thất bại"
        );
        return;
      }

      alert(
        "Đổi mật khẩu thành công"
      );

      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      alert(
        "Không kết nối được server"
      );
    } finally {
      setLoading(false);
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
          🔒 Đổi mật khẩu
        </h1>
      </header>

      <main className="right-panel">
        <div className="table-card">
          <form
            className="form"
            onSubmit={handleSubmit}
          >
            <input
              type="password"
              placeholder="Mật khẩu cũ"
              value={oldPassword}
              onChange={(e) =>
                setOldPassword(
                  e.target.value
                )
              }
              required
              className="form-input"
            />

            <input
              type="password"
              placeholder="Mật khẩu mới"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              required
              className="form-input"
            />

            <input
              type="password"
              placeholder="Xác nhận mật khẩu mới"
              value={
                confirmPassword
              }
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              required
              className="form-input"
            />

            <div className="form-actions">
              <button
                type="submit"
                disabled={loading}
                className="btn btn-green"
              >
                {loading
                  ? "Đang xử lý..."
                  : "Đổi mật khẩu"}
              </button>

              <button
                type="button"
                className="btn btn-gray"
                onClick={() =>
                  router.push(
                    "/dashboard"
                  )
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