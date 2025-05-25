import { ObjectId, ReturnDocument } from "mongodb";
import getConnection from "../lib/db.mjs";  

export async function handler(event, contex) {
    try {
        const client = await getConnection();
        const database = client.db(process.env.MONGODB_DATABASE);
        const collection = database.collection(process.env.MONGODB_COLLECTION);


        const { body } = event;
        const {_id, key, value} = JSON.parse(body);

        const result = await collection.findOneAndUpdate({_id: new ObjectId(_id)}, {$set: {[key]: value}}, {returnDocument: 'after'})

        return {
            statusCode: 200,
            body: JSON.stringify(result)
        };

    } catch (error) {
        console.error('Error connecting to MongoDB Atlas', error)
        return {
            statusCode: 500,
            body: 'Internal Server Error'
        };
    }
}