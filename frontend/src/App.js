import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import store from './redux/store.redux';
import { Provider } from 'react-redux';


import LoginComponent from './components/Auth/Login.component';
import Dashboard from './components/Dashboard.component';
import NavbarLayout from './components/common/Navbar.layout';
import PrivateRoute from './components/common/PrivateRoute';

function App() {
  return (
    <Provider store={store}>
      <Router>

        <div className="App">
          {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
        >
        Learn React
        </a>
      </header> */}
          <NavbarLayout />
          <Redirect from="/" to="/login" />
          <Route exact path="/login" component={LoginComponent} />
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
