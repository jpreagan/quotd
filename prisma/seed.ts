import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const quoteData = [
  {
    text: 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    author: {
      connectOrCreate: {
        where: { name: 'Nelson Mandela' },
        create: { name: 'Nelson Mandela' },
      },
    },
    category: {
      connectOrCreate: {
        where: { name: 'Inspirational' },
        create: { name: 'Inspirational' },
      },
    },
  },
  {
    text: 'The way to get started is to quit talking and begin doing.',
    author: {
      connectOrCreate: {
        where: { name: 'Walt Disney' },
        create: { name: 'Walt Disney' },
      },
    },
    category: {
      connectOrCreate: {
        where: { name: 'Inspirational' },
        create: { name: 'Inspirational' },
      },
    },
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const q of quoteData) {
    const quote = await prisma.quote.create({
      data: q,
    });
    console.log(`Created quote with id: ${quote.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
