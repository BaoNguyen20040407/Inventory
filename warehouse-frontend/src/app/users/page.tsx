"use client";

import AppLayout from "../components/layout/app_layout";
import UsersTable from "../components/users_table";
import { useUsers } from "../hooks/useUsers";

export default function UserPage() {
  const userHook = useUsers();

  const handleDelete = (id: number) => {
    console.log("delete user:", id);
    // TODO: call API delete
  };

  return (
    <AppLayout active="users">
      <UsersTable
        users={userHook.users}
        loading={userHook.loading}
        onDelete={handleDelete}
      />
    </AppLayout>
  );
}