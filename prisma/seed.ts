import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = ['ADMIN', 'ACADEMICO', 'EMPRESARIO', 'EXPOSITOR'];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name_rol: role },
      update: {},
      create: { name_rol: role },
    });
  }

  const companySizes = ['Freelancer', 'Pyme', 'Mipyme', 'Corporativo'];

  for (const size of companySizes) {
    await prisma.companySize.upsert({
      where: { name: size },
      update: {},
      create: { name: size },
    });
  }

  const sectors = [
    'Tecnología',
    'Educación',
    'Salud',
    'Gastronomía',
    'Servicios',
    'Comercio',
  ];

  for (const sector of sectors) {
    await prisma.sector.upsert({
      where: { nombre: sector },
      update: {},
      create: { nombre: sector },
    });
  }

  const categories = [
    {
      name_categoria: 'Software',
      description_categoria: 'Proyectos relacionados con desarrollo de software.',
    },
    {
      name_categoria: 'Inteligencia Artificial',
      description_categoria:
        'Proyectos que utilizan IA, PLN o automatización inteligente.',
    },
    {
      name_categoria: 'Aplicaciones Web',
      description_categoria: 'Sistemas y plataformas web.',
    },
    {
      name_categoria: 'Sistemas Empresariales',
      description_categoria:
        'Soluciones orientadas a empresas e instituciones.',
    },
    {
      name_categoria: 'Tecnología Educativa',
      description_categoria: 'Proyectos aplicados al área educativa.',
    },
  ];

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name_categoria: category.name_categoria },
      update: {},
      create: category,
    });
  }

  console.log('Datos iniciales creados correctamente.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });