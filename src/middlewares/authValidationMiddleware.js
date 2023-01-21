const Joi = require('joi');
const {ValidationError} = require('../helpers/errors')

module.exports = {
    userValidation: (reg, res, next) => {
        const schema = Joi.object({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().min(4).alphanum().required()
    })

    const validationResult = schema.validate(reg.body);
    if (validationResult.error) {
       return res.status(400).json({"message": "missing required name field"})
        }
        
        next()
    },
    
    
  }