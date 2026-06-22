"use client";

import AppLayout from "../components/layout/app_layout";
import UsersTable from "../components/users_table";
import { useUsers } from "../hooks/useUsers";

export default function UserPage() {
  const { users, loading, deleteUser } = useUsers();

  return (
    <AppLayout active="users">
      <UsersTable
        users={users}
        loading={loading}
        onDelete={deleteUser}
      />
    </AppLayout>
  );
}