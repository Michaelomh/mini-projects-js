import { render, screen } from "@testing-library/react"

import App from "./App"

describe("App", () => {
  it("Renders hello world", () => {
    render(<App />)

    // toHaveTextContent to make sure that jest-dom is loaded
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Hello World")
  })
})
