import { render, screen } from "@testing-library/react";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

test("it renders the logo", () => {
  const { container } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  screen.logTestingPlaygroundURL(); //gets testing playground URL

  const logo = screen.getByRole("img", {
    name: /tgram/i,
  });
  const homeLink = container.querySelector(
    "#navbarNav > ul > li:nth-child(1) > a > svg > path"
  );
  // const linkElement = screen.getByText(/learn react/i);
  expect(logo).toBeInTheDocument();
  expect(homeLink).toBeInTheDocument();
});

it("renders the login button", () => {
  const { container } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  const login = container.querySelector(
    "#navbarNav > ul > li:nth-child(2) > a > svg"
  );

  expect(login).toBeInTheDocument();
});
