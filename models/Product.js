import { Schema, model } from "mongoose";

const productSchema = new Schema({
    sellerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },  
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true},
    materials: [String],  // materials used in an array
    images: [String],  // ???? how to do
    stock: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});


export default model("Product", productSchema);