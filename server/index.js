import mongoose from "mongoose";
import multer from "multer";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";                                                                            
import {
  CreateUniversity,
  DeleteUniversity,
  GetUniversity,
  UpdateUniversity,
} from "./controllers/University.js";
import {
  CreateDepartment,
  DeleteDepartment,
  GetDepartmentsByUniversityID,
  UpdateDepartment,
} from "./controllers/Department.js";
import {
  CreateProduct,
  DeleteProduct,
  GetProductByDepartmentId,
  GetProductDetails,
  UpdateProduct,
  UpdateProductQty,
} from "./controllers/Product.js";

import { Login, Register } from "./controllers/User.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// University Module
const storageUniv = multer.diskStorage({
  destination: "uploadUniv/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const uploadUniv = multer({ storage: storageUniv });

app.post("/university", uploadUniv.single("image"), CreateUniversity);
app.put("/university", uploadUniv.single("image"), UpdateUniversity);
app.delete("/university", DeleteUniversity);
app.get("/university", GetUniversity);

// Department Module
const storageDep = multer.diskStorage({
  destination: "uploadDep/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const uploadDep = multer({ storage: storageDep });

app.post("/department", uploadDep.single("image"), CreateDepartment);
app.put("/department", uploadDep.single("image"), UpdateDepartment);
app.delete("/department", DeleteDepartment);
app.get("/department", GetProductByDepartmentId );

// Product Module
const storagePrd = multer.diskStorage({
  destination: "uploadPrd/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}--${file.originalname}`);
  },
});
const uploadPrd = multer({ storage: storagePrd });

app.post("/product", uploadPrd.array("images"), CreateProduct);
app.put("/product", uploadPrd.array ("images"), UpdateProduct);
app.post("/product", DeleteProduct);
app.get("/product", GetDepartmentsByUniversityID);
app.get("/productDetail", GetProductDetails);
app.put("/updateProductQty", UpdateProductQty);

//User Module
app.post("/register", Register);
app.post("/login", Login);

//Image use
app.use(express.static("uploadUniv/"));
app.use(express.static("uploadDep/"));
app.use(express.static("uploadPrd/"));

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Database is connected");
        app.listen(process.env.PORT, () => {
            console.log("Running at Port number: " + process.env.PORT);
        });
    })
    .catch((err) => {
        console.error("Database error:", err);
    }
);