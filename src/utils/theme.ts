import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#008374',
      light: '#66fdee',
      dark: '#006056',
      contrastText: '#fff',
    },
    secondary: {
      main: '#66fdee',
      light: '#a1ffff',
      dark: '#00cabb',
      contrastText: '#000',
    },
    background: {
      default: '#f9fafb',
      paper: '#fff',
    },
    text: {
      primary: '#111827',
      secondary: '#4b5563',
    },
  },
  typography: {
    fontFamily: '"DM Sans", "Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontFamily: '"DM Sans", sans-serif',
    },
    h2: {
      fontWeight: 600,
      fontFamily: '"DM Sans", sans-serif',
    },
    h3: {
      fontWeight: 600,
      fontFamily: '"DM Sans", sans-serif',
    },
    h4: {
      fontWeight: 600,
      fontFamily: '"DM Sans", sans-serif',
    },
    h5: {
      fontWeight: 600,
      fontFamily: '"DM Sans", sans-serif',
    },
    h6: {
      fontWeight: 600,
      fontFamily: '"DM Sans", sans-serif',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontFamily: '"DM Sans", sans-serif',
    },
    body1: {
      fontFamily: '"DM Sans", sans-serif',
    },
    body2: {
      fontFamily: '"DM Sans", sans-serif',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: '"DM Sans", sans-serif',
        },
        html: {
          height: '100%',
        },
        '#root': {
          height: '100%',
        },
      },
    },
  },
});

export default theme; 