import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const newEmployee = await prisma.employee.create({
    data: {
      name: "Osinachi Kalu",
      email: "sinach@sinachmusic.com",
      department: "Account",
    },
  });
  console.log("Created new employee: ", newEmployee);

  const allEmployee = await prisma.employee.findMany({});
  console.log("All Employees: ");
  console.dir(allEmployee, { depth: null });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
