import Joi from "joi";

const registerUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required(),
    name: Joi.string().max(100).required(),
    file: Joi.string().max(255)
});

const loginUserValidation = Joi.object({
    username: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
});

const getUserValidation = Joi.number().required();

const updateUserValidation = Joi.object({
    username: Joi.string().max(100).optional(),
    id: Joi.number().optional(),
    password: Joi.string().max(100).optional(),
    name: Joi.string().max(100).optional(),
    file: Joi.string().max(255).optional(),
})

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation,
    updateUserValidation
}
