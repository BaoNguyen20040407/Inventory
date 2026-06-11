"use client";

import AppLayout from "../components/layout/app_layout";
import ProductsTable from "../components/products_table";
import { useProducts } from "../hooks/useProducts";

export default function ProductsPage() {
  const productsHook = useProducts();

  return (
    <AppLayout active="products">
      <ProductsTable
        products={productsHook.products}
        loading={productsHook.loading}
        onUpdateQuantity={
          productsHook.updateQuantity
        }
      />
    </AppLayout>
  );
}