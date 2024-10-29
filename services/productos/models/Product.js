const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  animalType: { type: String, required: true },
  brand: { type: String, required: true },
  stock: { type: Number, required: true },
  images: [String],
  specifications: {
    weight: String,
    dimensions: String,
    material: String
  },
  tags: [String],
  averageRating: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);