import Joi from 'joi'

const updateSchema = Joi.object({
  email: Joi.string().email().messages({
    'string.empty': 'Email field must be filled',
    'string.email': 'Must be a valid email address'

  }),
  username: Joi.string().min(3).messages({
    'string.empty': 'Email field must be filled',
    'string.min': 'Must have at least 3 characters'

  })
})

export default updateSchema
