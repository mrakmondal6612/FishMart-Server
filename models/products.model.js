const mongoose = require("mongoose");

// Variant Schema - each variant is a specific combination of attributes
const variantSchema = mongoose.Schema({
  sku: { type: String, required: true }, // Unique SKU for tracking (uniqueness enforced at parent level, not globally)
  size: { type: String, default: null }, // e.g., "M", "L", "XL"
  color: { type: String, default: null }, // e.g., "Red", "Blue"
  // Additional variant attributes can be added here (storage, material, etc.)
  variantAttributes: { type: Map, of: String, default: {} }, // For extensible attributes like {storage: "256GB", material: "leather"}
  
  // Variant-specific pricing
  basePrice: { type: Number, required: true },
  tax: {
    type: { type: String, enum: ['free', 'percentage'], default: 'free' },
    value: { type: Number, default: 0 }
  },
  shippingCost: {
    type: { type: String, enum: ['free', 'fixed'], default: 'free' },
    value: { type: Number, default: 0 }
  },
  discount: {
    type: { type: String, enum: ['percentage', 'fixed', 'coupon'], default: 'percentage' },
    value: { type: Number, default: 0 }
  },
  price: { type: Number, required: true }, // Final calculated price for this variant
  
  // Variant-specific stock
  stock: { type: Number, default: 0, min: 0 },
  
  // Variant-specific images
  images: {
    type: [
      new mongoose.Schema(
        {
          url: { type: String, required: true },
          caption: { type: String, default: "" },
          alt: { type: String, default: "" },
          order: { type: Number, default: 0 },
          // Per-image metadata for admin-provided variants
          size: { type: String, default: null },
          color: { type: String, default: null },
          price: { type: Number, default: null },
          stock: { type: Number, default: null },
        },
        { _id: false }
      ),
    ],
    default: [],
  },
  
  // Status
  isActive: { type: Boolean, default: true },
}, { _id: true, timestamps: true });

const productSchema = mongoose.Schema({
  title: { type: String, required: true }, // Fish species name, e.g., "Red Tiger Oscar"
  description: { type: String, required: true },
  brand: { type: String, required: true }, // Breeder/supplier name
  gender: { type: String, required: true }, // REPURPOSED: Aquarium type (Freshwater, Saltwater, Brackish, Predatory)
  category: { type: String, required: true }, // Fish type (Cichlids, Tetras, Goldfish, Bettas, Corydoras, Discus, Plecos, etc.)
  subcategory: { type: String, required: true }, // More specific type (e.g., "Dwarf Cichlids", "Cardinal Tetras")
  
  // Fish-specific attributes
  fishAttributes: {
    waterTemperature: { type: String, default: "" }, // e.g., "24-28°C"
    pH: { type: String, default: "" }, // e.g., "6.0-7.0"
    waterHardness: { type: String, default: "" }, // e.g., "5-15 dGH"
    tankSizeMinimum: { type: Number, default: 0 }, // Minimum tank size in gallons
    careLevel: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Medium' },
    temperament: { type: String, default: "" }, // e.g., "Peaceful", "Aggressive"
    diet: { type: String, default: "" }, // e.g., "Omnivore", "Carnivore"
    lifespan: { type: String, default: "" }, // e.g., "8-10 years"
    size: { type: String, default: "" }, // Adult size, e.g., "3-4 inches"
    schoolingBehavior: { type: Boolean, default: false }, // Whether it prefers schools
  },
  
  // Parent product identification
  parentProductId: { type: mongoose.Schema.Types.ObjectId, ref: "product", default: null }, // If this is a variant, reference to parent
  isParentProduct: { type: Boolean, default: false }, // Flag to identify parent products
  
  // Pricing breakdown fields (for parent/default or legacy single-product scenario)
  basePrice: { type: Number, required: true }, // Original product price set by admin
  tax: {
    type: { type: String, enum: ['free', 'percentage'], default: 'free' },
    value: { type: Number, default: 0 } // Percentage value if type is 'percentage'
  },
  shippingCost: {
    type: { type: String, enum: ['free', 'fixed'], default: 'free' },
    value: { type: Number, default: 0 } // Fixed amount in Rs if type is 'fixed'
  },
  discount: {
    type: { type: String, enum: ['percentage', 'fixed', 'coupon'], default: 'percentage' },
    value: { type: Number, default: 0 } // Percentage or fixed amount
  },
  price: { type: Number, required: true }, // Final calculated price
  rating: { type: Number, default: 0 },
  theme: { type: String, required: true },
  
  // New: list of key product features
  features: { type: [String], default: [] },
  size: { type: [String], default: [] },
  color: { type: [String], default: [] },
  
  // Legacy flat URL list for compatibility with existing consumers
  image: { type: [String], default: [] },
  
  // New structured images with metadata and ordering
  images: {
    type: [
      new mongoose.Schema(
        {
          url: { type: String, required: true },
          caption: { type: String, default: "" },
          alt: { type: String, default: "" },
          order: { type: Number, default: 0 },
        },
        { _id: false }
      ),
    ],
    default: [],
  },
  
  supply: { type: Number, default: 0 },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: false },
  featured: { type: Boolean, default: false },
  // Product status: when false, product should be hidden from public listings
  isActive: { type: Boolean, default: true },
  
  // Variants array - only populated for parent products
  variants: [variantSchema],
  
}, { timestamps: true });

// Add sparse index for variants.sku so nulls don't conflict
productSchema.index({ 'variants.sku': 1 }, { sparse: true });

const ProductModel = mongoose.model("product", productSchema);

// On DB connection open, attempt to remove legacy unique index that
// causes E11000 duplicate key errors for null `variants.sku` entries.
mongoose.connection.once('open', async () => {
  try {
    const indexes = await ProductModel.collection.indexes();
    const hasLegacy = indexes.some(i => i.name === 'variants.sku_1');
    if (hasLegacy) {
      await ProductModel.collection.dropIndex('variants.sku_1');
      console.log('✅ Dropped legacy index variants.sku_1');
    } else {
      console.log('ℹ️ legacy index variants.sku_1 not present');
    }
  } catch (err) {
    console.log('⚠️ Could not drop legacy index variants.sku_1:', err.message);
  }
});

module.exports = {ProductModel};

