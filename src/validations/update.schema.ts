import Joi from 'joi'

const updateSchema = Joi.object({
  email: Joi.string().email().messages({
    'string.empty': 'Email field can not be empty',
    'string.email': 'Must be a valid email address'

  }),
  username: Joi.string().min(3).messages({
    'string.empty': 'Username field can not be empty',
    'string.min': 'Must have at least 3 characters'

  })
})

export default updateSchema
