import { screen, render } from "@testing-library/react";
import AvatarEditor from "./AvatarEditor";

// Tests that AvatarEditor renders without errors
it("test_render_avatar_editor", () => {
  render(<AvatarEditor storedUser={{}} />);
  //   screen.logTestingPlaygroundURL(); //gets testing playground URL
  const avatarEditor = screen.getByText("Set my avatar");
  expect(avatarEditor).toBeInTheDocument();
});

it("renders 3 buttons", () => {
  render(<AvatarEditor storedUser={{}} />);

  const button = screen.getAllByRole("button");

  expect(button).toHaveLength(2);
});
