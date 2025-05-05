import { MongoClient, ObjectId } from 'mongodb';


// Create a new MongoClient
const uri = process.env.MONGODB_URI;

let db;

export default async function  getConnection(){
    if (db) return db;

    const client = new MongoClient(`${uri}`);

    // Updated the line above because it was dynamically adding another appName to my URI.
    // previously it read const client = new MongoClient(`${uri}&appName=devrel.content.netlify`);

    db = await client.connect();
    return db;
}
