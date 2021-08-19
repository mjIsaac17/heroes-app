import { AuthContext } from "../../../auth/AuthContext";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { mount } from "enzyme";

describe("Tests in <LoginScreen />", () => {
  const history = {
    replace: jest.fn(),
  };
  const context = { dispatch: jest.fn() };
  const wrapper = mount(
    <AuthContext.Provider value={context}>
      <LoginScreen history={history} />
    </AuthContext.Provider>
  );
  test("should show correctly", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("should do the dispatch and the navigation", () => {
    const handleClick = wrapper.find("button").prop("onClick");
    handleClick();
    expect(history.replace).toHaveBeenCalledWith("/");
    expect(context.dispatch).toHaveBeenCalled();

    localStorage.setItem("lastPath", "/marvel");
    handleClick();
    expect(history.replace).toHaveBeenCalledWith("/marvel");
  });
});
