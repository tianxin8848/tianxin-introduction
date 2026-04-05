import { createTheme } from '@mui/material/styles'

/** Aligns MUI palette with :root tokens in App.css for consistent UI across custom CSS and MUI components. */
export const appTheme = createTheme({
  palette: {
    primary: { main: '#4CAF50' },
    secondary: { main: '#2196F3' },
    error: { main: '#f44336' },
    success: { main: '#4CAF50' },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    divider: '#e0e0e0',
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      '"Fira Sans"',
      '"Droid Sans"',
      '"Helvetica Neue"',
      'sans-serif',
    ].join(','),
  },
})
