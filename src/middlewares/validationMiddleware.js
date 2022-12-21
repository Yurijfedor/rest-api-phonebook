const Joi = require('joi');

module.exports = {
    addContactValidation: (reg, res, next) => {
        const schema = Joi.object({
      name: Joi.string()
        .strict()
        .trim()
        .min(3)
        .max(30)
        .required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    })

    const validationResult = schema.validate(reg.body);
    if (validationResult.error) {
       return res.status(400).json({"message": "missing required name field"})
        }
        
        next()
    },
    
    updateContactValidation: (reg, res, next) => {
        const schema = Joi.object({
      name: Joi.string()
        .strict()
        .trim()
        .min(3)
        .max(30),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
      phone: Joi.string().length(10).pattern(/^[0-9]+$/),
    })

    const validationResult = schema.validate(reg.body);
    if (validationResult.error) {
       return res.status(400).json({"message": "missing required name field"})
        }
        
        next()
    }
}