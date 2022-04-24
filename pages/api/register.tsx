import {NextApiRequest, NextApiResponse} from 'next'
import Client from "../../models/Client"
import dbConnect from "../../services/db"
import bcrypt from 'bcryptjs';
import initMiddleware from '../../lib/init-middleware'
import validateMiddleware from '../../lib/validate-middleware'
import { check, validationResult } from 'express-validator'
const validateBody = initMiddleware(
    validateMiddleware([
        check('email', 'Некорреткный email').isEmail(),
        check('password', "Минимальная длина: 6 символов").isLength({min: 6})
    ], validationResult)
)
dbConnect();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {email, password} = req.body
        await validateBody(req, res)
        /*
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json({message: errors.array().map((item) => item.msg).join(", ")})
        }
        */
        const candidate = await Client.findOne({email})
        if (candidate) {
            return res.json({message: 'Такой пользователь уже существует'})
        }
        const hashPassword = await bcrypt.hash(password, 12)
        const client = new Client({email, password: hashPassword})
        await client.save()
        //res.status(201).json({message: 'Пользователь создан', type: 'success'})
        //res.status(201).send({message: 'Пользователь создан', type: 'success'})
        setTimeout(() => {
            res.status(201).json({message: 'Пользователь создан', type: 'success'})
        }, 2000)

    }
    catch (e){
        res.status(500).json({message: 'Произошла ошибка на сервере'})
    }
}