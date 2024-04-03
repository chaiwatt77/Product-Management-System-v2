import { addProduct,getAllProducts,removeProduct,viewProduct,editProduct } from "../controllers/productsController.js";
// import express from 'express'
// const productsRouter = express.Router();
// หรือ
import { Router } from "express";
const productsRouter = Router();

productsRouter.get('/getAll', getAllProducts)
productsRouter.get('/viewProduct/:id', viewProduct)
productsRouter.put('/edit/:id', editProduct)
productsRouter.post('/add', addProduct)
productsRouter.delete('/remove/:id', removeProduct)

export default productsRouter;
