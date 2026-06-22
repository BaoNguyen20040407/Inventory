"use client";

import AppLayout from "../components/layout/app_layout";
import WarehouseTable from "../components/warehouse_table";
import { useWarehouse } from "../hooks/useWarehouse";

export default function WarehousePage() {
  const { warehouse, loading, deleteWarehouse } = useWarehouse();

  return (
    <AppLayout active="warehouse">
      <WarehouseTable
        warehouse={warehouse}
        loading={loading}
        onDelete={deleteWarehouse}
      />
    </AppLayout>
  );
}