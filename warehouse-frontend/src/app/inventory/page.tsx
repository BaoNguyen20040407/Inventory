"use client";

import AppLayout from "../components/layout/app_layout";
import StockMovementsTable from "../components/inventory_table";

import { useStockMovements } from "../hooks/useInventory";
import { useProducts } from "../hooks/useProducts";

export default function InventoryPage() {
  const stockMovementsHook = useStockMovements();
  const productsHook = useProducts();

  return (
    <AppLayout active="inventory">
      <StockMovementsTable
        movements={stockMovementsHook.movements}
        loading={stockMovementsHook.loading}
        products={productsHook.products}
      />
    </AppLayout>
  );
}