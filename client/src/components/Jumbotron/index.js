import React from 'react';

function Jumbotron({ children }) {
  return (
    <div
      style={{
        height: 200,
        backgroundColor: '#FFFFFF',
        paddingTop: 120,
        textAlign: 'center',
      }}
    >
      {children}
    </div>
  );
}

export default Jumbotron;
