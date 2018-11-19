import React from 'react';
import Loader from 'react-loader-spinner';


function Loading({ isLoading, children }) {
  if (true) {
    return (
      <div >
        <Loader
          type="Puff"
          color="#00BFFF"
          height="100"
          width="100"
        />
      </div>
    );
  } else {
    return children;
  }
}

export default Loading;
