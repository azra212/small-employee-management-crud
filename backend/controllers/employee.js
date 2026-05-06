import { query } from "../utils/connectToDB.js";
import {
  createRoleQuery,
  createEmployeeTableQuery,
  getAllEmployeeQuery,
  createEmployeeQuery,
  getEmployeeByIdQuery,
  deleteEmployeeByIdQuery,
  updateEmployeeByIdQuery,
} from "../utils/sqlQuery.js";
import { createError, formatDbError } from "../utils/error.js";

export async function getAllEmployee(req, res, next) {
  try {
    await query(createRoleQuery);
    await query(createEmployeeTableQuery);

    const { rows } = await query(getAllEmployeeQuery);

    res.status(200).json(rows);
  } catch (error) {
    console.log(error.message);
    return next(formatDbError(error));
  }
}

export async function createEmployee(req, res, next) {
  try {
    const { name, email, age, role, salary } = req.body;

    if (!name || !email || !age || !salary) {
      return res.status(400).json({ error: "Missing fields" });
    }
    const data = await query(createEmployeeQuery, [
      name,
      email,
      age,
      role,
      salary,
    ]);
    res.status(201).json(data.rows[0]);
  } catch (error) {
    console.log(error.message);
    return next(formatDbError(error));
  }
}

export async function getEmployee(req, res, next) {
  const id = req.params.id;

  const data = await query(getEmployeeByIdQuery, [id]);
  if (!data.rows.length) {
    return next(formatDbError(createError(404, "Employee not found")));
  }
  res.status(200).json(data.rows[0]);
}

export async function deleteEmployee(req, res, next) {
  const id = req.params.id;

  const data = await query(deleteEmployeeByIdQuery, [id]);
  if (!data.rowCount) {
    return next(formatDbError(createError(400, "Employee not found")));
  }
  res.status(200).json({ message: "Employee deleted successfully" });
}

export async function updateEmployee(req, res, next) {
  try {
    const { id } = req.params;
    const { name, email, age, role, salary } = req.body;
    const result = await query(updateEmployeeByIdQuery, [
      name,
      email,
      age,
      role,
      salary,
      id,
    ]);
    if (!result.rowCount) {
      return next(formatDbError(createError(404, "Employee not found")));
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    return next(formatDbError(error));
  }
}
