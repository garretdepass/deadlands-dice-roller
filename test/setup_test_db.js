// import { data } from "cypress/types/jquery";
import getConnection from "../lib/db.mjs";
import 'dotenv/config'

export async function seedTestData(testDataArray) {

    try {
        // Get connection to test database
        const client = await getConnection();
        const database = client.db(process.env.MONGODB_DATABASE);
        const collection = database.collection(process.env.MONGODB_COLLECTION);

        // Clear test database and then add seed data
        const clearData = await collection.deleteMany({});
        const result = await collection.insertMany(testDataArray);


    } catch (error) {
        console.log("Using DB:", process.env.MONGODB_DATABASE);

        console.error('Error connecting to MongoDB Atlas', error);
        return {
            statusCode: 500,
            body: 'Internal Server Error at seed test data level'
        };
    }
}