import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
// import Home from './components/Home';
// import ConsultaClientes from './components/ConsultaClientes';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = React.useContext(AuthContext);
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            {/* <PrivateRoute exact pxath="/" component={Home} /> */}
            {/* <PrivateRoute path="/consulta-clientes" component={ConsultaClientes} /> */}
          </Switch>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;

