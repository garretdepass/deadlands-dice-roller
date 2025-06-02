import getConnection from "../lib/db.mjs";

export async function handler(event, context) {
  // export async function getCharacters() {

  try {
    const client = await getConnection();
    const database = client.db(process.env.MONGODB_DATABASE);
    const collection = database.collection(process.env.MONGODB_COLLECTION);

    const data = await collection.find().toArray();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error("Error connection to MongoDB Atlas", error);
    return {
      statusCode: 500,
      body: "Internal Server Error at get characters function level",
    };
  }
}
