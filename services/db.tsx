import mongoose from "mongoose";
interface connect {
    isConnected?: any
}
const connection: connect = {};
async function dbConnection() {
    if (connection.isConnected) {
        return;
    }
    const db = await mongoose.connect(`${process.env.MONGO_URI}`, {
        useNewUrlParser: true,
    } as  mongoose.MongooseOptions);
    connection.isConnected = db.connections[0].readyState;
}
export default dbConnection;
