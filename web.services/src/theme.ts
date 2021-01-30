import { createMuiTheme } from '@material-ui/core/styles';
import { red, blue, grey } from '@material-ui/core/colors';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue.A700,
    },
    secondary: {
      main: grey.A200,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: grey[200],
    },
  },
});

export default theme;
