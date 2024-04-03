import express from "express";
import { connectDb } from "./config/db.js";
import cors from "cors";
import productsRouter from "./routes/productsRoutes.js";

connectDb()

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/products', productsRouter)

const PORT = 3000;

app.listen(PORT, console.log(`Server Run at port ${PORT}`));
