"use client";

import AppLayout from "../components/layout/app_layout";
import WarehouseTable from "../components/warehouse_table";
import { useWarehouse } from "../hooks/useWarehouse";

export default function WarehousePage() {
  const warehouseHook = useWarehouse();

  const handleDelete = (id: number) => {
    console.log("delete warehouse:", id);
    // TODO: gọi API delete
  };

  return (
    <AppLayout active="warehouse">
      <WarehouseTable
        warehouse={warehouseHook.warehouse}
        loading={warehouseHook.loading}
        onDelete={handleDelete}
      />
    </AppLayout>
  );
}