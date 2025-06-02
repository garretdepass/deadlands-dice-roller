// import { data } from "cypress/types/jquery";
import getConnection from "../lib/db.mjs";
import "dotenv/config";

export async function seedTestData(testDataArray) {
  const newArray = testDataArray.map((object) => {
    object.isTestData = true;
    return object;
  });

  console.log(newArray);

  try {
    // Get connection to test database
    const client = await getConnection();
    const database = client.db(process.env.MONGODB_DATABASE);
    const collection = database.collection(process.env.MONGODB_COLLECTION);

    // Add seed data
    const result = await collection.insertMany(newArray);
    const insertedData = await collection.find().toArray();
  } catch (error) {
    console.log("Using DB:", process.env.MONGODB_DATABASE);

    console.error("Error connecting to MongoDB Atlas", error);
    return {
      statusCode: 500,
      body: "Internal Server Error setting test data",
    };
  }
}

export async function clearTestData() {
  try {
    // Get connection to test database
    const client = await getConnection();
    const database = client.db(process.env.MONGODB_DATABASE);
    const collection = database.collection(`${process.env.MONGODB_COLLECTION}`);

    // Clear test data from database
    const clearData = await collection.deleteMany({
      isTestData: true,
    });
    const clearedData = await collection.find().toArray();
  } catch (error) {
    console.log("Using DB:", process.env.MONGODB_DATABASE);

    console.error("Error connecting to MongoDB Atlas", error);
    return {
      statusCode: 500,
      body: "Internal Server Error clearing test data",
    };
  }
}
