import React, { useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Layout = ({ children, history }) => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    history.push('/login');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <nav className="bg-indigo-600 text-white p-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">Mantenimiento Clientes</Link>
        {isAuthenticated && (
          <button onClick={handleLogout} className="bg-indigo-500 hover:bg-indigo-700 px-4 py-2 rounded">
            Salir
          </button>
        )}
      </nav>
      {isAuthenticated && (
        <div className="flex flex-1">
          <aside className="w-64 bg-gray-100 p-4">
            <div className="mb-4">
              <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-2"></div>
              <p className="text-center">Nombre de Usuario</p>
            </div>
            <p className="font-bold mb-2">Menú</p>
            <ul>
              <li><Link to="/" className="block py-2 hover:bg-gray-200">Inicio</Link></li>
              <li><Link to="/consulta-clientes" className="block py-2 hover:bg-gray-200">Consulta Clientes</Link></li>
            </ul>
          </aside>
          <main className="flex-1 p-4">
            {children}
          </main>
        </div>
      )}
      {!isAuthenticated && (
        <main className="flex-1">
          {children}
        </main>
      )}
    </div>
  );
};

export default withRouter(Layout);

