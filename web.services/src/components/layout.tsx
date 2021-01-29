import { Grid } from "@material-ui/core";

export default function Layout({ children }: any) {
  return (
    <Grid spacing={8} container direction="column">
      {[children].flat().map((child, index) => (
        <Grid item key={index}>
          {child}
        </Grid>
      ))}
    </Grid>
  );
}
