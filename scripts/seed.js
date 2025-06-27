const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

// Read the products data from the mockup JSON file
const productsDataPath = path.join(__dirname, './mockup/products.json');

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');
    
    // Read the products JSON file
    const productsData = JSON.parse(fs.readFileSync(productsDataPath, 'utf8'));
    
    console.log(`📦 Found ${productsData.length} products to insert`);
    
    // Clear existing products (optional - comment out if you want to keep existing data)
    console.log('🧹 Clearing existing products...');
    await prisma.product.deleteMany({});
    
    // Prepare data for bulk insert (remove id field as it's auto-generated)
    const productsToInsert = productsData.map(product => ({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl,
    }));
    
    // Insert products into the database using createMany for better performance
    console.log('📥 Inserting products into database...');
    
    const result = await prisma.product.createMany({
      data: productsToInsert,
      skipDuplicates: true, // Skip if there are any duplicates
    });
    
    console.log(`✅ Successfully inserted ${result.count} products`);
    
    // Display summary
    const totalProducts = await prisma.product.count();
    console.log(`📊 Total products in database: ${totalProducts}`);
  
    
    console.log('\n🎉 Database seeding completed successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    
    if (error.code === 'P2002') {
      console.error('💡 This might be due to duplicate entries. Try running with skipDuplicates: true');
    }
    
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedDatabase(); 