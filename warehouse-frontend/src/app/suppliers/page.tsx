"use client";

import AppLayout from "../components/layout/app_layout";
import SuppliersTable from "../components/suppliers_table";
import { useSuppliers } from "../hooks/useSuppliers";

export default function SupplierPage() {
  const supplierHook = useSuppliers();

  const deleteSupplier = (id: number) => {
    console.log("delete supplier:", id);
    // TODO: call API delete
  };

  return (
    <AppLayout active="suppliers">
      <SuppliersTable
        suppliers={supplierHook.suppliers}
        loading={supplierHook.loading}
        deleteSupplier={deleteSupplier}
      />
    </AppLayout>
  );
}