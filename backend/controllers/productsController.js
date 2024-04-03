import { db } from "../config/db.js";
import { ObjectId } from "mongodb";

export const getAllProducts = async (req, res) => {
  try {
    const collection = db.collection("products");
    const result = await collection.find({}).toArray();
    return res.json({
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const viewProduct = async (req, res) => {
  try {
    const collection = db.collection("products");
    const objId = new ObjectId(req.params.id);
    const result = await collection.findOne({_id: objId});
    if (!result) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({
      data: result,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const collection = db.collection("products");
    let created_at = new Date();
    const productDetails = { ...req.body };

    const result = await collection.insertOne({
      ...productDetails,
      created_at,
      latest_update: created_at
    });

    return res.json({
      message: "Product has been created successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const editProduct = async (req, res) => {
  try {
    const collection = db.collection("products");
    const objId = new ObjectId(req.params.id);
    let latest_update = new Date();

    req.body.latest_update = latest_update;
    const { _id, created_at, ...productBody } = req.body;

    const result = await collection.updateOne({_id: objId}, {$set: productBody});
    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({
      message: "Product has been updated successfully"
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const removeProduct = async (req, res) => {
  try {
    const collection = db.collection("products");
    const objId = new ObjectId(req.params.id);
    const result = await collection.deleteOne({_id: objId});
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.json({
      message: "Product has been deleted successfully"
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
