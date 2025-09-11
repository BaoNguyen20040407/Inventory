"use client";
import { useState } from "react";
import ProductsTable from "./components/products_table";
import SuppliersTable from "./components/suppliers_table";
import CategoriesTable from "./components/categories_table";
import { useProducts } from "./hooks/useProducts";
import { useSuppliers } from "./hooks/useSuppliers";
import { useCategories } from "./hooks/useCategories";
import { useStockMovements } from "./hooks/useStockMovements";
import StockMovementsTable from "./components/stock_movements_table";

type PanelView = "products" | "suppliers" | "categories" | "inventory";

export default function HomePage() {
  const [activeView, setActiveView] = useState<PanelView>("products");

  const productsHook = useProducts();
  const suppliersHook = useSuppliers();
  const categoriesHook = useCategories();
  const stockMovementsHook = useStockMovements();

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
          <div className={`panel-section ${activeView === "suppliers" ? "active" : ""}`} onClick={() => setActiveView("suppliers")}>
            <h3>Nhà cung cấp</h3>
          </div>
          <div className={`panel-section ${activeView === "categories" ? "active" : ""}`} onClick={() => setActiveView("categories")}>
            <h3>Loại sản phẩm</h3>
          </div>
          <div className={`panel-section ${activeView === "products" ? "active" : ""}`} onClick={() => setActiveView("products")}>
            <h3>Sản phẩm</h3>
          </div>
          <div className={`panel-section ${activeView === "inventory" ? "active" : ""}`} onClick={() => setActiveView("inventory")}>
            <h3>Nhập / Xuất kho</h3>
          </div>
        </aside>

        {/* RIGHT */}
        <main className="right-panel">
          <div className="table-card">
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

            {activeView === "categories" && (
              <CategoriesTable
                categories={categoriesHook.categories}
                loading={categoriesHook.loading}
                onDelete={categoriesHook.deleteCategory}   // ✅ Thêm dòng này
              />
            )}

            {activeView === "inventory" && (
              <StockMovementsTable
                movements={stockMovementsHook.movements}
                loading={stockMovementsHook.loading}
              />
            )}

          </div>
        </main>
      </div>
    </div>
  );
}
