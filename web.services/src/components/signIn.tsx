import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { AuthApi } from "../../api/auth";
import React, { FormEvent, useState } from "react";
import { LoadingIndicator } from "./loadingIndicator";
import { SignInDto } from "../dto/signInDto";
import { Validator } from "class-validator";

interface FieldConfig {
  value: string;
  error?: boolean;
  errorMessage?: string;
  fieldErrors?: any;
}

interface Values {
  error: boolean;
  errorMessage?: string;
  loading: boolean;
  login: FieldConfig;
  password: FieldConfig;
}

export const SignIn = () => {
  const initState = {
    error: false,
    errorMessage: "",
    loading: false,
    login: {
      value: "",
    },
    password: {
      value: "",
    },
  };

  const [state, setState] = useState<Values>(initState);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const dto = new SignInDto(state.login.value, state.password.value);
    const errors = new Validator().validateSync(dto);

    if (errors.length) {
      setState({ ...state });
      return;
    } else {
      setState({ ...state, loading: true, error: false });
      const { status, data } = await AuthApi.signIn(
        state.login.value,
        state.password.value
      );

      switch (status) {
        case 400:
          setState({
            ...withError([data.message].flat().join(";\n ")),
            loading: false,
          });
          break;
        case 401:
          setState({ ...withError("Invalid credentials"), loading: false });
          break;
        case 201:
          location.replace("/contracts");
      }
    }
  };

  const handleChange = (field: string) => (event: any) => {
    setState({
      ...state,
      [field]: { ...state[field], value: event.currentTarget.value },
    });
  };

  const withError = (errorMessage: string): Values => ({
    ...state,
    error: true,
    errorMessage,
  });

  const getError = (field: string) => !!state[field].error;

  const fields = ["login", "password"];

  return (
    <Grid container alignItems="center">
      <Card>
        <Grid item>
          <LoadingIndicator loading={state.loading} />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Typography gutterBottom variant="h5" component="h5">
                Sign-in
              </Typography>

              {fields.map((field) => (
                <div key={`field-wrapper-${field}`}>
                  <TextField
                    id={field}
                    label={field}
                    size="medium"
                    onChange={handleChange(field)}
                    error={getError(field)}
                  />
                </div>
              ))}
              <CardContent>
                <Button
                  size="medium"
                  color="primary"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Login
                </Button>
                <Button size="medium" color="primary">
                  Reset
                </Button>
              </CardContent>

              {state.error && (
                <CardContent>
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {state.errorMessage}
                  </Alert>
                </CardContent>
              )}
            </form>
          </CardContent>
        </Grid>
      </Card>
    </Grid>
  );
};
