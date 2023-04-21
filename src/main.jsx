import { Auth0Provider } from '@auth0/auth0-react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorBoundary from './Error/ErrorBoundary';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ErrorBoundary>
    <Auth0Provider
      domain="dev-1320wqpts1u13uah.us.auth0.com"
      clientId="aJP3FPJlr9QX0hqvw8qY5M9U1RlVBXMu"
      // domain="dev-htykpyq8rnnfsrc4.us.auth0.com"
      // clientId="GOhOoML3nsqJdbf21iehMvMFygXql9qb"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  </ErrorBoundary>,
  // </React.StrictMode>,
);
