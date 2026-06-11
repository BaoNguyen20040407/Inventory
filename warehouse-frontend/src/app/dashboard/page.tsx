"use client";

import AppLayout from "../components/layout/app_layout";
import Dashboard from "../components/dashboard";

import { useProducts } from "../hooks/useProducts";
import { useSuppliers } from "../hooks/useSuppliers";
import { useCategories } from "../hooks/useCategories";
import { useStockMovements } from "../hooks/useInventory";

export default function HomePage() {
  const productsHook = useProducts();
  const suppliersHook = useSuppliers();
  const categoriesHook = useCategories();
  const stockMovementsHook = useStockMovements();

  const totalImport = stockMovementsHook.movements.filter(
    (m) => m.type === "Import"
  ).length;

  const totalExport = stockMovementsHook.movements.filter(
    (m) => m.type === "Export"
  ).length;

  const lowStockProducts = productsHook.products.filter(
    (p) => p.quantity <= 5
  ).length;

  const totalStock = productsHook.products.reduce(
    (sum, product) => sum + Number(product.quantity || 0),
    0
  );

  return (
    <AppLayout active="dashboard">
      <Dashboard
        totalProducts={productsHook.products.length}
        totalSuppliers={suppliersHook.suppliers.length}
        totalCategories={categoriesHook.categories.length}
        totalMovements={stockMovementsHook.movements.length}
        totalImport={totalImport}
        totalExport={totalExport}
        lowStockProducts={lowStockProducts}
        totalStock={totalStock}
      />
    </AppLayout>
  );
}