import jwt from 'jsonwebtoken';
export default function authMiddleware() {
    return async (req, res, next) => {
        if(req?.method == 'OPTIONS'){
            return next()
        }
        try{
            const token = req.headers.authorization.split(' ')[1] // "Bearer TOKEN"
            if(!token){
                res.json({message: 'Ошибка авторизации', error: true})
            }
            const decoded = jwt.verify(token, `${process.env.JWT_KEY}`)
            req.client = decoded
            next()
        }
        catch(e){
            res.json({message: 'Ваш токен истек, авторизуйтесь еще раз',  error: true})
        }
    }
}