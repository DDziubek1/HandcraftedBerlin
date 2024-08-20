import { Schema, model } from "mongoose";

const userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	address: {
		street: String,
		city: String,
		postalCode: String,
		country: String
	},
	cart: { type: Schema.Types.ObjectId, ref: 'Cart' },
	orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
	listings: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
}, { timestamps: true });

export default model("User", userSchema);