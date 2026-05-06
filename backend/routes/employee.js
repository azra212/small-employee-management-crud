import express from "express"
import { getAllEmployee, getEmployee, deleteEmployee, updateEmployee, createEmployee } from "../controllers/employee.js";

const router = express.Router();

router.get("/", getAllEmployee);

router.get("/:id", getEmployee);

router.delete("/:id", deleteEmployee);

router.post("/", createEmployee);

router.put("/:id", updateEmployee);


export default router;