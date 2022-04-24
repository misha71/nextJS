import {NextApiRequest, NextApiResponse} from 'next'
import Items from "../../models/Items"
import dbConnect from "../../services/db"
import jwt from 'jsonwebtoken';
import initMiddleware from '../../lib/init-middleware'
import authMiddleware from '../../lib/auth-middleware'
import validateMiddleware from '../../lib/validate-middleware'
import { check, validationResult } from 'express-validator'
const validateBody = initMiddleware(
    validateMiddleware([
        check('title', 'Введите запись').exists()
    ], validationResult)
)
const validateAuth = initMiddleware(authMiddleware())
dbConnect();
interface ItemsApiRequest extends NextApiRequest{
    client: {userId: string | number}
}
export default async function handler(req:ItemsApiRequest, res:NextApiResponse) {
    const { method } = req;
    try {
        switch (method) {
            case 'POST':
                await validateBody(req, res)
                await validateAuth(req, res)
                const {title} = req.body

                const item = new Items({title, owner: req.client.userId})
                await item.save()
                res.json({
                    message: 'Данные были успешно добавлены',
                    item,
                    type: 'success'
                })
                break
            case 'GET':
                await validateAuth(req, res)
                const items = await Items.find({owner: req.client.userId})
                console.log(req.client.userId)
                res.json({items})
        }
    }
    catch(e){
        res.status(500).json({message: 'Произошла ошибка на сервере'})
    }
}