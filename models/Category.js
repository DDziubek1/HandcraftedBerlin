import {Schema, model} from 'mongoose';

const categorySchema = new Schema({
    name: {type: String, required: true,
        enum: ['Books', 'Clothing', 'Candles', 'Jewelry', 'Art', 'Home Goods', 'Toys', 'Other']
    }
}, {timestamps: true});

export default model('Category', categorySchema);