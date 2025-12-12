import express from "express";
import userController from "../controller/user-controller.js";
import productController from "../controller/product-controller.js";
import {authMiddleware} from "../middleware/auth-middleware.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const userRouter = new express.Router();
userRouter.use(authMiddleware);


const uploadBase = path.join(process.cwd(), "uploads");

const uploadUsersDir = path.join(uploadBase, "users");
fs.mkdirSync(uploadUsersDir, { recursive: true });

const uploadProductsDir = path.join(uploadBase, "products");
fs.mkdirSync(uploadProductsDir, { recursive: true });

const storageUsers = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadUsersDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + ext);
  },
});
const uploadUserImage = multer({ storage: storageUsers });

const storageProducts = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadProductsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + ext);
  },
});
const uploadProductImage = multer({ storage: storageProducts });

// User API
userRouter.get('/api/users/self', userController.get);
userRouter.patch('/api/users/self', userController.update);
userRouter.delete('/api/users/logout', userController.logout);
userRouter.delete('/api/users/:id', userController.delete_data);

userRouter.post('/api/users/uploads', uploadUserImage.single("file"), userController.upload_data);

// Product API
userRouter.post('/api/products', productController.create);
userRouter.get('/api/products/:productId', productController.get);
userRouter.put('/api/products/:productId', productController.update);
userRouter.delete('/api/products/:productId', productController.remove);
userRouter.get('/api/products', productController.get);

userRouter.post('/api/products/uploads', uploadProductImage.single("file"), productController.upload_data);

export {
    userRouter
}
