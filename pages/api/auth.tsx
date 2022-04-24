import {NextApiRequest, NextApiResponse} from 'next'
import Client from "../../models/Client"
import dbConnect from "../../services/db"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import initMiddleware from '../../lib/init-middleware'
import validateMiddleware from '../../lib/validate-middleware'
import { check, validationResult } from 'express-validator'
const validateBody = initMiddleware(
    validateMiddleware([
        check('email', 'Введите корректный email').normalizeEmail().isEmail(),
        check('password', 'Введите пароль').exists()
    ], validationResult)
)
dbConnect();

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    try {
        await validateBody(req, res)
        const {email, password} = req.body
        const candidate = await Client.findOne({email})
        if (!candidate) {
            return res.json({message: 'Пользователь не найден'})
        }
        const isCheck = await bcrypt.compare(password, candidate.password)
        if (!isCheck) {
            return res.json({message: 'Неверный пароль, попробуйте позже'})
        }

        const token = jwt.sign(
            {userId: candidate.id},
            `${process.env.JWT_KEY}`,
            {expiresIn: '1h'}
        )
        res.json({
            token,
            userId: candidate.id,
            message: 'Успешно авторизованы',
            type: 'success'
        })
    }
    catch(e){
        res.status(500).json({message: 'Произошла ошибка на сервере'})
    }
}