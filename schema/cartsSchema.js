import joi from 'joi';

const cartSchema = joi.object({
    userId: joi.string().required(),
    products: joi.array().items(joi.object({
        productId: joi.string().required(),
        quantity: joi.number().required()
    })).required()
    });

export default cartSchema;