import { useEffect, useState } from "react";

export interface Product {
  id: number;
  name: string;
  quantity: number;
  price: number;
  category?: { id: number; name: string };
  supplier?: { id: number; name: string };
  warehouse?: { id: number; name: string};
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();
    setProducts(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const updateQuantity = async (id: number, change: number) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const newQty = product.quantity + change;
    if (newQty < 0) return alert("Số lượng không đủ để xuất");

    await fetch(`http://localhost:3000/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity: newQty }),
    });
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, fetchProducts, updateQuantity };
}
