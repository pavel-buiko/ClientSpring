import { thunk } from "redux-thunk";
import { loginThunk, loginAction, loginError } from "../actions";
import { jest } from "@jest/globals";
import * as mockStoreModule from "redux-mock-store";

const configureMockStore = mockStoreModule.default;
const middlewares = [thunk];
const mockStore = configureMockStore.default(middlewares);

global.fetch = jest.fn();

describe("loginThunk", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    fetch.mockClear();
    jest.clearAllMocks();
    jest.spyOn(Storage.prototype, "setItem");
  });

  it("should dispatch loginAction and store user data on successful login", async () => {
    const mockResponse = { username: "admin", token: "1234" };

    fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: () => Promise.resolve(mockResponse),
    });

    const expectedActions = [loginAction(mockResponse)];

    const result = await store.dispatch(loginThunk("admin", "1234"));

    expect(store.getActions()).toEqual(expectedActions);
    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      "user",
      JSON.stringify(mockResponse)
    );
    expect(result).toEqual({ success: true });
  });

  it("should dispatch loginError and return failure on unsuccessful login", async () => {
    const mockErrorResponse = { message: "Invalid credentials" };

    fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: () => Promise.resolve(mockErrorResponse),
    });

    const expectedActions = [loginError(mockErrorResponse.message)];

    const result = await store.dispatch(loginThunk("admin", "wrong"));

    expect(store.getActions()).toEqual(expectedActions);
    expect(result).toEqual({
      success: false,
      message: mockErrorResponse.message,
    });
  });
});
