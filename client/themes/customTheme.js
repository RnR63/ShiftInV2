import { createTheme, responsiveFontSizes } from '@mui/material';

const customTheme = createTheme({
    palette: {
      primary: {
        main: '#007561'
      },
      secondary: {
        main: '#DFE0DF', 
      },
      // Can define other colors like error, warning, info, and success here
    },
    typography: {
      fontFamily: [
        'Roboto', // Can use Google Fonts or any other modern font
        'Arial',
        'sans-serif',
      ].join(','),
      fontSize: 14, 
    },
    shape: {
      borderRadius: 8, // Adjust border radius for components
    },
    spacing: 8, // Adjust the base spacing unit for consistent spacing
    shadows: [
      'none', // You can customize the shadow levels based on your design
      '0px 2px 4px rgba(0, 0, 0, 0.1)',
      '0px 4px 8px rgba(0, 0, 0, 0.1)',
    ],
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none', // Adjust button styling as per your design
          },
        },
      },
      // You can customize other MUI components here
    },
  });
  
  export default customTheme;