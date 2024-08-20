import { Schema, model } from "mongoose";

const cartSchema = new Schema({
	userId: { type: Schema.Types.ObjectId, ref: 'User',
         required: true,
          unique: true }, // a user can have only one cart
	items: [{
		productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
		quantity: { type: Number, default: 1 }
	}],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
}, { timestamps: true });

export default model("Cart", cartSchema);