import { LinearProgress } from "@material-ui/core";

import React from "react";

export const LoadingIndicator = ({ loading }) => {
  return loading ? (
    <LinearProgress />
  ) : (
    <LinearProgress variant="determinate" value={100} />
  );
};
