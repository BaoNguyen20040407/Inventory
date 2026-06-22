"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import AppHeader from "@/app/components/layout/app_header";

export default function EditUserPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("EMPLOYEE");
  const [isActive, setIsActive] = useState(true);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`
        );

        if (!res.ok)
          throw new Error("Không tìm thấy user");

        const data = await res.json();

        setUsername(data.username);
        setRole(data.role);
        setIsActive(data.isActive);
        setFullName(data.fullName);
        setPhone(data.phone);
        setEmail(data.email);
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
        `${process.env.NEXT_PUBLIC_API_URL}/users/${id}`,
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
            fullName,
            phone, 
            email,
          }),
        }
      );

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      alert("Cập nhật thành công");

      router.push("/users");
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
      <AppHeader title = "👤 Sửa Người dùng"/>

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