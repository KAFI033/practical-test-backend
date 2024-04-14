// #1
import { PrismaClient } from "@prisma/client";
import express from "express";

// #2
const prisma = new PrismaClient();

// #3
const app = express();

// #4
app.use(express.json());

// #5
app.get("/employee/all", async (req, res) => {
  const employees = await prisma.employee.findMany();
  res.status(200).json({
    success: true,
    data: employees,
    message: "Operation Successful",
  });
});

app.get(`/employee/:id`, async (req, res) => {
  const { id } = req.params;
  const employee = await prisma.employee.findFirst({
    where: { id: Number(id) },
  });
  res.json({
    success: true,
    data: employee,
    message: "Operation Successful",
  });
});

app.post("/employee/add", async (req, res) => {
  const data = req.body;
  const employee = await prisma.employee.create({ data });
  res.status(200).json({
    success: true,
    data: employee,
    message: "Operation Successful",
  });
});

app.put("/employee/update/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const employee = await prisma.employee.update({
    where: { id: Number(id) },
    data: { ...data },
  });
  res.status(200).json({
    success: true,
    data: employee,
    message: "Operation Successful",
  });
});

app.delete(`/employee/delete/:id`, async (req, res) => {
  const { id } = req.params;
  const employee = await prisma.employee.delete({
    where: { id: Number(id) },
  });
  res.json({
    success: true,
    payload: employee,
  });
});

app.use((req, res, next) => {
  res.status(404);
  return res.json({
    success: false,
    data: null,
    message: `API SAYS: Endpoint not found for path: ${req.path}`,
  });
});

// #6
app.listen(3000, () =>
  console.log("REST API server ready at: http://localhost:3000")
);
