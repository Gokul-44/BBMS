import mysql from "mysql2/promise";

export const dbConfig = {
  host: "localhost", 
  user: "root", 
  password: "admin", // Your MySQL password
  database: "bbms",
};

export async function connectDB() {
  const connection = await mysql.createConnection(dbConfig);
  return connection;
}
