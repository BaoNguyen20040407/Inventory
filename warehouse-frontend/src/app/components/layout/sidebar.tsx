"use client";

import { useRouter } from "next/navigation";

interface Props {
  active: string;
}

export default function Sidebar({
  active,
}: Props) {
  const router = useRouter();

  const role =
    typeof window !== "undefined"
      ? localStorage.getItem("role")
      : "";

  return (
    <aside className="left-panel">
      <div
        className={`panel-section ${
          active === "dashboard"
            ? "active"
            : ""
        }`}
        onClick={() =>
          router.push("/dashboard")
        }
      >
        <h3>Dashboard</h3>
      </div>

      <div
        className={`panel-section ${
          active === "products"
            ? "active"
            : ""
        }`}
        onClick={() =>
          router.push("/products")
        }
      >
        <h3>Sản phẩm</h3>
      </div>

      <div
        className={`panel-section ${
          active === "inventory"
            ? "active"
            : ""
        }`}
        onClick={() =>
          router.push("/inventory")
        }
      >
        <h3>Nhập / Xuất kho</h3>
      </div>

      <div
        className={`panel-section ${
          active === "warehouse"
            ? "active"
            : ""
        }`}
        onClick={() =>
          router.push("/warehouse")
        }
      >
        <h3>Kho hàng</h3>
      </div>

      <div
        className={`panel-section ${
          active === "suppliers"
            ? "active"
            : ""
        }`}
        onClick={() =>
          router.push("/suppliers")
        }
      >
        <h3>Nhà cung cấp</h3>
      </div>

      <div
        className={`panel-section ${
          active === "categories"
            ? "active"
            : ""
        }`}
        onClick={() =>
          router.push("/categories")
        }
      >
        <h3>Loại sản phẩm</h3>
      </div>

      <div
        className={`panel-section ${
          active === "unit"
            ? "active"
            : ""
        }`}
        onClick={() =>
          router.push("/unit")
        }
      >
        <h3>Đơn vị tính</h3>
      </div>

      {role === "ADMIN" && (
        <div
          className={`panel-section ${
            active === "users"
              ? "active"
              : ""
          }`}
          onClick={() =>
            router.push("/users")
          }
        >
          <h3>Quản lý người dùng</h3>
        </div>
      )}
    </aside>
  );
}