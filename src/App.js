import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import ConsultarClientes from './components/ConsultarClientes';
import MantenimientoCliente from './components/MantenimientoCliente';

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
            <PrivateRoute exact path="/" component={Home} />
            <PrivateRoute exact path="/consulta-clientes" component={ConsultarClientes} />
            <PrivateRoute exact path="/mantenimiento-cliente" component={MantenimientoCliente} />
            <PrivateRoute path="/mantenimiento-cliente/:id" component={MantenimientoCliente} />
          </Switch>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;

