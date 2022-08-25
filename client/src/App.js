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
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './theme';

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


// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#4caf50',
//     },
//     secondary: {
//       main: '#64dd20',
//     },
//   }
// });
// const Child = function Child() {
//   // We can use the `useParams` hook here to access
//   // the dynamic pieces of the URL.
//   let { id } = useParams();

//   return (
//     <div>
//       <h3>ID: {id}</h3>
//     </div>
//   );
// };
function App() {

  const [themeValue, setTheme] = useState('light');

  const themeToggle = () => {
    if (themeValue === 'light') {
      setTheme('dark')
      window.localStorage.setItem('storedTheme', 'dark');
    } else {
      setTheme('light')
      window.localStorage.setItem('storedTheme', 'light');
    }
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('storedTheme');
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches && !localTheme ?
      setTheme('dark') :
      localTheme ?
        setTheme(localTheme) :
        setTheme('light');
      },[]);
    

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={themeValue === 'light' ? lightTheme : darkTheme} >
      <Router>
        <Header theme={themeValue} themeToggle={themeToggle} />
        <Routes>
          <Route path='/' element={<Home theme={themeValue} />} />
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
