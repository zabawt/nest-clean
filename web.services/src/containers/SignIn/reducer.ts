import { Actions, actions } from "./actions";
import { Action, SignInForm } from "./interfaces";

export const reducer = (
  state: SignInForm,
  action: Action<actions>
): SignInForm => {
  switch (action.type) {
    case Actions.CHANGE_FIELD:
    case Actions.VALIDATE_FIELDS:
    case Actions.SET_FORM_ERROR:
      return { ...state, ...action.payload };
    default:
      throw new Error("Invalid action dispatched.");
  }
};
