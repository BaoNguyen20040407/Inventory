"use client";
import { useState } from "react";
import ProductsTable from "../components/products_table";
import SuppliersTable from "../components/suppliers_table";
import CategoriesTable from "../components/categories_table";
import StockMovementsTable from "../components/inventory_table";
import { useProducts } from "../hooks/useProducts";
import { useSuppliers } from "../hooks/useSuppliers";
import { useCategories } from "../hooks/useCategories";
import { useStockMovements } from "../hooks/useInventory";
import { useWarehouse } from "../hooks/useWarehouse";
import WarehouseTable from "../components/warehouse_table";
import { useUnits } from "../hooks/useUnits";
import UnitsTable from "../components/units_table";
import Dashboard from "../components/dashboard";
import UsersTable from "../components/users_table";
import { useUsers } from "../hooks/useUsers";

type PanelView = "dashboard" | "products" | "suppliers" | "categories" | "inventory" | "warehouse" | "units" | "users";

export default function HomePage() {
  const [activeView, setActiveView] = useState<PanelView>("dashboard");

  const productsHook = useProducts();
  const suppliersHook = useSuppliers();
  const categoriesHook = useCategories();
  const stockMovementsHook = useStockMovements();
  const warehouseHook = useWarehouse();
  const unitHook = useUnits();
  const userHook = useUsers();

  const [showAccount, setShowAccount] = useState(false);

  const username =
    typeof window !== "undefined"
      ? localStorage.getItem("username")
      : "";

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

  const role = typeof window !== "undefined"
    ? localStorage.getItem("role")
    : "";

  return (
    <div className="app-container">
      <header
  className="app-header"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  }}
>
  {/* LEFT */}
  <div className="logo">
    <img
      src="https://static.vecteezy.com/system/resources/previews/004/891/075/non_2x/the-initials-w-logo-is-simple-and-modern8868-free-vector.jpg"
      alt="Logo"
      style={{ width: "40px", height: "40px", objectFit: "contain" }}
    />
  </div>

  {/* CENTER */}
  <h1 style={{ fontSize: "1.6rem", margin: 0, color: "#ffffff" }}>
    📦 Warehouse Management
  </h1>

  {/* RIGHT - ADMIN */}
  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <button
      onClick={() => setShowAccount(!showAccount)}
      style={{
        background: "#fff",
        padding: "6px 12px",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      👤 {username || "Admin"}
    </button>

    {/* DROPDOWN */}
    {showAccount && (
      <div
        style={{
          position: "absolute",
          right: 20,
          top: 60,
          background: "#fff",
          border: "1px solid #ddd",
          borderRadius: "8px",
          width: "180px",
          zIndex: 999,
        }}
      >
        <div style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
          <strong>{username || "Admin"}</strong>
        </div>

        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            background: "transparent", // 👈 bỏ nền xám
            border: "none",            // 👈 bỏ viền mặc định
            cursor: "pointer",
          }}
          onClick={() => alert("Thông tin tài khoản")}
        >
          👤 Thông tin tài khoản
        </button>

        <button
          style={{
            width: "100%",
            padding: "10px",
            textAlign: "left",
            background: "transparent", // 👈 bỏ nền xám
            border: "none",            // 👈 bỏ viền mặc định
            cursor: "pointer",
          }}
          onClick={() => alert("Đổi mật khẩu")}
        >
          🔑 Đổi mật khẩu
        </button>

        <button
          style={{ 
            width: "100%", 
            padding: "10px", 
            textAlign: "left",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            color: "red" }}
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          🚪 Đăng xuất
        </button>
      </div>
    )}
  </div>
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
          {role === "ADMIN" && (
            <div
              className={`panel-section ${
                activeView === "users" ? "active" : ""
              }`}
              onClick={() => setActiveView("users")}
            >
              <h3>Quản lý người dùng</h3>
            </div>
          )}
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

            {activeView === "users" && role === "ADMIN" && (
              <UsersTable
                users={userHook.users}
                loading={userHook.loading}
                onDelete={userHook.deleteUser}
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
