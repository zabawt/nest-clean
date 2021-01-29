import { SignInCard } from "../src/components/signInCard";
import React from "react";
import { Box, Container, Grid } from "@material-ui/core";

export default function Index() {
  return (
    <>
      <Container>
        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justify="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={3}>
            <SignInCard />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
