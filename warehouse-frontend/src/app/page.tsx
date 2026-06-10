"use client";
import { useState } from "react";
import ProductsTable from "./components/products_table";
import SuppliersTable from "./components/suppliers_table";
import CategoriesTable from "./components/categories_table";
import StockMovementsTable from "./components/inventory_table";
import { useProducts } from "./hooks/useProducts";
import { useSuppliers } from "./hooks/useSuppliers";
import { useCategories } from "./hooks/useCategories";
import { useStockMovements } from "./hooks/useInventory";
import { useWarehouse } from "./hooks/useWarehouse";
import WarehouseTable from "./components/warehouse_table";
import { useUnits } from "./hooks/useUnits";
import UnitsTable from "./components/units_table";
import Dashboard from "./components/dashboard";

type PanelView = "dashboard" | "products" | "suppliers" | "categories" | "inventory" | "warehouse" | "units";

export default function HomePage() {
  const [activeView, setActiveView] = useState<PanelView>("dashboard");

  const productsHook = useProducts();
  const suppliersHook = useSuppliers();
  const categoriesHook = useCategories();
  const stockMovementsHook = useStockMovements();
  const warehouseHook = useWarehouse();
  const unitHook = useUnits();

  const totalImport = stockMovementsHook.movements.filter(
    (m) => m.type === "Import"
  ).length

  const totalExport = stockMovementsHook.movements.filter(
    (m) => m.type === "Export"
  ).length

  const lowStockProducts = productsHook.products.filter(
    (p) => p.quantity <= 5
  ).length

  const totalStock = productsHook.products.reduce(
    (sum, product) => sum + Number(product.quantity || 0), 0
  );

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo"><img 
        src="https://static.vecteezy.com/system/resources/previews/004/891/075/non_2x/the-initials-w-logo-is-simple-and-modern8868-free-vector.jpg" 
        alt="Logo" 
        style={{ width: "40px", height: "40px", objectFit: "contain" }}
      /></div>
        <h1 style={{ fontSize: "1.6rem", margin: 0, color: "#ffffff" }}>📦 Warehouse Management</h1>
      </header>

      <div className="app-grid">
        {/* LEFT */}
        <aside className="left-panel">
          <div className={`panel-section ${activeView === "dashboard" ? "active" : ""}`} onClick={() => setActiveView("dashboard")}>
            <h3>Dashboard</h3>
          </div>
          <div className={`panel-section ${activeView === "products" ? "active" : ""}`} onClick={() => setActiveView("products")}>
            <h3>Sản phẩm</h3>
          </div>
          <div className={`panel-section ${activeView === "inventory" ? "active" : ""}`} onClick={() => setActiveView("inventory")}>
            <h3>Nhập / Xuất kho</h3>
          </div>
          <div className={`panel-section ${activeView === "warehouse" ? "active" : ""}`} onClick={() => setActiveView("warehouse")}>
            <h3>Kho hàng</h3>
          </div>
          <div className={`panel-section ${activeView === "suppliers" ? "active" : ""}`} onClick={() => setActiveView("suppliers")}>
            <h3>Nhà cung cấp</h3>
          </div>
          <div className={`panel-section ${activeView === "categories" ? "active" : ""}`} onClick={() => setActiveView("categories")}>
            <h3>Loại sản phẩm</h3>
          </div>
          <div className={`panel-section ${activeView === "units" ? "active" : ""}`} onClick={() => setActiveView("units")}>
            <h3>Đơn vị tính</h3>
          </div>
        </aside>

        {/* RIGHT */}
        <main className="right-panel">
          <div className="table-card">
            {activeView === "dashboard" &&(
              <Dashboard
                totalProducts={productsHook.products.length}
                totalSuppliers={suppliersHook.suppliers.length}
                totalCategories={categoriesHook.categories.length}
                totalMovements={stockMovementsHook.movements.length}
                totalImport = {totalImport}
                totalExport = {totalExport}
                lowStockProducts = {lowStockProducts}
                totalStock = {totalStock}
              />
            )}
            {activeView === "products" && (
              <ProductsTable
                products={productsHook.products}
                loading={productsHook.loading}
                onUpdateQuantity={productsHook.updateQuantity}
              />
            )}

            {activeView === "suppliers" && (
              <SuppliersTable 
                suppliers={suppliersHook.suppliers} 
                loading={suppliersHook.loading}
                deleteSupplier={suppliersHook.deleteSupplier} />
            )}

            {activeView === "units" && (
              <UnitsTable 
                units={unitHook.units} 
                loading={unitHook.loading}
                onDelete={unitHook.deleteUnit} />
            )}

            {activeView === "categories" && (
              <CategoriesTable
                categories={categoriesHook.categories}
                loading={categoriesHook.loading}
                onDelete={categoriesHook.deleteCategory}
              />
            )}

            {activeView === "warehouse" && (
              <WarehouseTable
                warehouse={warehouseHook.warehouse}
                loading={warehouseHook.loading}
                onDelete={warehouseHook.deleteWarehouse}
              />
            )}

            {activeView === "inventory" && (
              <StockMovementsTable
                movements={stockMovementsHook.movements}
                loading={stockMovementsHook.loading}
                products={productsHook.products}   
              />
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
