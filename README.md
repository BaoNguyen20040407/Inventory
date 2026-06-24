# 📦 Warehouse Management System

A full-stack Warehouse Management System built to simplify inventory control, stock tracking, supplier management, and warehouse operations. The application provides real-time inventory monitoring, import/export management, reporting capabilities, and role-based user access.



## 🚀 Live Demo

### Frontend

https://inventory-three-black.vercel.app

### Backend API Documentation

[(Add your Swagger URL here)
](https://inventory-ohr0.onrender.com/api)


## 📖 Project Overview

The Warehouse Management System is designed to help businesses efficiently manage inventory, suppliers, warehouse transactions, and stock movements.

The system supports:

* Inventory tracking
* Product management
* Supplier management
* Import and export operations
* Real-time stock updates
* Report generation
* User authentication and authorization



## ✨ Key Features

### 📊 Dashboard & Analytics

* Total products overview
* Total suppliers overview
* Product category statistics
* Import/Export transaction statistics
* Low-stock product alerts
* Total inventory quantity monitoring
* Real-time warehouse insights

### 📦 Product Management

* Create new products
* Update product information
* Delete products
* Search and filter products
* Track inventory quantity

### 🏷️ Category Management

* Create product categories
* Update category information
* Delete categories

### 📏 Unit Management

* Manage measurement units
* Create, update, and delete units

### 🚚 Supplier Management

* Create suppliers
* Update supplier information
* Delete suppliers
* Search suppliers

### 📥 Stock Import Management

* Create import receipts
* Add imported products
* Automatically update inventory levels
* Maintain import history

### 📤 Stock Export Management

* Create export receipts
* Record outgoing products
* Automatically deduct inventory quantity
* Maintain export history

### 📑 Reporting & Export

* Export reports to Excel (.xlsx)
* Export reports to PDF
* Generate inventory reports
* Generate warehouse transaction reports

### 👥 User Management

* Secure login system
* JWT Authentication
* Role-based authorization
* User account management



## 🏗️ System Architecture

Frontend and Backend are separated into independent services:

```text
Frontend (Next.js)
        │
        ▼
REST API (NestJS)
        │
        ▼
PostgreSQL Database
```



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
* Swagger

### Database

* PostgreSQL

### Deployment

* Frontend: Vercel
* Backend: NestJS Server
* Database: PostgreSQL



## 🗄️ Database Design

Main entities:

* Product
* Category
* Supplier
* Inventory
* Warehouse
* Unit
* User

## ⚙️ Installation Guide

### Clone Repository

```bash
git clone https://github.com/your-username/warehouse-management-system.git

cd warehouse-management-system
```


### Backend Setup

```bash
cd warehouse-backend

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


### Frontend Setup

```bash
cd warehouse-frontend

npm install

npm run dev
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```



## 📡 API Documentation

Swagger documentation is available after starting the backend:

```bash
http://localhost:3000/api
```

Swagger provides:

* API endpoint documentation
* Request and response schemas
* Authentication testing
* Interactive API execution



## 🔐 Authentication & Security

The system uses:

* JWT Authentication
* Protected API Routes
* Role-Based Access Control (RBAC)
* Secure Password Handling



## 📊 Reports

The application supports exporting data in multiple formats:

* Excel Reports (.xlsx)
* PDF Reports
* Inventory Reports
* Transaction Reports



## 📷 Screenshots

### Dashboard
<img width="1861" height="881" alt="image" src="https://github.com/user-attachments/assets/779b3a4e-aeae-4605-a58f-7f09b24d502b" />


## 🎯 Future Enhancements

* Barcode / QR Code Integration
* Multi-Warehouse Support
* Email Notifications
* Advanced Analytics Dashboard
* Inventory Forecasting
* Activity Logs & Auditing
* Mobile Optimization



## 👨‍💻 Author

**Bao Nguyen**

Academic Year 2025 – 2026



## 📄 License

This project was developed for educational and academic purposes.
