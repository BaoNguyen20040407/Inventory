"use client";

import AppLayout from "../components/layout/app_layout";
import UnitTable from "../components/units_table";
import { useUnits } from "../hooks/useUnits";

export default function UnitPage() {
  const unitHook = useUnits();

  const handleDelete = (id: number) => {
    console.log("delete unit:", id);
    // TODO: call API delete
  };

  return (
    <AppLayout active="unit">
      <UnitTable
        units={unitHook.units}
        loading={unitHook.loading}
        onDelete={handleDelete}
      />
    </AppLayout>
  );
}