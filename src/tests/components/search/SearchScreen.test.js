import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { SearchScreen } from "../../../components/search/SearchScreen";

describe("Tests in <SearchScreen />", () => {
  test("should load correctly with default values", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".alert-info").text().trim()).toBe("Search a hero");
  });

  test("should show Batman and the input with the queryString value", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find("input").prop("value")).toBe("batman");
    expect(wrapper).toMatchSnapshot();
  });

  test("should show an alert when the hero does not exist", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman132"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );
    expect(wrapper.find(".alert-danger").text().trim()).toBe(
      "No results for batman132"
    );
    expect(wrapper).toMatchSnapshot();
  });

  test("should call the push method from the history", () => {
    const history = {
      push: jest.fn(),
    };
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <Route
          path="/search"
          component={() => <SearchScreen history={history} />}
        />
      </MemoryRouter>
    );
    wrapper.find("input").simulate("change", {
      target: {
        name: "heroeToSearch",
        value: "batman",
      },
    });

    wrapper.find("form").prop("onSubmit")({ preventDefault() {} });
    expect(history.push).toHaveBeenCalledWith("?q=batman");
  });
});
