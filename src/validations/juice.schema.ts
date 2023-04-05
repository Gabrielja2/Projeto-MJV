import Joi from 'joi'

const juiceSchema = Joi.object({
  flavor: Joi.string().required().min(3).messages({
    'any.required': 'Flavor field is required',
    'string.empty': 'Flavor field can not be empty',
    'string.min': 'Must have at least 3 characters'

  }),
  description: Joi.string().required().min(8).max(100).messages({
    'any.required': 'Description field is required',
    'string.empty': 'Description field must be filled',
    'string.min': 'Must have at least 8 characters',
    'string.max': 'Must have at least 100 characters'
  }),
  size: Joi.string().required().min(6).messages({
    'any.required': 'Size field is required',
    'string.empty': 'Flavor field must be filled',
    'string.min': 'Must have at least 6 characters'

  }),
  price: Joi.number().required().integer().min(1).messages({
    'any.required': 'Price field is required',
    'number.base': 'Price must be a number',
    'number.integer': 'Price must be an integer',
    'number.min': 'Price must be at least 1'
  })
})

export const juiceUpdateSchema = Joi.object({
  flavor: Joi.string().min(3).messages({
    'string.empty': 'Flavor field can not be empty',
    'string.min': 'Must have at least 3 characters'

  }),
  description: Joi.string().min(8).max(100).messages({
    'string.empty': 'Description field can not be empty',
    'string.min': 'Must have at least 8 characters',
    'string.max': 'Must have at least 100 characters'
  }),
  size: Joi.string().min(6).messages({
    'string.empty': 'Size field can not be empty',
    'string.min': 'Must have at least 6 characters'

  }),
  price: Joi.number().integer().min(1).messages({
    'number.base': 'Price must be a number',
    'number.integer': 'Price must be an integer',
    'number.min': 'Price must be at least 1'
  })
})

export default juiceSchema
