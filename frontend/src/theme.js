import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Couleur primaire (bleu)
    },
    secondary: {
      main: '#dc004e', // Couleur secondaire (rouge)
    },
  },
  typography: {
    h3: {
      fontWeight: 600,
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

export default theme;
