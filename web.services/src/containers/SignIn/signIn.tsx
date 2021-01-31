import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import React, { ChangeEvent, FormEvent, useReducer } from 'react';
import { SignInDto } from '../../dto/signInDto';
import { ValidationError, Validator } from 'class-validator';
import { SignInForm } from './interfaces';
import { reducer } from './reducer';
import { changeField, setFormError, validateFields } from './actions';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

const initialState: SignInForm = {
  formError: false,
  formErrorMessage: '',
  errors: null,
  loading: false,
  login: '',
  password: '',
};

type fieldFunctions<T> = (field: string) => T;
type changeHandler = (event: ChangeEvent<HTMLInputElement>) => void;

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 2),
  },
  fields: {
    margin: theme.spacing(1, 0, 1),
  },
}));

export const SignIn = () => {
  const classes = useStyles();
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
      const result = await fetch('api/auth', {
        body: JSON.stringify(signInDto),
        method: 'POST',
        credentials: 'include',
      });

      if (result.ok) {
        location.replace('/contracts');
      } else {
        if (result.status === 401) {
          dispatch(setFormError(true, 'Incorrect credentials'));
        } else {
          dispatch(
            setFormError(true, "We're sorry, but something went wrong."),
          );
        }
      }
    } catch (err) {
      dispatch(setFormError(true, "We're sorry, but something went wrong."));
    }
  };

  const handleChange: fieldFunctions<changeHandler> = (field) => (event) =>
    dispatch(changeField(field, event.currentTarget.value));

  const hasError: fieldFunctions<boolean> = (field) => {
    return !!state.errors?.some(
      (error: ValidationError) => error.property === field,
    );
  };

  const fields = ['login', 'password'];

  return (
    <>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form onSubmit={handleSubmit} noValidate className={classes.form}>
        {fields.map((field) => (
          <TextField
            id={field}
            label={field}
            onChange={handleChange(field)}
            error={hasError(field)}
            value={state[field]}
            variant={'outlined'}
            fullWidth
            type={field}
            required
            className={classes.fields}
            autoComplete={field}
            key={`field-wrapper-${field}`}
          />
        ))}
        <FormControlLabel
          className={classes.fields}
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        <Button
          size="medium"
          color="primary"
          variant="contained"
          className={classes.submit}
          type="submit"
          fullWidth
          onClick={handleSubmit}
        >
          Sign-in
        </Button>

        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link href="#" variant="body2">
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>

        {state.formError && (
          <Alert severity="error" className={classes.fields}>
            <AlertTitle>Error</AlertTitle>
            {state.formErrorMessage}
          </Alert>
        )}
      </form>
    </>
  );
};
