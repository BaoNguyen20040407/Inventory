interface DashboardProps {
    totalProducts: number;
    totalSuppliers: number;
    totalCategories: number;
    totalMovements: number;
    totalImport: number;
    totalExport: number;
    lowStockProducts: number;
    totalStock: number;
}

export default function Dashboard ({
    totalProducts,
    totalSuppliers,
    totalCategories,
    totalMovements,
    totalImport,
    totalExport,
    lowStockProducts,
    totalStock,
} : DashboardProps) {
    return (
        <div className = "dashboard">
            <div className = "stat-card">
                <h3>Sản phẩm</h3>
                <p>{totalProducts}</p>
            </div>

            <div className = "stat-card">
                <h3>Nhà cung cấp</h3>
                <p>{totalSuppliers}</p>
            </div>

            <div className = "stat-card">
                <h3>Loại sản phẩm</h3>
                <p>{totalCategories}</p>
            </div>

            <div className = "stat-card">
                <h3>Phiếu nhập/ xuất</h3>
                <p>{totalMovements}</p>
            </div>

            <div className = "stat-card">
                <h3>Phiếu nhập</h3>
                <p>{totalImport}</p>
            </div>

            <div className = "stat-card">
                <h3>Phiếu xuất</h3>
                <p>{totalExport}</p>
            </div>

            <div className = "stat-card">
                <h3>Sắp hết hàng</h3>
                <p>{lowStockProducts}</p>
            </div>

            <div className = "stat-card">
                <h3>Tổng tồn kho</h3>
                <p>{totalStock}</p>
            </div>
        </div>
    )
}