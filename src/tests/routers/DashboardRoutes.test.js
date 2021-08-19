import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../auth/AuthContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

describe("Tests in <DashboardRoutes />", () => {
  const context = {
    dispatch: jest.fn(),
    user: {
      name: "Isaac",
      logged: true,
    },
  };
  test("should show properly", () => {
    const wrapper = mount(
      <AuthContext.Provider value={context}>
        {/* MemoryRouter is a component that simulates a <Router> for testing */}
        <MemoryRouter>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text().trim()).toBe(context.user.name);
  });
});
