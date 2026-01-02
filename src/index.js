import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
// import {configureStore} from "@reduxjs/toolkit"
// import rootReducer from './reducer/indexReducer';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './config/store';
import { GoogleOAuthProvider } from '@react-oauth/google';

// const store = configureStore({
//   reducer:rootReducer,
// });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="<your_client_id>">
      <Provider store={store}>
          <PersistGate  loading={<div>Loading...</div>} persistor={persistor}>
              <BrowserRouter>
                <App />
                <Toaster/>
              </BrowserRouter>
          </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
