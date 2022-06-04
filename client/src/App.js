import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
// import Footer from './components/Footer';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
// import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Forum from './pages/Forum';

import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

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
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          {/* <Route path='/profile' element={<Profile />} /> */}
          {/* <Route path='/thought' element={<SingleThought />} /> */}
          <Route path='/profile/:username' element={<Profile />} />
          {/* <Route path='/thought/:id' element={<SingleThought />} /> */}
          <Route path='/profile' element={<Profile />} />
          <Route path='/forum' element={<Forum />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='*' element={<NoMatch />} />
        </Routes>
        {/* <Footer /> */}
      </Router>
    </ApolloProvider>
  );
}

export default App;
