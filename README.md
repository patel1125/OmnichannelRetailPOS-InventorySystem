# OmnichannelRetailPOS-InventorySystem

A full-stack food delivery and table reservation app (product name: **TiffinBox**, shown in the UI).
- **Frontend:** React + TypeScript + Vite
- **Backend:** Node.js + Express + MongoDB (Mongoose)
- **Auth:** JWT

## Opening this in VS Code (Windows)

1. Unzip the downloaded `OmnichannelRetailPOS-InventorySystem.zip` somewhere like `C:\Users\<you>\Projects\`.
2. Open VS Code → **File > Open Folder** → select the unzipped `OmnichannelRetailPOS-InventorySystem` folder.
   It contains two sub-projects: `backend` and `frontend`. You'll run each in its own terminal.

## Pushing to your GitHub repo

From inside the unzipped `OmnichannelRetailPOS-InventorySystem` folder:
```
git init
git add .
git commit -m "Initial commit: scaffold backend + frontend"
git branch -M main
git remote add origin https://github.com/patel1125/OmnichannelRetailPOS-InventorySystem.git
git push -u origin main
```
(A `.gitignore` is already included so `node_modules` and `.env` won't be committed.)

## Running the backend

```
cd backend
npm install
copy .env.example .env
```
Open `.env` and set `MONGO_URI` (a local MongoDB or a free MongoDB Atlas connection string) and a random `JWT_SECRET`.

```
npm run dev
```
Backend runs at `http://localhost:5000`.

## Running the frontend

Open a **second terminal** in VS Code (Terminal > Split Terminal):
```
cd frontend
npm install
copy .env.example .env
npm run dev
```
Frontend runs at `http://localhost:5173`.

## Folder structure

```
OmnichannelRetailPOS-InventorySystem/
├── backend/
│   ├── server.js
│   ├── config/db.js
│   ├── middleware/  (auth.js, errorMiddleware.js)
│   ├── models/      (14 schemas matching your DB tables)
│   └── routes/      (11 route files — auth/CRUD per resource)
└── frontend/
    └── src/
        ├── components/  (Navbar, RestaurantCard, MenuItemCard, ProtectedRoute)
        ├── pages/       (Home, RestaurantDetail, Cart, Checkout, Login, Register, Orders, Reservations)
        ├── context/AuthContext.tsx
        ├── services/api.ts
        ├── types/index.ts
        └── App.tsx, main.tsx, index.css
```

## What works right now
- Register/login with JWT
- Browse + search restaurants, view menu by category
- Add to cart, update quantity, checkout → creates Order + Payment
- View order history and table reservations

## What you'll likely want to add next
- Restaurant owner dashboard (create/edit restaurant, menu, see incoming orders)
- Image uploads for menu items (Firebase Storage or Cloudinary)
- Reviews UI, loyalty points display, notifications UI
- Live order tracking (the `DeliveryTracking` API exists; no map UI yet)
