import React, {useState,useEffect} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from 'react-router-dom';

import Header from './components/Header';
// import Footer from './components/Footer';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Forum from './pages/Forum';
import Post from './pages/Post';
import People from './pages/People';
import Plant from './pages/Plant'

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ThemeProvider,createTheme } from '@mui/material/styles';
import themeCreator from './theme'

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
// theme state variable 
  const [themePreference, setTheme] = useState('light');

// toggle theme based on the switch in Header component
  const themeToggle = () => {
    if (themePreference === 'light') {
      setTheme('dark')
      window.localStorage.setItem('storedTheme', 'dark');
    } else {
      setTheme('light')
      window.localStorage.setItem('storedTheme', 'light');
    }
  };
// on original render determine if user has a theme preference from operating system
  useEffect(() => {
    const localTheme = window.localStorage.getItem('storedTheme');
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme ?
      setTheme('dark') :
      localTheme ?
        setTheme(localTheme) :
        setTheme('light');
      },[]);

// set the theme from theme.js
  const theme = themeCreator(themePreference);
  
  // createTheme({
  //   palette: (themeValue === 'light' ?
  //   {
  //     primary: {
  //       main: '#4caf50',
  //     },
  //     secondary: {
  //       main: '#64dd20',
  //     },
  //     tertiary: {
  //       main: '#757575'
  //     },
  //     background: {
  //       paper: '#fff',
  //       default: '#f3f3f5'
  //     },
  //     text: {
  //       primary: '#141414',
  //       secondary: 'rgba(0,0,0,0.6)'
  //     },
  //   }
  //   : 
  //   {
  //     primary: {
  //       main: '#4caf50',
  //     },
  //     secondary: {
  //       main: '#64dd20',
  //     },
  //     tertiary: {
  //       main: '#757575'
  //     },
  //     background: {
  //       paper: '#363537',
  //       default: 'rgba(35,35,35,1)',
  //       opaque: 'rgba(35,35,35,.7)'
  //     },
  //     text: {
  //       primary: '#FFF',
  //       secondary: 'rgba(255,255,255,0.6)'
  //     },
  //   }),
  //     components: {
  //       MuiOutlinedInput: {
  //         styleOverrides: {
  //           input: (themeValue === 'dark' ? { 
  //             "&:-webkit-autofill": {
  //               "-webkit-box-shadow": "0 0 0 100px black inset",
  //               "-webkit-text-fill-color": 'white',

  //             },
  //           }
  //           : {
  //             "&:-webkit-autofill": {
  //               "-webkit-box-shadow": "0 0 0 100px white inset",
  //               "-webkit-text-fill-color": 'black', 
  //             },
  //           }),
  //         },
  //       },
  //     },
  // });
  
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme} >
      <Router>
        <Header theme={themePreference} themeToggle={themeToggle} />
        <Routes>
          <Route path='/' element={<Home theme={themePreference} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile/:username' element={<Profile />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/people' element={<People />} />
          <Route path='/forum' element={<Forum />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/forum/:id' element={<Post />} />
          <Route path='/plant/:id' element={<Plant />} />
          <Route path='*' element={<NoMatch />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
