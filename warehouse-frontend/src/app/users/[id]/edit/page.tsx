"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("EMPLOYEE");
  const [isActive, setIsActive] = useState(true);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/users/${id}`
        );

        if (!res.ok)
          throw new Error("Không tìm thấy user");

        const data = await res.json();

        setUsername(data.username);
        setRole(data.role);
        setIsActive(data.isActive);
      } catch (err) {
        console.error(err);
        alert("Lỗi tải dữ liệu user");
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, router]);

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `http://localhost:3000/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            username,
            role,
            isActive,
          }),
        }
      );

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      alert("Cập nhật thành công");

      router.push("/");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Có lỗi khi cập nhật");
    }
  };

  if (loading)
    return (
      <p style={{ padding: 20 }}>
        Đang tải...
      </p>
    );

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
          👤 Sửa User
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
              placeholder="Username"
              value={username}
              onChange={(e) =>
                setUsername(e.target.value)
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

            <select
              value={
                isActive
                  ? "ACTIVE"
                  : "LOCKED"
              }
              onChange={(e) =>
                setIsActive(
                  e.target.value ===
                    "ACTIVE"
                )
              }
              className="form-input"
            >
              <option value="ACTIVE">
                ACTIVE
              </option>

              <option value="LOCKED">
                LOCKED
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
                  router.push("/")
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