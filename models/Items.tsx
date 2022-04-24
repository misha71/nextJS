import {Schema, model, models, Types} from "mongoose"
const schema = new Schema({
    title: {type: String, required: true},
    date: {type: Date, default: Date.now},
    owner: {type: Types.ObjectId, ref: 'Client'}
})
const Items = models.Items || model('Items', schema)
export default Items
