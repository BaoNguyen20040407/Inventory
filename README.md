# 📦 Warehouse Management System

A web-based Warehouse Management System designed to streamline inventory control, product management, supplier management, and warehouse operations.

## 🚀 Live Demo

**Frontend:**
https://inventory-three-black.vercel.app

**Backend API:**
(Add your Swagger API URL here)

## 📖 Overview

This project provides a comprehensive solution for managing warehouse operations, including inventory tracking, stock movements, suppliers, product categories, and user management.

The system helps organizations monitor stock levels, manage incoming and outgoing goods, and maintain accurate inventory records in real time.


## ✨ Features

### Dashboard

* Total products overview
* Total suppliers overview
* Total product categories overview
* Import/Export receipt statistics
* Import receipt statistics
* Export receipt statistics
* Low-stock product alerts
* Total inventory quantity

### Product Management

* Create products
* Update product information
* Delete products
* Search products
* Monitor stock quantity

### Inventory Management

* Record stock imports
* Record stock exports
* Automatically update inventory levels
* Maintain transaction history

### Supplier Management

* Add suppliers
* Update supplier information
* Delete suppliers
* Search suppliers

### Product Category Management

* Create categories
* Update categories
* Delete categories

### Unit Management

* Create measurement units
* Update units
* Delete units

### User Management

* User authentication
* User account management
* Role-based access control


## 🛠️ Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS
* Axios

### Backend

* NestJS
* TypeORM
* PostgreSQL
* JWT Authentication
* Swagger API Documentation

### Deployment

* Frontend: Vercel
* Database: PostgreSQL


## 🗄️ Database Design

Main entities include:

* Users
* Products
* Categories
* Suppliers
* Units
* Warehouses
* ImportReceipts
* ExportReceipts
* ReceiptDetails


## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/your-username/warehouse-management-system.git
cd warehouse-management-system
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

---

### Backend Setup

```bash
cd backend

npm install

npm run start:dev
```

Create a `.env` file:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=warehouse_management

JWT_SECRET=your_secret_key
```


## 📡 API Documentation

Swagger documentation is available after starting the backend server:

```bash
http://localhost:3000/api
```

The API documentation includes:

* Endpoint descriptions
* Request/Response schemas
* Interactive API testing


## 📊 Dashboard Statistics

The dashboard provides real-time information including:

* Product count
* Supplier count
* Product category count
* Import/Export receipt count
* Low-stock products
* Total inventory quantity


## 🔐 Authentication & Authorization

* JWT-based authentication
* Protected routes
* Role-based authorization
* Secure API access


## 📷 Screenshots

### Dashboard

Add dashboard screenshots here.

---

## 🎯 Future Improvements

* Inventory reports and analytics
* Export reports to Excel/PDF
* Advanced search and filtering
* Audit logs
* Multi-warehouse support
* Email notifications for low-stock products


## 👨‍💻 Author

**Bao Nguyen**

Academic Year 2025 – 2026


## 📄 License

This project was developed for educational and learning purposes.
