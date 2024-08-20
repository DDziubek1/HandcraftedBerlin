import {Schema, model} from "mongoose";

const orderSchema = new Schema({
    buyerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
        priceAtPurchase: { type: Number, required: true }  // price at the time of purchase
    }],
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
    paymentMethod: { type: String, enum: ['credit_card', 'paypal', 'bank_transfer', 'cash'], required: true },
    
}, { timestamps: true }); // Add createdAt and updatedAt timestamps

export default model("Order", orderSchema);
