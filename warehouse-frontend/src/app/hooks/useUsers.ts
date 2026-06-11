import { useEffect, useState } from "react";

export interface User {
  id: number;
  username: string;
  role: string;
  is_active: number;
  created_at: string;
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Lỗi load users:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await fetch(`http://localhost:3000/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Lỗi xóa user:", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    deleteUser,
    refetch: fetchUsers,
  };
}