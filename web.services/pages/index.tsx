import Navigation from "../src/components/navigation";
import Layout from "../src/components/layout";
import { SignIn } from "../src/components/signIn";
import { Grid } from "@material-ui/core";

export default function Index() {
  return (
    <Layout>
      <Navigation />
      <Grid container justify="center">
        <Grid item>
          <SignIn />
        </Grid>
      </Grid>
    </Layout>
  );
}
