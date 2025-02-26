

# Universal API with Client & Server Fetching

This project provides a **universal API** for fetching data dynamically using **client-side** and **server-side** fetching strategies. It follows best practices for **separation of concerns**, **extensibility**, and **developer-friendly** architecture.  

---

## 📌 Problem Statement  

We needed a flexible system where:
1. Components can fetch data dynamically from **either the client or server**.  
2. The API can handle **multiple datasets** (e.g., `students`, `teachers`, `parents`).  
3. The system should support **progressive data fetching** for large datasets.  
4. Developers should be able to **easily extend** the system with new datasets without modifying core logic.  
5. The architecture should allow **testing without React** to improve maintainability.  

---

## 🔹 Solution Overview  

### **1️⃣ Data Management**
- A **universal API** fetches data dynamically based on the `component` parameter.
- Data is stored in **SQLite** but can be extended to other databases.
- Supports **progressive data streaming** for large datasets.

### **2️⃣ Client & Server Fetching HOCs**
- **`withClientFetching`**: Uses `fetch` to retrieve data from `/api/fetch/data` on the client-side.  
- **`withServerFetching`**: Uses `getServerSideProps` to fetch data before rendering the page.  

### **3️⃣ Extensibility & Separation of Concerns**
- New datasets can be added **without modifying API logic**.
- The `Data` class is responsible for fetching data and can be extended.

---

## 🔥 Component Consumer Experience (How to Use)

### ✅ Client-Side Fetching
```tsx
import withClientFetching from "../components/withClientFetching";
import DataTable from "@/components/DataTable";

const Students = withClientFetching(DataTable, "students");
export default Students;
```
- Fetches data **after page load**.
- Ideal for real-time updates or lightweight datasets.

### ✅ Server-Side Fetching
```tsx
import withServerFetching from "../components/withServerFetching";
import DataTable from "@/components/DataTable";

const { Component, getServerSideProps } = withServerFetching(DataTable, "students");

export { getServerSideProps };
export default Component;
```
- Fetches data **before rendering**.
- Useful for SEO or large datasets.

### ✅ Rendering Multiple Datasets
```tsx
import withClientFetching from "../components/withClientFetching";
import DataTable from "@/components/DataTable";

const Students = withClientFetching(DataTable, "students");
const Teachers = withClientFetching(DataTable, "teachers");

export default function Home() {
  return (
    <div>
      <Students />
      <Teachers />
    </div>
  );
}
```

---

## 🛠️ Developer Experience (How It Works)

### ✅ **Separation of Concerns**
- **API layer (`Data.ts`)**: Fetches data from `SQLite`.
- **HOCs (`withClientFetching.tsx` & `withServerFetching.tsx`)**: Handle fetching logic.
- **Presentation layer (`DataTable.tsx`)**: Displays the data.

### ✅ **Adding a New Dataset**
1. **Insert new data** into `SQLite`:
   ```sql
   CREATE TABLE courses (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL,
     duration TEXT NOT NULL
   );
   ```
2. **Modify `datasets.ts`** (if static data is needed).
3. **Use it in a component**:
   ```tsx
   const Courses = withClientFetching(DataTable, "courses");
   ```

### ✅ **Testing Without React**
- Since data fetching is **decoupled**, you can test the `Data.ts` class in **Node.js**:
  ```ts
  const data = new Data();
  console.log(await data.fetchData("students"));
  ```

### ✅ **Framework-Agnostic**
- The API can be used in **Next.js**, **Express.js**, or any **Node.js backend**.
- HOCs can be replaced with **hooks** if needed.

---

## 🚀 Why This Approach? (Advantages)
✔ **Extensible**: New datasets can be added without modifying core logic.  
✔ **Modular**: API, fetching logic, and UI components are **independent**.  
✔ **Performance Optimized**: Supports **progressive streaming** for large datasets.  
✔ **Adaptable**: Works with **both client-side & server-side rendering**.  
✔ **Easy Testing**: Core logic can be tested **without a UI framework**.  

---

## 📂 Project Structure

```bash
/universal-api-db
│── /api
│   ├── fetch
│   │   ├── data.ts         # API handler for fetching data
│── /components
│   ├── students.tsx       # UI Component for displaying data
│   ├── parents.tsx 
│   ├── teachers.tsx 
│   ├── withClientFetching.tsx  # HOC for client-side fetching
│   ├── withServerFetching.tsx  # HOC for server-side fetching
│── /lib
│   ├── data.ts         # fetching data according to the component passed
│   ├── database.ts         # registery where every available data is present
│   ├── fetcher.ts          # fetcher base class or abstract class
│── /pages
│   ├── index.tsx         # Client side example page using HOC
│   ├── server-side.tsx   # Server side example page using HOC

```

---

## 🔧 How to Run

1️⃣ **Install Dependencies**
```sh
npm install
```

2️⃣ **Initialize SQLite Database**
```sh
npx ts-node setup.ts
```

3️⃣ **Start the Server**
```sh
npm run dev
```

4️⃣ **Open in Browser**
```
http://localhost:3000
```

---

## 🎯 Summary  

This project **solves dynamic data fetching** in a clean, modular way.  
- Developers can **add new datasets effortlessly**.  
- Components **fetch data seamlessly**, whether client-side or server-side.  
- Core logic can be **tested without React**, ensuring **reusability**.  
- The system is **scalable & future-proof**.  


