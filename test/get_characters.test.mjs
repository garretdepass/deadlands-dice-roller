import { describe, it, expect } from 'vitest';
import { handler } from '../functions/get_characters.mjs';
import { seedTestData, clearTestData } from './setup_test_db';


const testDataArray = [
    { name: "PLAYER 1", strength: 5 },
    { name: "PLAYER 2", strength: 10 }
]

beforeEach( async () => {
    await clearTestData();
    await seedTestData(testDataArray);
})

afterEach( async () => {
  await clearTestData()
})



describe("getCharacters", () => {
    it("gets all documents from characters collection and returns as a usable array", async () => {
        
        const response = await handler();
        const parsedBody = JSON.parse(response.body)
        console.log(parsedBody)

        expect(response.statusCode).toBe(200);
        expect(parsedBody).toEqual(
            expect.arrayContaining([
              expect.objectContaining({ name: "PLAYER 1", strength: 5 }),
              expect.objectContaining({ name: "PLAYER 2", strength: 10 })
            ])
          );

    });
})