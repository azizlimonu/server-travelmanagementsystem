// seed.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const data = {

};

async function seed() {
  try {
    for (const entry of data.data) {
      await prisma.modelName.create({
        data: {
          // Map your data to match your Prisma model
          title: entry.title,
          day: entry.day,
          age: entry.age,
          // ... other fields
        },
      });
    }

    console.log('Seed successful!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
