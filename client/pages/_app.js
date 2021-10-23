import 'bootstrap/dist/css/bootstrap.css';

/**
 * Acts as Wrapper for all Components For Global CSS For Our Project
 */
const app = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default app;
