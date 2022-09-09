
import { createTheme } from '@mui/material/styles';

const themeCreator = (themeValue) => {
  return createTheme({
    palette: (themeValue === 'light' ?
    {
      primary: {
        main: '#4caf50',
      },
      secondary: {
        main: '#64dd20',
      },
      tertiary: {
        main: '#757575'
      },
      background: {
        paper: '#fff',
        default: '#f3f3f5'
      },
      text: {
        primary: '#141414',
        secondary: 'rgba(0,0,0,0.6)'
      },
    }
    : 
    {
      primary: {
        main: '#4caf50',
      },
      secondary: {
        main: '#64dd20',
      },
      tertiary: {
        main: '#757575'
      },
      background: {
        paper: '#363537',
        default: 'rgba(35,35,35,1)',
        opaque: 'rgba(35,35,35,.7)'
      },
      text: {
        primary: '#FFF',
        secondary: 'rgba(255,255,255,0.6)'
      },
    }),
      components: {
        MuiOutlinedInput: {
          styleOverrides: {
            input: (themeValue === 'dark' ? { 
              "&:-webkit-autofill": {
                "-webkit-box-shadow": "0 0 0 100px black inset",
                "-webkit-text-fill-color": 'white',

              },
            }
            : {
              "&:-webkit-autofill": {
                "-webkit-box-shadow": "0 0 0 100px white inset",
                "-webkit-text-fill-color": 'black', 
              },
            }),
          },
        },
      },
  });
}
export default themeCreator;