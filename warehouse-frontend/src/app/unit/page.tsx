"use client";

import AppLayout from "../components/layout/app_layout";
import UnitTable from "../components/units_table";
import { useUnits } from "../hooks/useUnits";

export default function UnitPage() {
  const { units, loading, deleteUnit } = useUnits();

  return (
    <AppLayout active="unit">
      <UnitTable
        units={units}
        loading={loading}
        onDelete={deleteUnit}
      />
    </AppLayout>
  );
}