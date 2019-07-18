import React from 'react';
import ReactDOM from 'react-dom';
import './static/styles/main.scss';
import AppContainer from './src/containers/AppContainer';
const App = () => {
   return <AppContainer />;
}
ReactDOM.render(<App />, document.getElementById('main-container'));