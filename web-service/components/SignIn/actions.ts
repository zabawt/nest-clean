import { ValidationError } from 'class-validator';
import { Action } from './interfaces';

export type actions =
  | ChangeFieldPayload
  | ValidateFormPayload
  | SetFormErrorPayload;

interface ChangeFieldPayload {
  [key: string]: string;
}

interface ValidateFormPayload {
  errors: ValidationError[];
}

interface SetFormErrorPayload {
  formError: boolean;
  formErrorMessage: string;
}

export enum Actions {
  CHANGE_FIELD = 'CHANGE_FIELD',
  VALIDATE_FIELDS = 'VALIDATE_FIELDS',
  SET_FORM_ERROR = 'SET_FORM_ERROR',
}
const action = <T extends any>(type: string, payload?: T): Action<T> => ({
  type,
  payload,
});

export const changeField = (field: string, value: string) =>
  action<ChangeFieldPayload>(Actions.CHANGE_FIELD, { [field]: value });

export const validateFields = (errors: ValidationError[]) =>
  action<ValidateFormPayload>(Actions.VALIDATE_FIELDS, { errors });

export const setFormError = (error: boolean, meesage: string) =>
  action<SetFormErrorPayload>(Actions.SET_FORM_ERROR, {
    formError: error,
    formErrorMessage: meesage,
  });
