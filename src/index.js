import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {StoreContext} from './StoreContext';
import {Store} from './Store';
import './index.css';

ReactDOM.render(
    <React.StrictMode>
        <StoreContext.Provider value={new Store()}>
            <App/>
        </StoreContext.Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
