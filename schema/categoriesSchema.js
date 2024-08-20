import joi from 'joi';

const categoriesSchema = joi.object({
    name: joi.string().min(3).max(30).required()
});

export default categoriesSchema;