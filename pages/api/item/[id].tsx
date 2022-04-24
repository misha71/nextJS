import {NextApiRequest, NextApiResponse} from 'next'
import Items from "../../../models/Items"
import dbConnect from "../../../services/db"
dbConnect();
export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const { method } = req;
    try {
        console.log(req);
        console.log('test');
        const id = req.query.id
        const deleteResult = await Items.remove({_id: id})
        res.status(200).json({message: 'Запиись успешно удалена', type: 'success'})
    }
    catch(e){
        res.status(500).json({message: 'Произошла ошибка на сервере'})
    }
}