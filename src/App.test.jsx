import { describe, it, expect } from 'vitest';
import App from './App.jsx';
import {render} from '@testing-library/react'

describe("App", () =>{
    it("renders Hello, world! heading", () => {
    const {asFragment, getByText} = render(<App />)
  expect(getByText('Hello, world!')).toBeInTheDocument()
//   expect(asFragment()).toMatchInlineSnapshot(`
//     <h1>Hello, World!</h1>
//   `)
    })
})


// basic test to see if I can tell whether something is rendering passed! Now I can do UI tests on App.jsx 🚀🚀🚀