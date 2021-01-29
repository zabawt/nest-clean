import { Box, Button, Grid, TextField, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { AuthApi } from "../../../api/auth";
import React, { ChangeEvent, FormEvent, useReducer } from "react";
import { LoadingIndicator } from "../../components/loadingIndicator";
import { SignInDto } from "../../dto/signInDto";
import { ValidationError, Validator } from "class-validator";
import { SignInForm } from "./interfaces";
import { reducer } from "./reducer";
import { changeField, setFormError, validateFields } from "./actions";

const initialState: SignInForm = {
  formError: false,
  formErrorMessage: "",
  errors: null,
  loading: false,
  login: "",
  password: "",
};

type fieldFunctions<T> = (field: string) => T;
type changeHandler = (event: ChangeEvent<HTMLInputElement>) => void;

export const SignIn = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const dto = new SignInDto(state.login, state.password);
    const errors = formValidate(dto);

    dispatch(validateFields(errors));

    if (!errors.length) {
      submitForm(dto);
    }
  };

  const formValidate = (dto: SignInDto): ValidationError[] =>
    new Validator().validateSync(dto);

  const submitForm = async (signInDto: SignInDto) => {
    try {
      const result = await AuthApi.signIn(signInDto);

      switch (result.status) {
        case 201:
          location.replace("/contracts");
        case 401:
          dispatch(setFormError(true, "Incorrect credentials"));
          break;
        case 400:
          dispatch(validateFields(JSON.parse(result.errors)));
          break;
        default:
          throw new Error("Connection error.");
      }
    } catch (err) {
      dispatch(setFormError(true, "We're sorry, but something went wrong."));
    }
  };

  const handleChange: fieldFunctions<changeHandler> = (field) => (event) =>
    dispatch(changeField(field, event.currentTarget.value));

  const hasError: fieldFunctions<boolean> = (field) => {
    return !!state.errors?.some(
      (error: ValidationError) => error.property === field
    );
  };

  const fields = ["login", "password"];

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={3}>
        <Grid item>
          <LoadingIndicator loading={state.loading} />
          <Box m={1}>
            <Typography gutterBottom variant="h5" component="h5">
              Sign-in
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Grid container spacing={0} direction="column" alignItems="center">
            {fields.map((field) => (
              <Grid item xs key={field}>
                <TextField
                  id={field}
                  label={field}
                  size="medium"
                  onChange={handleChange(field)}
                  error={hasError(field)}
                  value={state[field]}
                  key={`field-wrapper-${field}`}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="center">
            <Box m={1}>
              <Button
                size="medium"
                color="primary"
                variant="contained"
                onClick={handleSubmit}
              >
                Sign-in
              </Button>
            </Box>
            <Box m={1}>
              <Button size="medium" color="primary" disabled>
                Reset password
              </Button>
            </Box>
          </Grid>
        </Grid>
        {state.formError && (
          <Grid item>
            <Alert severity="error" square={true}>
              <AlertTitle>Error</AlertTitle>
              {state.formErrorMessage}
            </Alert>
          </Grid>
        )}
      </Grid>
    </form>
  );
};
