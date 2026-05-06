import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import employeeRoutes from "./routes/employee.js";

dotenv.config();

const app = express();

const PORT = 3001;

const corsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use("/api/employee", employeeRoutes);

app.use(function (req, res) {
  res.status(404).json({ error: "Not Found" });
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({ error: message });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
