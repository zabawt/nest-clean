import { ValidationError } from 'class-validator';

export interface SignInForm {
  formError: boolean;
  formErrorMessage?: string;
  errors: ValidationError[];
  loading: boolean;
  login: string;
  password: string;
}

export interface Action<T> {
  type: string;
  payload?: T;
}
