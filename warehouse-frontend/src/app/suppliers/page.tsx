"use client";

import AppLayout from "../components/layout/app_layout";
import SuppliersTable from "../components/suppliers_table";
import { useSuppliers } from "../hooks/useSuppliers";

export default function SupplierPage() {
  const { suppliers, loading, deleteSupplier } = useSuppliers();

  return (
    <AppLayout active="suppliers">
      <SuppliersTable
        suppliers={suppliers}
        loading={loading}
        deleteSupplier={deleteSupplier}
      />
    </AppLayout>
  );
}