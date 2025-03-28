import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed...');

  const hashedPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@exemplo.com' },
    update: {},
    create: {
      email: 'admin@exemplo.com',
      name: 'Administrador',
      password: hashedPassword,
    },
  });

  console.log(`Usuário admin criado: ${admin.email}`);

  const products = [
    {
      name: 'Smartphone XYZ',
      description: 'Um smartphone de última geração com câmera incrível',
      price: 1999.99,
      stock: 50,
      category: 'Eletrônicos',
    },
    {
      name: 'Notebook ABC',
      description: 'Notebook leve e potente para produtividade',
      price: 3999.99,
      stock: 30,
      category: 'Computadores',
    },
    {
      name: 'Smart TV 55"',
      description: 'TV 4K com recursos inteligentes',
      price: 2499.99,
      stock: 20,
      category: 'Eletrônicos',
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: {
        name_price: {
          name: product.name,
          price: product.price,
        },
      },
      update: product,
      create: product,
    });
  }

  console.log(`${products.length} produtos de exemplo criados`);

  console.log('Seed concluído com sucesso!');
}

main()
  .catch((e) => {
    console.error('Erro durante o seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
