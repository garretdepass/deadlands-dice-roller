import { describe, it, expect } from 'vitest';
import {render} from '@testing-library/react';
import App from '../src/App.jsx';
import { getCharacters } from '../functions/get_characters.mjs';
import { seedTestData, clearTestData } from './setup_test_db.js';


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

global.fetch = vi.fn()
function createFetchResponse(testDataArray) {
    return {
        json: () => new Promise((resolve) => resolve(testDataArray))
    }
}

describe("App", () =>{
    it("renders all characters from the database", async () => {
        // need to make sure that when the app renders it's pulling from the test data. 
        // This might just be taken care of by test.env but I should make sure.
        
        // fetch.mockResolvedValue(createFetchResponse(testDataArray));
        const {getByText} = render(<App />)

        testDataArray.forEach((character) => {
            expect(getByText(character.name)).toBeInTheDocument()
        })
    })
})