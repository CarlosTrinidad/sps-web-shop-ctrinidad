import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

import { BrowserRouter } from "react-router";
import Signup from "../../pages/Login/Signup";

// Mock useTranslation hook
vi.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

// Mock useAuth hook
vi.mock("../../hooks/useAuth", () => ({
  __esModule: true,
  default: () => ({ user: null }),
}));

describe("Signup Component (Basic)", () => {
  it("renders the sign up form elements", () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("heading", { name: "create_your_account" })
    ).toBeInTheDocument();
    expect(screen.getByLabelText("email")).toBeInTheDocument();
    expect(screen.getByLabelText("password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "create_your_account" })
    ).toBeInTheDocument();
  });
});
describe("Signup Component (Input Fields)", () => {
  it("updates email input value on change", () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const emailInput = screen.getByLabelText("email");
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    expect(emailInput).toHaveValue("test@example.com");
  });

  it("updates password input value on change", () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );

    const passwordInput = screen.getByLabelText("password");
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(passwordInput).toHaveValue("password123");
  });
});
