import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3D3D3D',      // Dark gray
      light: '#5A5A5A',     // Medium gray
      dark: '#1A1A1A',      // Almost black
      contrastText: '#fff',
    },
    secondary: {
      main: '#808080',      // Medium-light gray
      light: '#9E9E9E',     // Light gray
      dark: '#5A5A5A',      // Medium gray
      contrastText: '#fff',
    },
    background: {
      default: '#f5f5f5',   // Very light gray background
      paper: '#ffffff',     // White paper
    },
    text: {
      primary: '#1A1A1A',   // Almost black for primary text
      secondary: '#5A5A5A', // Medium gray for secondary text
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