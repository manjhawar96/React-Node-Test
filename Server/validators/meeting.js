const Joi = require('joi');

const meetingSchema = Joi.object({
    agenda: Joi.string().required(),
    attendes: Joi.array().items(Joi.string()).optional(),
    attendesLead: Joi.array().items(Joi.string()).optional(),
    location: Joi.string().allow('').optional(),
    related: Joi.string().optional(),
    dateTime: Joi.string().required(),
    notes: Joi.string().allow('').optional(),
    createBy: Joi.string().required(),
});

module.exports = { meetingSchema };