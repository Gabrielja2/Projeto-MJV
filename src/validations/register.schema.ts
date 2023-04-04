import Joi from 'joi'

const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'any.required': 'Email field must be filled',
    'string.empty': 'Email field must be filled',
    'string.email': 'Must be a valid email address'

  }),
  password: Joi.string().min(8).regex(/^(?=^.{8,}$)((?=.*\d))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*^/).required().messages({
    'any.required': 'Password field must be filled',
    'string.empty': 'Password field must be filled',
    'string.min': 'Must have at least 8 characters',
    'string.pattern.base': 'Must have at least one uppercase character and a number'
  }),

  username: Joi.string().required().min(3).messages({
    'any.required': 'Email field must be filled',
    'string.empty': 'Email field must be filled',
    'string.min': 'Must have at least 3 characters'

  })
})

export default registerSchema
