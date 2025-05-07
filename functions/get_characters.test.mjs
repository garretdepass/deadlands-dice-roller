import { describe, it, expect } from 'vitest';
import { getCharacters } from './get_characters.mjs';
import { seedTestData } from '../test/setup_test_db';


const testDataArray = [
    { name: "PLAYER 1", strength: 5 },
    { name: "PLAYER 2", strength: 10 }
]

beforeAll(async () => {
});

describe("getCharacters", () => {
    it("gets all documents from characters collection and returns as a usable array", async () => {
        
        await seedTestData(testDataArray);
        const response = await getCharacters();
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