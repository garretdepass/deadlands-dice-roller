// import { data } from "cypress/types/jquery";
import getConnection from "../lib/db.mjs";
import 'dotenv/config'

export async function seedTestData(testDataArray) {

    try {
        // Get connection to test database
        const client = await getConnection();
        const database = client.db(process.env.MONGODB_DATABASE);
        const collection = database.collection(process.env.MONGODB_COLLECTION);

        // Add seed data
        const result = await collection.insertMany(testDataArray);
        const insertedData = await collection.find().toArray()
        // console.log(`I just inserted test data and now the collection contains ${JSON.stringify(insertedData)}`)

    } catch (error) {
        console.log("Using DB:", process.env.MONGODB_DATABASE);

        console.error('Error connecting to MongoDB Atlas', error);
        return {
            statusCode: 500,
            body: 'Internal Server Error setting test data'
        };
    }
}

export async function clearTestData() {
    try {
        // Get connection to test database
        const client = await getConnection();
        const database = client.db(process.env.MONGODB_DATABASE);
        const collection = database.collection(process.env.MONGODB_COLLECTION);

        // Clear test database
        const clearData = await collection.deleteMany({}); 
        const clearedData = await collection.find().toArray()
        // console.log(`I just deleted the data and now the collection contains ${JSON.stringify(clearedData)}`)
    
    } catch (error) {
        console.log("Using DB:", process.env.MONGODB_DATABASE);

        console.error('Error connecting to MongoDB Atlas', error);
        return {
            statusCode: 500,
            body: 'Internal Server Error clearing test data'
        };
    }
}