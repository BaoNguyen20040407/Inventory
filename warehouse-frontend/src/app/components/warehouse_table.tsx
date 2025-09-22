"use client";
import { useRouter } from "next/navigation";
import { Warehouse } from "../hooks/useWarehouse";
import { useState } from "react";

interface Props {
    warehouse: Warehouse[];
    loading: boolean;
    onDelete: (id: number) => void;
}

export default function WarehouseTable({warehouse, loading, onDelete}: Props)
{
    const router = useRouter();
    const [search, setSearch] = useState("");
    
    if(loading) return <p style = {{padding: 16, color: "#6b7280"}}>Loading...</p>;

    const filteredWarehouse = warehouse.filter(
        (s) =>
            s.name.toLowerCase().includes(search.toLowerCase()) ||
        (s.address || "").toLowerCase().includes(search.toLowerCase()) ||
        (s.manager || "").toLowerCase().includes(search.toLowerCase())
    );

    const handleDelete = (id: number) => {
        if(confirm("Bạn có chắc chắn muốn xóa kho hàng này không?")) {
            onDelete(id);
            alert("Xóa thành công");
        }
    }

    return(
        <div className="table-wrapper">
            <div style={{display: "flex", justifyContent: "space-between", marginBottom: 12, gap: 12}}>
                <input
                    type="text"
                    placeholder="Tìm kiếm kho..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        flex: 1,
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        fontSize: "14px",
                    }}
                />
                
                <button
                    onClick={() => router.push("/warehouse/add")}
                    style={{
                        backgroundColor: "green",
                        color: "white",
                        fontWeight: "bold",
                        padding: "8px 14px",
                        borderRadius: "6px",
                        border: "none",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        cursor: "pointer",
                    }}
                    >
                    <span style={{fontSize: "18px"}}>+</span> Thêm
                    </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên kho</th>
                        <th>Địa chỉ</th>
                        <th>Quản lý</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredWarehouse.length === 0 ? (
                        <tr>
                            <td colSpan={4} style={{ textAlign: "center", padding: 20}}>
                                Không có kho
                            </td>
                        </tr>
                    ) : (
                        filteredWarehouse.map((c) => (
                            <tr key={c.id}>
                                <td>{c.id}</td>
                                <td>{c.name}</td>
                                <td>{c.address}</td>
                                <td>{c.manager}</td>
                                <td>
                                <button
                                    className="btn-small btn-green"
                                    onClick={() => router.push(`/warehouse/${c.id}/edit`)}
                                    >
                                    Sửa
                                </button>
                                <button
                                    onClick={() => handleDelete(c.id)}
                                    className="btn-small btn-red"
                                >
                                    Xóa
                                </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}