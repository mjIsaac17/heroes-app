import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe("Test in authReducer", () => {
  const initialState = {
    name: "Isaac",
    logged: true,
  };

  test("should return the state by default", () => {
    const state = authReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test("should authenticate and set the user name", () => {
    const state = authReducer(
      { logged: false },
      { type: types.login, payload: { name: "Erika" } }
    );
    // expect(state.logged).toBe(true);
    // expect(state.name).toBe("Erika");
    expect(state).toEqual({ logged: true, name: "Erika" });
  });

  test("should delete the user name and set the logged to false", () => {
    const state = authReducer(initialState, { type: types.logout });
    expect(state).toEqual({ logged: false, name: undefined });
  });
});
