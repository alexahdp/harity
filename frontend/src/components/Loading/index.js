import React from 'react';
import Loader from 'react-loader-spinner';
import styles from './assets/index.css';

function Loading({ isLoading, children, loadError }) {
  if (loadError) {
    return (
      <React.Fragment>
        <h4>Error</h4>
        <p>Error occured during data load...</p>
      </React.Fragment>
    );
  }
  else if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
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
