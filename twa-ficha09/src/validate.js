import {fieldErrors} from './errors.js'

export const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body ?? {})
    if (!result.success) return res.status(400).json({errors: fieldErrors(result.error)})
    req.body = result.data
    next()
}