import { MongoClient, ObjectId } from 'mongodb';


// Create a new MongoClient
const uri = process.env.MONGODB_URI;

let db;

export default async function  getConnection(){
    console.log("MONGODB_URI:", process.env.MONGODB_URI);

    if (db) return db;

    // Use for testing local build. Comment out otherwise
    // const client = new MongoClient(`${uri}`);

    // Use for netlify build
    const client = new MongoClient(`${uri}&appName=devrel.content.netlify`);

    db = await client.connect();
    return db;
}