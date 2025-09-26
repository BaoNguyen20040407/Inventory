import { useState, useEffect } from "react";

export interface Unit {
    id: number;
    name: string;
    description?: string;
}

export function useUnits() {
    const [units, setUnits] = useState<Unit[]>([]);
    const [loading, setLoading] = useState(true);

    //Fetch đơn vị tính
    const fetchUnits = async () => {
        try {
            setLoading(true);
            const res = await fetch("http://localhost:3000/unit");
            const data = await res.json();
            setUnits(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Lỗi fetch units", err);
            setUnits([]);
        } finally {
            setLoading(false);
        }
    };

    //Thêm đơn vị tính
    const addUnit = async (unit: Omit<Unit, "id">) => {
        try {
        const res = await fetch("http://localhost:3000/unit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(unit),
        });
        if (!res.ok) throw new Error("Thêm loại sản phẩm thất bại");
        await fetchUnits();
        } catch (err) {
        console.error(err);
        }
    };

    //Xóa đơn vị tính
    const deleteUnit = async (id: number) => {
        try {
        await fetch(`http://localhost:3000/unit/${id}`, {
            method: "DELETE",
        });
        setUnits((prev) => prev.filter((c) => c.id !== id));
        } catch (err) {
        console.error(err);
        }
    };

    useEffect(() => {
        fetchUnits();
    }, []);

    return { units, loading, fetchUnits, addUnit, deleteUnit };
}