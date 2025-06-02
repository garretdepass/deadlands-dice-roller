import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import App from "../src/App.jsx";
import { seedTestData, clearTestData } from "./setup_test_db.js";

const testDataArray = [
  { name: "PLAYER 1", strength: 5 },
  { name: "PLAYER 2", strength: 10 },
];

beforeEach(async () => {
  await clearTestData();
  await seedTestData(testDataArray);
});

afterEach(async () => {
  await clearTestData();
});

describe("App", () => {
  it("renders all characters from the database", async () => {
    const { findByText } = render(<App />);

    testDataArray.forEach(async (character) => {
      const characterName = await findByText(character.name);
      expect(characterName).toBeInTheDocument();
    });
  });
});
