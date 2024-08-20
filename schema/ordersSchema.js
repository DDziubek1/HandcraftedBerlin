import joi from 'joi';

const ordersSchema = joi.object({
    userId: joi.string().required(),
    products: joi.array().items(joi.object({
        productId: joi.string().required(),
        quantity: joi.number().required(),
        priceAtPurchase: joi.number().required()  // price at the time of purchase
    })).required(),
    status: joi.string().required(),
    paymentMethod: joi.string().valid('credit_card', 'paypal', 'bank_transfer', 'cash').required(),
    createdAt: joi.date(),
    updatedAt: joi.date()
});

export default ordersSchema;