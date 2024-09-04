import mongoose from 'mongoose';
import Category from '../models/Category.js';

const categories = [ 'Books', 'Clothing', 'Candles', 'Jewelry', 'Art', 'Home Goods', 'Toys', 'Other'];

mongoose.connect('mongodb+srv://user:denis123@cluster0.ztgqbfm.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

const addCategories = async () => {
    try {
        for (const categoryName of categories) {
            const category = new Category({ name: categoryName });
            await category.save();
            console.log(`Category ${categoryName} added successfully`);
        }
    } catch (error) {
        console.error('Error adding categories:', error);
    } finally {
        mongoose.connection.close();
    }
};

addCategories();