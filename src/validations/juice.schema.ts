import Joi from 'joi'

const juiceSchema = Joi.object({
  flavor: Joi.string().required().min(3).messages({
    'any.required': 'Flavor field must be filled',
    'string.empty': 'Flavor field must be filled',
    'string.min': 'Must have at least 3 characters'

  }),
  description: Joi.string().required().min(8).max(100).messages({
    'any.required': 'Description field must be filled',
    'string.empty': 'Description field must be filled',
    'string.min': 'Must have at least 8 characters',
    'string.max': 'Must have at least 100 characters'
  })
})

export default juiceSchema
