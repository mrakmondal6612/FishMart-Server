const mongoose = require('mongoose');
const { ProductModel } = require('./models/products.model');

const docs = [
  // Freshwater Fish
  { 
    title: 'Red Tiger Oscar', 
    description: 'Beautiful freshwater cichlid with striking red and black stripes, perfect for large aquariums', 
    brand: 'FishMart Breeders', 
    gender: 'Freshwater', 
    category: 'Cichlids', 
    subcategory: 'Dwarf Cichlids', 
    price: 45.99, 
    basePrice: 45.99,
    discount: 0, 
    rating: 4.7, 
    theme: 'new arrivals', 
    size: ['3-4 inches'], 
    color: ['red','black'], 
    image: ['https://via.placeholder.com/800/FF6B6B/FFFFFF?text=Red+Tiger+Oscar'],
    supply: 45, 
    featured: true,
    fishAttributes: {
      waterTemperature: '74-81°F (23-27°C)',
      pH: '6.0-7.5',
      waterHardness: 'Moderate',
      tankSizeMinimum: 55,
      careLevel: 'Medium',
      temperament: 'Aggressive, Best kept alone',
      diet: 'Omnivorous - Pellets, Live food',
      lifespan: '10-15 years',
      size: '3-4 inches',
      schoolingBehavior: false
    }
  },
  { 
    title: 'Cardinal Tetra', 
    description: 'Vibrant red and blue freshwater tetra, ideal for community tanks', 
    brand: 'FishMart Breeders', 
    gender: 'Freshwater', 
    category: 'Tetras', 
    subcategory: 'Cardinal Tetras', 
    price: 8.99, 
    basePrice: 8.99,
    discount: 0, 
    rating: 4.5, 
    theme: 'best sellers', 
    size: ['1-1.5 inches'], 
    color: ['red','blue'], 
    image: ['https://images.unsplash.com/photo-1553707820-47df4749cb76?w=800&q=80'],
    supply: 200, 
    featured: true,
    fishAttributes: {
      waterTemperature: '72-80°F (22-27°C)',
      pH: '4.0-6.0',
      waterHardness: 'Soft',
      tankSizeMinimum: 20,
      careLevel: 'Easy',
      temperament: 'Peaceful, Schooling fish',
      diet: 'Small flakes, Micro pellets',
      lifespan: '5-10 years',
      size: '1-1.5 inches',
      schoolingBehavior: true
    }
  },
  { 
    title: 'Gold Pleco', 
    description: 'Hardy large freshwater pleco for algae control in established tanks', 
    brand: 'FishMart Breeders', 
    gender: 'Freshwater', 
    category: 'Plecos', 
    subcategory: 'Common Plecos', 
    price: 34.99, 
    basePrice: 34.99,
    discount: 5, 
    rating: 4.4, 
    theme: 'best sellers', 
    size: ['6-8 inches'], 
    color: ['gold','brown'], 
    image: ['https://images.unsplash.com/photo-1567450186375-22298a3f5b0b?w=800&q=80'],
    supply: 30, 
    featured: true,
    fishAttributes: {
      waterTemperature: '72-82°F (22-28°C)',
      pH: '6.0-8.0',
      waterHardness: 'Moderate',
      tankSizeMinimum: 75,
      careLevel: 'Easy',
      temperament: 'Nocturnal, Peaceful',
      diet: 'Algae, Sinking pellets, Vegetables',
      lifespan: '10-20 years',
      size: '6-8 inches',
      schoolingBehavior: false
    }
  },
  { 
    title: 'Siamese Fighting Fish - Male Red', 
    description: 'Stunning red betta fish with flowing fins, must be kept alone', 
    brand: 'FishMart Breeders', 
    gender: 'Freshwater', 
    category: 'Bettas', 
    subcategory: 'Male Bettas', 
    price: 24.50, 
    basePrice: 24.50,
    discount: 0, 
    rating: 4.8, 
    theme: 'premium', 
    size: ['2.5-3 inches'], 
    color: ['red'], 
    image: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80'],
    supply: 60, 
    fishAttributes: {
      waterTemperature: '75-80°F (24-27°C)',
      pH: '6.0-8.0',
      waterHardness: 'Neutral',
      tankSizeMinimum: 5,
      careLevel: 'Easy',
      temperament: 'Aggressive, Must be alone',
      diet: 'Carnivorous - Pellets, Bloodworms',
      lifespan: '3-5 years',
      size: '2.5-3 inches',
      schoolingBehavior: false
    }
  },
  { 
    title: 'Discus Fish - Blue', 
    description: 'Expert aquarist favorite, requires careful temperature and water quality management', 
    brand: 'FishMart Breeders', 
    gender: 'Freshwater', 
    category: 'Discus', 
    subcategory: 'Blue Discus', 
    price: 99.99, 
    basePrice: 99.99,
    discount: 0, 
    rating: 4.9, 
    theme: 'rare & exotic', 
    size: ['4-5 inches'], 
    color: ['blue','white'], 
    image: ['https://images.unsplash.com/photo-1548936328-c9fa89d128fa?w=800&q=80'],
    supply: 12, 
    fishAttributes: {
      waterTemperature: '82-88°F (28-31°C)',
      pH: '6.0-7.0',
      waterHardness: 'Soft',
      tankSizeMinimum: 50,
      careLevel: 'Hard',
      temperament: 'Peaceful, Shy, School behavior',
      diet: 'Live food, Quality pellets',
      lifespan: '10-15 years',
      size: '4-5 inches',
      schoolingBehavior: true
    }
  },

  // Saltwater Fish
  { 
    title: 'Clownfish - Ocellaris', 
    description: 'Classic orange and white saltwater fish, perfect for reef beginners', 
    brand: 'FishMart Breeders', 
    gender: 'Saltwater', 
    category: 'Cichlids', 
    subcategory: 'African Cichlids', 
    price: 65.00, 
    basePrice: 65.00,
    discount: 0, 
    rating: 4.8, 
    theme: 'new arrivals', 
    size: ['2-3 inches'], 
    color: ['orange','white'], 
    image: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80'],
    supply: 25, 
    fishAttributes: {
      waterTemperature: '75-80°F (24-27°C)',
      pH: '8.0-8.3',
      waterHardness: 'Hard',
      tankSizeMinimum: 20,
      careLevel: 'Easy',
      temperament: 'Peaceful, Reef safe',
      diet: 'Omnivorous - Pellets, Frozen food',
      lifespan: '10-20 years',
      size: '2-3 inches',
      schoolingBehavior: false
    }
  },
  { 
    title: 'Yellow Tang', 
    description: 'Bright yellow saltwater fish, excellent for reef tanks and larger systems', 
    brand: 'FishMart Breeders', 
    gender: 'Saltwater', 
    category: 'Specialty Fish', 
    subcategory: 'Rare Species', 
    price: 89.99, 
    basePrice: 89.99,
    discount: 10, 
    rating: 4.7, 
    theme: 'best sellers', 
    size: ['4-6 inches'], 
    color: ['yellow'], 
    image: ['https://images.unsplash.com/photo-1552649284-97aa3ce87b5f?w=800&q=80'],
    supply: 15, 
    fishAttributes: {
      waterTemperature: '72-78°F (22-26°C)',
      pH: '8.1-8.4',
      waterHardness: 'Hard',
      tankSizeMinimum: 50,
      careLevel: 'Medium',
      temperament: 'Semi-aggressive, Herbivore',
      diet: 'Herbivorous - Algae, Seaweed',
      lifespan: '15-20 years',
      size: '4-6 inches',
      schoolingBehavior: false
    }
  },
  { 
    title: 'Mandarin Fish', 
    description: 'One of the most colorful fish species, requires careful feeding and water conditions', 
    brand: 'FishMart Breeders', 
    gender: 'Saltwater', 
    category: 'Specialty Fish', 
    subcategory: 'Rare Species', 
    price: 149.99, 
    basePrice: 149.99,
    discount: 0, 
    rating: 4.9, 
    theme: 'rare & exotic', 
    size: ['3-4 inches'], 
    color: ['blue','orange','green'], 
    image: ['https://images.unsplash.com/photo-1576941089067-2de3dd663d29?w=800&q=80'],
    supply: 5, 
    fishAttributes: {
      waterTemperature: '72-78°F (22-26°C)',
      pH: '8.1-8.4',
      waterHardness: 'Hard',
      tankSizeMinimum: 30,
      careLevel: 'Hard',
      temperament: 'Peaceful, Shy',
      diet: 'Live microfauna, Hard to acclimate',
      lifespan: '10-15 years',
      size: '3-4 inches',
      schoolingBehavior: false
    }
  },
  { 
    title: 'Firefish - Red', 
    description: 'Fast-moving saltwater fish, adds action and color to reef aquariums', 
    brand: 'FishMart Breeders', 
    gender: 'Saltwater', 
    category: 'Tetras', 
    subcategory: 'Other Tetras', 
    price: 45.00, 
    basePrice: 45.00,
    discount: 0, 
    rating: 4.6, 
    theme: 'premium', 
    size: ['2-3 inches'], 
    color: ['red','white'], 
    image: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80'],
    supply: 20, 
    fishAttributes: {
      waterTemperature: '72-78°F (22-26°C)',
      pH: '8.0-8.3',
      waterHardness: 'Hard',
      tankSizeMinimum: 20,
      careLevel: 'Medium',
      temperament: 'Active, Peaceful',
      diet: 'Small live food, Pellets',
      lifespan: '5-8 years',
      size: '2-3 inches',
      schoolingBehavior: false
    }
  },
  { 
    title: 'Blue Trigger Fish', 
    description: 'Colorful and hardy saltwater fish, aggressive predator species', 
    brand: 'FishMart Breeders', 
    gender: 'Saltwater', 
    category: 'Specialty Fish', 
    subcategory: 'Predatory Fish', 
    price: 85.00, 
    basePrice: 85.00,
    discount: 0, 
    rating: 4.5, 
    theme: 'best sellers', 
    size: ['4-5 inches'], 
    color: ['blue','yellow'], 
    image: ['https://images.unsplash.com/photo-1484406566174-9da000fda645?w=800&q=80'],
    supply: 10, 
    fishAttributes: {
      waterTemperature: '72-78°F (22-26°C)',
      pH: '8.1-8.4',
      waterHardness: 'Hard',
      tankSizeMinimum: 75,
      careLevel: 'Medium',
      temperament: 'Aggressive, Predatory',
      diet: 'Carnivorous - Live food, Fish',
      lifespan: '20+ years',
      size: '4-5 inches',
      schoolingBehavior: false
    }
  },

  // Brackish Fish
  { 
    title: 'Green Spotted Pufferfish', 
    description: 'Unique brackish water pufferfish with cute personality and interactive behavior', 
    brand: 'FishMart Breeders', 
    gender: 'Brackish', 
    category: 'Specialty Fish', 
    subcategory: 'Pufferfish', 
    price: 28.99, 
    basePrice: 28.99,
    discount: 0, 
    rating: 4.7, 
    theme: 'beginner friendly', 
    size: ['1-1.5 inches'], 
    color: ['green','yellow'], 
    image: ['https://images.unsplash.com/photo-1512941691920-25bda36be6de?w=800&q=80'],
    supply: 35, 
    fishAttributes: {
      waterTemperature: '72-82°F (22-28°C)',
      pH: '7.0-8.0',
      waterHardness: 'Brackish/Hard',
      tankSizeMinimum: 30,
      careLevel: 'Medium',
      temperament: 'Peaceful, Interactive',
      diet: 'Snails, Small crustaceans',
      lifespan: '4-8 years',
      size: '1-1.5 inches',
      schoolingBehavior: false
    }
  },
  { 
    title: 'Sailfin Molly - Black', 
    description: 'Beautiful brackish water molly with impressive dorsal fin', 
    brand: 'FishMart Breeders', 
    gender: 'Brackish', 
    category: 'Corydoras', 
    subcategory: 'Standard Corydoras', 
    price: 15.99, 
    basePrice: 15.99,
    discount: 0, 
    rating: 4.4, 
    theme: 'beginner friendly', 
    size: ['3-4 inches'], 
    color: ['black','white'], 
    image: ['https://images.unsplash.com/photo-1505110338299-dcccb5f84a48?w=800&q=80'],
    supply: 50, 
    fishAttributes: {
      waterTemperature: '72-82°F (22-28°C)',
      pH: '7.0-8.0',
      waterHardness: 'Brackish/Hard',
      tankSizeMinimum: 30,
      careLevel: 'Easy',
      temperament: 'Peaceful, Livebearing',
      diet: 'Omnivorous - Algae, Pellets',
      lifespan: '3-5 years',
      size: '3-4 inches',
      schoolingBehavior: false
    }
  },
  { 
    title: 'Knight Goby', 
    description: 'Small brackish water goby with unique personality and excellent for small setups', 
    brand: 'FishMart Breeders', 
    gender: 'Brackish', 
    category: 'Tetras', 
    subcategory: 'Neon Tetras', 
    price: 18.50, 
    basePrice: 18.50,
    discount: 0, 
    rating: 4.5, 
    theme: 'beginner friendly', 
    size: ['1.5-2 inches'], 
    color: ['white','black','orange'], 
    image: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80'],
    supply:45, 
    fishAttributes: {
      waterTemperature: '72-78°F (22-26°C)',
      pH: '7.0-8.0',
      waterHardness: 'Brackish/Moderate',
      tankSizeMinimum: 20,
      careLevel: 'Easy',
      temperament: 'Peaceful, Bottom dweller',
      diet: 'Omnivorous - Pellets, Frozen food',
      lifespan: '4-8 years',
      size: '1.5-2 inches',
      schoolingBehavior: false
    }
  },

  // Specialty/Rare Fish  
  { 
    title: 'Seahorse - Lined', 
    description: 'Gentle and graceful seahorse, requires specialized care and feeding', 
    brand: 'FishMart Breeders', 
    gender: 'Saltwater', 
    category: 'Specialty Fish', 
    subcategory: 'Seahorses', 
    price: 120.00, 
    basePrice: 120.00,
    discount: 0, 
    rating: 4.8, 
    theme: 'rare & exotic', 
    size: ['4-5 inches'], 
    color: ['yellow','orange','brown'], 
    image: ['https://images.unsplash.com/photo-1559827289-6bde5a67ba99?w=800&q=80'],
    supply: 8, 
    fishAttributes: {
      waterTemperature: '69-73°F (21-23°C)',
      pH: '8.0-8.3',
      waterHardness: 'Hard',
      tankSizeMinimum: 30,
      careLevel: 'Hard',
      temperament: 'Peaceful, Slow-moving',
      diet: 'Live plankton, Frozen food',
      lifespan: '4-6 years',
      size: '4-5 inches',
      schoolingBehavior: false
    }
  },
  { 
    title: 'Pea Pufferfish', 
    description: 'Tiny freshwater puffer with big personality, perfect for nano aquariums', 
    brand: 'FishMart Breeders', 
    gender: 'Freshwater', 
    category: 'Specialty Fish', 
    subcategory: 'Pufferfish', 
    price: 12.99, 
    basePrice: 12.99,
    discount: 0, 
    rating: 4.6, 
    theme: 'beginner friendly', 
    size: ['0.5-1 inch'], 
    color: ['yellow','brown'], 
    image: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80'],
    supply: 80,
    fishAttributes: {
      waterTemperature: '72-82°F (22-28°C)',
      pH: '6.5-7.5',
      waterHardness: 'Soft to moderate',
      tankSizeMinimum: 10,
      careLevel: 'Easy',
      temperament: 'Peaceful, Cute personality',
      diet: 'Small live food, Tiny pellets',
      lifespan: '4-5 years',
      size: '0.5-1 inch',
      schoolingBehavior: false
    }
  },
  { 
    title: 'Premium Aquarium Starter Kit Bundle', 
    description: 'Complete bundle with beginner-friendly fish species and care guide', 
    brand: 'FishMart Breeders', 
    gender: 'Freshwater', 
    category: 'Cichlids', 
    subcategory: 'Dwarf Cichlids', 
    price: 199.99, 
    basePrice: 199.99,
    discount: 15, 
    rating: 4.7, 
    theme: 'best sellers', 
    size: ['mixed'], 
    color: ['assorted'], 
    image: ['https://images.unsplash.com/photo-1470114716159-e389f8712fda?w=800&q=80'],
    supply: 25, 
    fishAttributes: {
      waterTemperature: '72-82°F (22-28°C)',
      pH: '6.5-7.5',
      waterHardness: 'Moderate',
      tankSizeMinimum: 20,
      careLevel: 'Easy',
      temperament: 'Peaceful community',
      diet: 'Mixed diet - Pellets, Live food',
      lifespan: 'Varies by species',
      size: 'Mixed sizes',
      schoolingBehavior: true
    }
  },
];

(async () => {
  try {
    // Connect to MongoDB
    const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/FishMart';
    await mongoose.connect(mongoUrl);
    console.log('Connected to MongoDB');

    // Clear existing products
    const deleteResult = await ProductModel.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing products`);

    // Insert new products
    const result = await ProductModel.insertMany(docs);
    console.log(`Successfully inserted ${result.length} new products with images and fish attributes`);
    
    // Verify insertion
    const count = await ProductModel.countDocuments();
    console.log(`Total products now in database: ${count}`);

    // Show first product as example
    const first = await ProductModel.findOne().lean();
    console.log('\nExample product:');
    console.log(JSON.stringify(first, null, 2));

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
})();
