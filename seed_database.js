const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const { initializeDatabase } = require('./init/runInitProgrammatically');

async function main() {
  try {
    console.log('Starting database seeding...');
    const result = await initializeDatabase();
    console.log('✅ Database seeded successfully!');
    console.log('Created admin with ID:', result.adminId);
    console.log('\nAdmin credentials:');
    console.log('Email: admin@zixx.com');
    console.log('Password: admin123');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database seeding failed:', error.message);
    console.error(error);
    process.exit(1);
  }
}

main();
