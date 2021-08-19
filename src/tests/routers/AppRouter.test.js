import { shallow, mount } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import { AppRouter } from "../../routers/AppRouter";

describe("Test in <AppRouter/>", () => {
  const contextValue = {
    dispatch: jest.fn(),
    user: { logged: false },
  };
  test("should show the login if the user is not authenticated", () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );
    // console.log(wrapper.html()); //here we can see the html of the login
    expect(wrapper).toMatchSnapshot();
  });

  test("should show the marvel component if the user is authenticated", () => {
    const contextValue = {
      dispatch: jest.fn(),
      user: { name: "Isaac", logged: true },
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValue}>
        <AppRouter />
      </AuthContext.Provider>
    );
    // console.log(wrapper.html());
    expect(wrapper).toMatchSnapshot();
    //if the navbar exists we now we are authenticated
    expect(wrapper.find("nav").exists()).toBe(true);
  });
});
