import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { datasets } from "./database";
import { Base } from "./fetcher";

// Open SQLite database connection
const dbPromise = open({
  filename: "./database.sqlite", // Path to your database file
  driver: sqlite3.Database,
});

export class Data extends Base {
  fetchData(component: any) {
    return datasets[component] || { error: "Dataset not found" };
  }

  async fetchDataLimit(component: string, limit: number) {
    const db = await dbPromise;
    try {
      const rows = await db.all(`SELECT * FROM ${component} LIMIT ?`, limit);
      return rows;
    } catch (error) {
      console.error("Error fetching limited data:", error);
      return { error: "Error fetching data" };
    }
  }

  async fetchFromDB(component: string) {
    const db = await dbPromise;
    try {
      const rows = await db.all(`SELECT * FROM ${component}`);
      return rows;
    } catch (error) {
      console.error("Error fetching data from DB:", error);
      return { error: "Table not found or database error" };
    }
  }
}