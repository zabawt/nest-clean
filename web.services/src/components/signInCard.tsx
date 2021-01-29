import { Card, makeStyles } from "@material-ui/core";
import { SignIn } from "../containers/SignIn/signIn";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 325,
    minWidth: 325,
  },
}));

export const SignInCard = () => {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <SignIn />
    </Card>
  );
};
