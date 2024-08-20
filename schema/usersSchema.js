import joi from 'joi';

const usersSchema = joi.object({
    
    username: joi.string().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    address: joi.object({
        street: joi.string().min(3),
        city: joi.string().min(2),
        postalCode: joi.string().min(5),
        country: joi.string().min(3)
    }),
    cart: joi.string(), // cart id
    orders: joi.array().items(joi.string()), // array of order ids
    listings: joi.array().items(joi.string()), // array of product ids
    createdAt: joi.date(),
    updatedAt: joi.date()
});

export default usersSchema;