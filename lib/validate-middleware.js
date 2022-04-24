export default function validateMiddleware(validations, validationResult) {
    return async (req, res, next) => {
        await Promise.all(validations.map((validation) => validation.run(req)))

        const errors = validationResult(req)
        if (errors.isEmpty()) {
            return next()
        }

        return res.json({message: errors.array().map((item) => item.msg).join(", ")})
    }
}