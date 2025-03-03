// import sqlite3 from "sqlite3";
// import { open } from "sqlite";
import { datasets } from "./database";
import { Base } from "./fetcher";

// Open SQLite database connection
// const dbPromise = open({
//   filename: "./database.sqlite", // Path to your database file
//   driver: sqlite3.Database,
// });


export class Data extends Base {
  fetchData(component: any) {
    return datasets[component] || { error: "Dataset not found" };
  }

  // async fetchDataLimit(component: string, limit: number) {
  //   const db = await dbPromise;
  //   try {
  //     const rows = await db.all(`SELECT * FROM ${component} LIMIT ?`, limit);
  //     return rows.length > 0 ? rows : { error: "No data found" };
  //   } catch (error) {
  //     console.error("Error fetching limited data:", error);
  //     return { error: "Error fetching data" };
  //   }
  // }

  // async fetchFromDB(component: string) {
  //   const db = await dbPromise;
  //   try {
  //     const rows = await db.all(`SELECT * FROM ${component}`);
  //     return rows.length > 0 ? rows : { error: "Table not found" };
  //   } catch (error) {
  //     console.error("Error fetching data from DB:", error);
  //     return { error: "Database error" };
  //   }
  // }

  async fetchFromSource(source: string, component: string, limit?: number) {
    switch (source) {
      case "json":
        return this.fetchData(component);
      // case "database":
      //   return limit ? this.fetchDataLimit(component, limit) : this.fetchFromDB(component);
      case "api":
        return this.fetchFromAPI(component);
      default:
        return { error: "Invalid source" };
    }
  }

  private async fetchFromAPI(source: string) {
    if (!source) {
      return { error: "API source not found" };
    }
    try {
      const response = await fetch(source);
      if (!response.ok) throw new Error("Failed to fetch from API");
      return await response.json();
    } catch (error: any) {
      console.error(`Error fetching from API: ${error.message}`);
      return { error: "Failed to fetch from API" };
    }
  }
}