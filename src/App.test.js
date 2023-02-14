import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import App from "./App";

jest.mock("firebase/firestore", () => {
  const module = jest.requireActual("firebase/firestore");

  return {
    ...module,
    getDocs: (q) => ({
      docs: [
        {
          id: Date.now().toString(),
          data() {
            return { name: "test album", title: "test img", url: "test-url" };
          },
        },
      ],
    }),

    addDocs: (doc, options) => ({
      id: Date.now(),
    }),
    updateDoc: (doc, options) => ({
      id: Date.now(),
    }),
    deleteDoc: (q) => null,
  };
});

describe("App logic and functionality is implemented correctly", () => {
  test("AlbumForm is conditionally rendered when the button is clicked", async () => {
    user.setup();
    render(<App />);

    const addBtnEl = await screen.findByRole("button", {
      name: /add album/i,
    });
    await user.click(addBtnEl);

    const formEl = document.querySelector("form");
    const headingEl = screen.getByText(/create an album/i);

    expect(formEl).toBeInTheDocument();
    expect(headingEl).toBeInTheDocument();

    const cancelBtnEl = screen.getByRole("button", { name: /cancel/i });
    await user.click(cancelBtnEl);

    const afterFormEl = screen.queryByRole("form");
    const afterHeadingEl = screen.queryByText(/create an album/i);

    expect(afterFormEl).not.toBeInTheDocument();
    expect(afterHeadingEl).not.toBeInTheDocument();
  });

  test("Album is added when the form is submitted", async () => {
    user.setup();
    render(<App />);

    const addBtnEl = await screen.findByRole("button", { name: /add album/i });
    await user.click(addBtnEl);

    const albumNameInputEl = await screen.findByPlaceholderText("Album Name");
    const subBtnEl = await screen.findByRole("button", { name: /create/i });

    await user.type(albumNameInputEl, "testalbumxyz");
    await user.click(subBtnEl);

    const newAlbumEl = await screen.findByText(/testalbumxyz/i);
    expect(newAlbumEl).toBeInTheDocument();
  });

  test("App renders the image list when user clicks on an album", async () => {
    user.setup();
    render(<App />);

    const albumEl = await screen.findByText(/test album/i);
    await user.click(albumEl);

    const headingEl = await screen.findByRole("heading", {
      name: /Images in test album/i,
    });
    const imgEl = await screen.findByAltText(/test img/i);

    expect(headingEl).toBeInTheDocument();
    expect(imgEl).toBeInTheDocument();
  });

  test("ImageForm is conditionally rendered when the button is clicked", async () => {
    user.setup();
    render(<App />);

    const albumEl = await screen.findByText(/test album/i);
    await user.click(albumEl);

    const addBtnEl = await screen.findByRole("button", {
      name: /add image/i,
    });
    await user.click(addBtnEl);

    const formEl = document.querySelector("form");
    const headingEl = screen.getByText(/add image to/i);

    expect(formEl).toBeInTheDocument();
    expect(headingEl).toBeInTheDocument();

    const cancelBtnEl = screen.getByRole("button", { name: /cancel/i });
    await user.click(cancelBtnEl);

    const afterFormEl = screen.queryByRole("form");
    const afterHeadingEl = screen.queryByText(/add image to/i);

    expect(afterFormEl).not.toBeInTheDocument();
    expect(afterHeadingEl).not.toBeInTheDocument();
  });

  test("Image is added when the form is submitted", async () => {
    user.setup();
    render(<App />);

    const albumEl = await screen.findByText(/test album/i);
    await user.click(albumEl);

    const addBtnEl = await screen.findByRole("button", { name: /add image/i });
    await user.click(addBtnEl);

    const titleInputEl = await screen.findByPlaceholderText("Title");
    const urlInputEl = await screen.findByPlaceholderText("Image URL");
    const createBtnEl = await screen.findByRole("button", { name: /add/i });

    await user.type(titleInputEl, "testtitle");
    await user.type(urlInputEl, "testurl");
    await user.click(createBtnEl);

    const imgEl = await screen.findByAltText(/testtitle/i);
    expect(imgEl).toBeInTheDocument();
  });

  test("App renders the album list when back button is clicked", async () => {
    user.setup();
    render(<App />);

    const albumEl = await screen.findByText(/test album/i);
    await user.click(albumEl);

    const backBtnEl = await screen.findByAltText(/back/i);
    await user.click(backBtnEl);

    const afterAlbumEl = await screen.findByText(/test album/i);
    const imgEl = screen.queryByAltText(/test img/i);

    expect(afterAlbumEl).toBeInTheDocument();
    expect(imgEl).not.toBeInTheDocument();
  });
});

describe("Integration with firebase is implemented correctly", () => {
  test("App renders the mock data correctly", async () => {
    render(<App />);
    const albumEl = await screen.findByText(/test album/i);
    expect(albumEl).toBeInTheDocument();

    await user.click(albumEl);

    const imgEl = await screen.findByAltText(/test img/i);
    expect(imgEl).toBeInTheDocument();
  });
});
