import joi from 'joi';

const productsSchema = joi.object({
    sellerId: joi.string().required(),
    name: joi.string().min(3).max(30).required(),
    description: joi.string().min(10).max(250).required(),
    price: joi.number().required(),
    category: joi.string().required(),
    materials: joi.array().items(joi.string()),  // materials used in an array
    images: joi.array().items(joi.string().uri()),  // array of image URIs validates if they are URIs
    stock: joi.number().default(0),
    createdAt: joi.date().default(() => new Date())
});

export default productsSchema;