import {Schema, model, models, Types} from "mongoose"
const schema = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    items: [{type: Types.ObjectId, ref: 'Items'}]
})
const Client = models.Client || model('Client', schema)
export default Client