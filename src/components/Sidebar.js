import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const username = localStorage.getItem('username');

  const isActive = (path) => {
    return location.pathname === path ? 'text-blue-500' : 'text-gray-700';
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
      <div className="p-6 border-b border-gray-200">
        <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
          <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <p className="text-center text-gray-700 font-medium">{username}</p>
      </div>
      <nav className="p-4">
        <p className="text-gray-600 font-bold mb-4">MENÚ</p>
        <ul className="space-y-2">
          <li>
            <Link
              to="/"
              className={`flex items-center hover:text-blue-500 py-2 ${isActive('/')}`}
            >
              <span className="w-8">IN</span>
              <span>INICIO</span>
            </Link>
          </li>
          <li>
            <Link
              to="/consulta-clientes"
              className={`flex items-center hover:text-blue-500 py-2 ${isActive('/consulta-clientes')}`}
            >
              <span className="w-8">CC</span>
              <span>Consulta Clientes</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

