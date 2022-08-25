import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
    palette: {
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
        primary: '#363537',
        secondary: 'rgba(0,0,0,0.6)'
      }
    }
    });

  export const darkTheme = createTheme({
    palette: {
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
        default: 'rgba(35,35,35,1)'
      },
      text: {
        primary: '#FFF',
        secondary: 'rgba(255,255,255,0.7)'
      },
    },
      components: {
        MuiOutlinedInput: {
          styleOverrides: {
            input: {
              "&:-webkit-autofill": {
                "-webkit-box-shadow": "0 0 0 100px black inset",
                "-webkit-text-fill-color": 'white',
              },
            },
          },
        },
      },
    });

// export const lightTheme = {
//     body: '#E2E2E2',
//     text: '#363537',
//     toggleBorder: '#FFF',
//     gradient: 'linear-gradient(#39598A, #79D7ED)',
//   }
  
//   export const darkTheme = {
//     body: '#363537',
//     text: '#FAFAFA',
//     toggleBorder: '#6B8096',
//     gradient: 'linear-gradient(#091236, #1E215D)',
//   }