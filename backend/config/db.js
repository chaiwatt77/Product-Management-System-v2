import { MongoClient } from "mongodb";

const connectionString = "mongodb://127.0.0.1:27017";

const client = new MongoClient(connectionString);

export const connectDb = async()=>{
  try {
    await client.connect();
    console.log("MongoDB connected")
  } catch {
    console.log("connect db error");
  }
}

export const db = client.db("btdDb");