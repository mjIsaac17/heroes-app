import { mount } from "enzyme";
import { MemoryRouter, Router } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
import { Navbar } from "../../../components/ui/Navbar";
import { types } from "../../../types/types";

describe("Tests in <Navbar/>", () => {
  const historyMock = {
    push: jest.fn(),
    replace: jest.fn(),
    listen: jest.fn(),
    createHref: jest.fn(),
    location: {},
  };

  const context = {
    dispatch: jest.fn(),
    user: {
      name: "Diana",
      logged: true,
    },
  };

  const wrapper = mount(
    <AuthContext.Provider value={context}>
      <MemoryRouter>
        <Router history={historyMock}>
          <Navbar />
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  //Always when we use mocks we should clean them
  afterEach(() => {
    jest.clearAllMocks();
  });
  test("should show correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("should call the logout and use history", () => {
    wrapper.find("button").prop("onClick")();
    expect(context.dispatch).toHaveBeenCalledWith({ type: types.logout });
  });
});
