import Joi from "joi";

const createProductValidation = Joi.object({
    product_name: Joi.string().max(100).required(),
    file: Joi.string().max(255).optional(),
});

const getProductValidation = Joi.number().positive().optional();

const updateProductValidation = Joi.object({
    id: Joi.number().positive().required(),
    product_name: Joi.string().max(100).required(),
    file: Joi.string().max(255).optional(),
});

const searchProductValidation = Joi.object({
    page: Joi.number().min(1).positive().default(1),
    size: Joi.number().min(1).positive().max(100).default(10),
    product_name: Joi.string().optional(),
    id: Joi.number().positive().optional(),
})

export {
    createProductValidation,
    getProductValidation,
    updateProductValidation,
    searchProductValidation
}
