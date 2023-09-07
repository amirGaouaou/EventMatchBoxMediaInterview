import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import data from "@/mock/data.json";

// Configure lowdb to write data to JSON file
const initDB = async () => {
  const db = new Low<Data>(new JSONFile("database.json"), data);
  await db.write();
  return db;
};
export default initDB;
