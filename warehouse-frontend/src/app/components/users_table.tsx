"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export interface User {
  id: number;
  username: string;
  role: string;
  isActive: boolean;
  created_at: string;
}

interface Props {
  users: User[];
  loading: boolean;
  onDelete: (id: number) => void;
}

export default function UsersTable({ users, loading, onDelete }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");

  if (loading)
    return <p style={{ padding: 16, color: "#6b7280" }}>Loading...</p>;

  const filteredUsers = users.filter(
    (u) =>
      u.username.toLowerCase().includes(search.toLowerCase()) ||
      u.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    if (confirm("Bạn có chắc chắn muốn xóa user này không?")) {
      onDelete(id);
      alert("Xóa thành công");
    }
  };

  return (
    <div className="table-wrapper">
      {/* SEARCH + ADD */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12,
          gap: 12,
        }}
      >
        <input
          type="text"
          placeholder="Tìm kiếm user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            flex: 1,
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />

        <button
          onClick={() => router.push("/users/add")}
          style={{
            backgroundColor: "green",
            color: "white",
            fontWeight: "bold",
            padding: "8px 14px",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          + Thêm
        </button>
      </div>

      {/* TABLE */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan={6} style={{ textAlign: "center", padding: 20 }}>
                Không có user
              </td>
            </tr>
          ) : (
            filteredUsers.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>

                {/* ROLE */}
                <td>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "6px",
                      background:
                        u.role === "ADMIN" ? "#ffd54f" : "#cfd8dc",
                      fontWeight: "bold",
                    }}
                  >
                    {u.role}
                  </span>
                </td>

                {/* ACTIVE */}
                <td>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "6px",
                      background: u.isActive ? "#c8e6c9" : "#ffcdd2",
                      fontWeight: "bold",
                    }}
                  >
                    {u.isActive ? "ACTIVE" : "LOCKED"}
                  </span>
                </td>

                {/* ACTION */}
                <td>
                  <button
                    className="btn-small btn-green"
                    onClick={() => router.push(`/users/${u.id}/edit`)}
                  >
                    Sửa
                  </button>

                  <button
                    className="btn-small btn-red"
                    onClick={() => handleDelete(u.id)}
                  >
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}