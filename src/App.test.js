import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App renders correctly", () => {
  test("renders correctly", () => {
    render(<App />);
    const textElement = screen.getByText("Users");
    expect(textElement).toBeInTheDocument();
  });
});
