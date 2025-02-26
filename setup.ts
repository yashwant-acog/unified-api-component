import sqlite3 from "sqlite3";

const db = new sqlite3.Database("database.sqlite");

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL,
    grade TEXT NOT NULL
  );`);

  db.run(`CREATE TABLE IF NOT EXISTS teachers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    experience INTEGER NOT NULL
  );`);

  db.run(`INSERT INTO students (name, age, grade) VALUES 
    ('Alice', 14, '8th'), 
    ('Bob', 15, '9th');`);

  db.run(`INSERT INTO teachers (name, subject, experience) VALUES 
    ('Mr. Smith', 'Math', 10), 
    ('Ms. Johnson', 'Science', 8);`);
});

db.close();

console.log("Database setup complete.");
