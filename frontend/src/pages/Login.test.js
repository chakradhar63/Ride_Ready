import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import Login from "./Login";

jest.mock("axios");

describe("Login Component", () => {
  test("renders login form with input fields and button", () => {
    render(<Login />, { wrapper: MemoryRouter });

    // Check if username and password input fields are present
    expect(screen.getByPlaceholderText(/username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  test("user can enter username and password", () => {
    render(<Login />, { wrapper: MemoryRouter });

    // User enters username and password
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });

    // Check if the entered values are updated in the input fields
    expect(screen.getByPlaceholderText(/username/i).value).toBe("test@example.com");
    expect(screen.getByPlaceholderText(/password/i).value).toBe("password123");
  });

  test("user can click login button", async () => {
    render(<Login />, { wrapper: MemoryRouter });

    // Mocking Axios post request
    axios.post.mockResolvedValue({ data: {} });

    // User enters username and password
    fireEvent.change(screen.getByPlaceholderText(/username/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: "password123" },
    });

    // Click the login button
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Check if Axios post request is called with the correct data
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        process.env.REACT_APP_BASE_URL + "/api/users/login",
        { username: "test@example.com", password: "password123" }
      );
    });
  });
});