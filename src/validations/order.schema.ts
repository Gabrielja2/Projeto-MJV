import Joi from 'joi'

const orderSchema = Joi.object({
  flavor: Joi.string().min(3).required().messages({
    'any.required': 'Flavor field is required',
    'string.empty': 'Flavor field can not be empty',
    'string.min': 'Must have at least 3 characters'

  }),
  quantity: Joi.number().required().integer().min(1).messages({
    'any.required': 'Quantity field is required',
    'number.base': 'Quantity must be a number',
    'number.integer': 'Quantity must be an integer',
    'number.min': 'Quantity must be at least 1'
  }),
  size: Joi.string().required().min(6).messages({
    'any.required': 'Size field is required',
    'string.empty': 'Size field can not be empty',
    'string.min': 'Must have at least 6 characters'

  })
})

export const orderSchemaUpdate = Joi.object({
  flavor: Joi.string().min(3).messages({
    'string.empty': 'Flavor field can not be empty',
    'string.min': 'Must have at least 3 characters'

  }),
  quantity: Joi.number().integer().min(1).messages({
    'number.base': 'Quantity must be a number',
    'number.integer': 'Quantity must be an integer',
    'number.min': 'Quantity must be at least 1'
  }),
  size: Joi.string().min(6).messages({
    'string.empty': 'Size field can not be empty',
    'string.min': 'Must have at least 6 characters'

  })
})

export default orderSchema
