import { MongoClient, ObjectId } from 'mongodb';


// Create a new MongoClient
const uri = process.env.MONGODB_URI;

let db;

export default async function  getConnection(){

    if (db) return db;

    // Use for testing local build. Comment out otherwise
    const client = new MongoClient(`${uri}&appName=Cluster0`);

    // Use for netlify build
    // const client = new MongoClient(`${uri}&appName=devrel.content.netlify`);

    db = await client.connect();
    return db;
}